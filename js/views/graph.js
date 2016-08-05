define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph'

], function($, $ui, d3, backbone, Model) {

    var view = backbone.View.extend({

        initialize: function() {

            /*this.element = ".svg_location"

            this.width = this.model.get("width");
            this.height = this.model.get("height");

            this.svg = d3.select(this.element).append("svg")
                .attr("width", 900)
                .attr("height", 500);*/

            this.get_data();
            this.draw_table();
            this.accordion();
            this.draw_google_maps();


            //console.log(u);

        },

        get_data: function() {

            var u = $.ajax({
                url: 'http://services.cngnow.com/V1/Stations.svc/external/circlefilter?latitude=35.4675&longitude=-97.5161&range=15&status=active',
                data: {
                    format: 'json'
                },
                error: function() {
                    $('#info').html('<p>An error has occurred</p>');
                },
                dataType: 'jsonp',
                success: function(data) {
                    console.log(data);
                    //var $title = $('<h1>').text(data.talks[0].talk_title);
                    //var $description = $('<p>').text(data.talks[0].talk_description);
                    //$('#info')
                    // .append($title)
                    //.append($description);
                },
                type: 'GET'
            });

        },

        draw_bar_graph: function(data) {

            //console.log(data);

            //var data = this.model.get("data");

            //d3.select()

        },

        draw_pie_graph: function() {

        },

        draw_tree_graph: function() {

        },

        draw_google_maps: function() {

            //var z = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
            //alert(z);

            //console.log(this.model.get("datasets"));
            var data = this.model.get("datasets");
            /*function initMap() {
                // Create a map object and specify the DOM element for display.
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: {
                        lat: -34.397,
                        lng: 150.644
                    },
                    scrollwheel: false,
                    zoom: 8
                });
            }*/

            // Create the Google Map…
            var map = new google.maps.Map(d3.select(".msMap").node(), {
                zoom: 5,
                center: new google.maps.LatLng(37.76487, -122.41948),
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                center: {
                    lat: 37.0902,
                    lng: -95.7129
                },
                scrollwheel: false
            });

            var overlay = new google.maps.OverlayView();

            // Add the container when the overlay is added to the map.
            overlay.onAdd = function() {
                var layer = d3.select(this.getPanes().overlayLayer).append("div")
                    .attr("class", "stations");

                // Draw each marker as a separate SVG element.
                // We could use a single SVG, but what size would it have?
                overlay.draw = function() {
                    var projection = this.getProjection(),
                        padding = 10;

                    var marker = layer.selectAll("svg")
                        .data(d3.entries(data))
                        .each(transform) // update existing markers
                        .enter().append("svg")
                        .each(transform)
                        .attr("class", "marker")
                        .on("mouseover", function() {
                            d3.select(this).transition()
                                .attr("r", 7);
                        });

                    // Add a circle.
                    marker.append("circle")
                        .attr("r", function(d) {
                            return d.value.LastReportedPrice * 5
                        })
                        .attr("cx", padding)
                        .attr("cy", padding)
                        .on("mouseover", function() {
                            d3.select(this).transition()
                                .attr("r", 7);
                        })

                    // Add a label.
                    marker.append("text")
                        .attr("x", padding + 7)
                        .attr("y", padding)
                        .attr("dy", ".31em")
                        .text(function(d) {
                            return d.value.Name;
                        });

                    function transform(d) {
                        d = new google.maps.LatLng(d.value.Latitude, d.value.Longitude);
                        d = projection.fromLatLngToDivPixel(d);
                        //console.log(d);
                        return d3.select(this)
                            .style("left", function() { /*console.log(d.x);*/
                                return (d.x - padding) + "px"
                            })
                            .style("top", (d.x - padding) + "px");
                    }
                };
            };

            //  d3.select("circle").on("mouseover", function(){
            d3.select("circle").transition()
                .style("fill", "green");
            //  })

            // Bind our overlay to the map…
            overlay.setMap(map);

            $(".msMap").resizable({
                handles: 's',
                stop: function(event, ui) {
                    $(this).css("width", '');
                }
            });


        },


        draw_table: function() {
            $('#visual').on('change', function() {
                value = $(this).val();
                change(value);
            });
            var change = function(val) {
                $('#createEnt').on("click", function() {
                    $('#' + val).show();
                    console.log(val);
                });
            }

        },

    /*    $(function() {
            $(".collapse").on('hide.bs.collapse', function() {
                var title = $(this).parents('div.panel').find('.panel-title')[0];
                $(title).attr('title', 'hidden content closed');
            });

            $(".collapse").on('show.bs.collapse', function() {
                var title = $(this).parents('div.panel').find('.panel-title')[0];
                $(title).attr('title', 'hidden content open');
            });
        });*/
        accordion: function() {
          $('#accord-title').click(function(){
              $(this).text(function(i,old){
                  return old=='Table (show)' ?  'Table (hide)' : 'Table (show)';
              });
          });
          /*$(".panel").on('hidden.bs.collapse', function () {
            // do something…
            d3.select("#accord-title").text("Table (hide)");
          })*/
          /*reveal = function() {
            d3.select("#accord-title").on("click", function(){
              d3.select(this).text("Table (hide)");

              d3.select(this).on("click", function(){
                d3.select(this).text("Table (show)");
                console.log(reveal);
                //.each("end", reveal);
                //d3.select(this).on("click", function(){
                //  d3.select(this).text("Table (hide)").each("end",reveal);
                //})
              });
              reveal;

              //$(this).click(function(){
              //  $(this).text("Table (show)");

              //})
          });
        }
        reveal();*/

          /*$(".collapse").o.bs.collapse', function() {
              var title = $(this).parents('div.panel').find('.panel-title')[0];
              $(title).attr('title', 'hidden content closed');
          });

          $(".collapse").on('show.bs.collapse', function() {
              var title = $(this).parents('div.panel').find('.panel-title')[0];
              $(title).attr('title', 'hidden content open');
          });*/
        }

    });

    return view;

});
