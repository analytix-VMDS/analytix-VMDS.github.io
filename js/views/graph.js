
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph'

], function($, $ui, d3, backbone, Model) {

    var view = backbone.View.extend({

        initialize: function(){

          this.element = "#svg_location"

          this.width = this.model.get("width");
          this.height = this.model.get("height");

          this.svg = d3.select(this.element).append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

          this.get_data();
          this.draw_google_maps();

          //console.log(u);

        },

        get_data: function() {

          /*var data;
          var scope = this;
          d3.json("json/test.json", function(error, json){

            if (error) {  //If error is not null, something went wrong.
              console.log(error);  //Log the error.
            } else {      //If no error, the file loaded correctly.
              //console.log(json);   //Log the data.

              //Include other code to execute after successful file load here
              data = json;

              //scope.draw_google_maps(data);

            }
          })*/

        },

        draw_bar_graph: function(keyname) {

          var data = this.model.get("data");

          //d3.select()

        },

        draw_pie_graph: function() {

        },

        draw_tree_graph: function() {

        },

        draw_google_maps: function() {

          //var z = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
          //alert(z);

          console.log(this.model.get("datasets"));
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
          var map = new google.maps.Map(d3.select("#map").node(), {
            zoom: 8,
            center: new google.maps.LatLng(37.76487, -122.41948),
            mapTypeId: google.maps.MapTypeId.TERRAIN
          });

          $( "#map" ).resizable({
              handles: 's',
              stop: function(event, ui) {
                  $(this).css("width", '');
             }
          });
        }

      });

      return view;

    });
