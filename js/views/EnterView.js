define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/views/mappings'

], function($, $ui, d3, backbone, mappings) {

    var view = backbone.View.extend({

        initialize: function() {

          this.data_caller();
          this.api_toggler();

            /*this.alternate_types_of_graphs();
            this.draw_pie_graph();
            this.draw_bar_graph();
            this.draw_line_graph();
            this.draw_table();
            this.alternate_types_of_analyses();
            this.alternate_types_of_subtopics();
            //this.draw_map();
            this.api_options_toggle();*/
        },

        data_caller: function() {
          var scope = this;

          var id = [];
          $( "#city" ).autocomplete({
            source: function( request, response ) {
              $.ajax( {
                url: "http://api.themoviedb.org/3/discover/movie?api_key=9cff8111045983be875097f569683c8e&sort_by=popularity.desc",
                dataType: "json",
                data: {
                  q: request.term
                },
                success: function( data ) {
                  var arrofsn = [];

                  for(var i = 0; i < data.results.length; i++) {
                    arrofsn.push(data.results[i].title);
                    id.push({"id": data.results[i].id, "title": data.results[i].title});
                  }
                  //console.log(id);
                  //console.log(data);
                  response($.ui.autocomplete.filter(arrofsn, request.term));

                  scope.carrier(data);

                }
              });
            },
            minLength: 2,

          });

          this.selectedMovies = [];
          $(".add-button").click(function(){
            var currentVal = $("#city").val();
            //console.log(currentVal);
            //console.log(id);i need the new data lol i wanna update this code is kinda fat

            scope.selectedMovies.push(currentVal);

            for(var i = 0; i < id.length; i++) {
               for(var title in id[i] ) {
                  //console.log( title + ' == ' +  id[i][title]);
                  //console.log(id[i][title]);
               }
            }

            d3.select("#result-location").attr("style","padding: 6px; font-size: 16px; border-radius: 5px; background-color: rgb(248, 248, 248); color: #78583e; margin-right: 0px; margin-left: 0px; margin-bottom: 10px; width: 270px")
                  .append("p").text(currentVal+", ").style("border-radius","5px").style("padding","3px")//.style("display","inline-block").style("white-space","normal")
                  .on("mouseover",function(){
                    d3.select(this).style("background-color","lightgrey")//.style("z-index","2")
                  })
                  .on("mouseout",function(){
                    d3.select(this).style("background-color","rgb(248, 248, 248)")//.style("z-index","0")
                  })
                  .on("click", function(){
                    d3.select(this).remove();
                  })

              console.log(scope.selectedMovies);
          });

          $("#accordion").draggable().resizable({
              alsoResize: "#table_loc"
          });
          $("#table_loc").resizable();
        },

        carrier: function(data) {
          var scope = this;
          $(".create").click(function(){

            function arrayObjectIndexOf(myArray, searchTerm, property) {
                for(var i = 0, len = myArray.length; i < len; i++) {
                    if (myArray[i][property] === searchTerm) return i;
                }
                return -1;
            }
            var arr = [];
            for(var f = 0; f < scope.selectedMovies.length; f++) {
              var index = arrayObjectIndexOf(data.results, scope.selectedMovies[f], "title");
              //console.log(index);
              //console.log(data.results[index]);
              arr.push(data.results[index]);
              //console.log(arr);

            }


            /*$(".update").click(function(){
              console.log(arr);
              var updater = new mappings();
              return updater.update(arr);
            });*/
            //console.log(scope.selectedMovies);

            /*var selectedData = data.results.filter(function(n, i){

              //data.results[i].replace


              //return data.results[i].title != scope.selectedMovies[j];
            });*/
            //for (var i = 0; i > data.results.length; i++) {

            //}
            //var selectedData = $.grep(data.results, function(d){
            //  return d.title !== scope.selectedMovies;
          //  })
            //console.log(selectedData);
            d3.select("#table_loc table").remove();

            var table = new mappings();
            return table.table_mapping(arr);
          });
        },

        api_toggler: function() {
          var tog = new mappings();
          return tog.api_options_toggle();
        },







        draw_table: function() {
          $( "#city" ).autocomplete({
            source: function( request, response ) {
              $.ajax( {
                url: "http://apiv3.iucnredlist.org/api/v3/species/page/1?token=1da43ebfc20ad97f3b32afcee87d47b77d8acfac9113d2273f15c97e26e047c4",
                dataType: "json",
                data: {
                  q: request.term
                },
                success: function( data ) {
                  var arrofsn = [];
                  for(var i = 0; i < data.result.length; i++) {
                    arrofsn.push(data.result[i].scientific_name);
                  }
                  response($.ui.autocomplete.filter(arrofsn, request.term));

                }
              });
            },
            minLength: 2,

          });

          $(".create").click(function(){
            var scientificName = $("#city").val().replace(" ","%20");
            var factor = $("#factors").val();
            //console.log($("#city").val()+" "+$("#factors").val());
            var api =  'http://apiv3.iucnredlist.org/api/v3/'+factor+'/species/name/'+scientificName+'?token=1da43ebfc20ad97f3b32afcee87d47b77d8acfac9113d2273f15c97e26e047c4';
            //console.log('http://apiv3.iucnredlist.org/api/v3/'+factor+'/species/name/'+scientificName+'?token=1da43ebfc20ad97f3b32afcee87d47b77d8acfac9113d2273f15c97e26e047c4');

            console.log(api);

            $.ajax({
              url: api,
              data: {
                 format: 'json'
              },
              error: function() {
                 $('#info').html('<p>An error has occurred</p>');
                 alert("No data meets qualifications");
              },
              dataType: 'json',
              success: function(d) {
                console.log(d);
                //console.log(data);

                d3.select("#table_loc table").remove();
                d3.selectAll(".xaxis_opt").remove();
                d3.selectAll(".yaxis_opt").remove();
                var table = new mappings();
                var keysforbargraph = table.table_mapping(d.result);

              },
              type: 'GET'
           });

          });

          $("#accordion").draggable().resizable({
              alsoResize: "#table_loc"
          });
          $("#table_loc").resizable();


          // Gets table from mappings.js with data as parameter
          // Works w/ two dimensional data
          var data = this.model.get("datasets").result;
        },

        alternate_types_of_analyses: function() {

            var getPrev = ["msNone"];
            $('#analyze').on('change', function() {
                value = $(this).val();
                change(value);
                console.log(value);
            });
            var change = function(val) {
                getPrev.push(val);
                if (getPrev.length > 2) {
                    getPrev.shift();
                }
                console.log(val);

                $("." + getPrev[0]).hide();


                $("." + val).show();
            }
        },

        alternate_types_of_subtopics: function() {

            var getPrev = ["msSongs"];
            $('#subtopic').on('change', function() {
                value = $(this).val();
                change(value);
                console.log(value);
            });
            var change = function(val) {
                getPrev.push(val);
                if (getPrev.length > 2) {
                    getPrev.shift();
                }
                console.log(getPrev);

                $("." + getPrev[0]).hide();


                $("." + val).show();
            }
        },

        alternate_types_of_graphs: function() {
            /*$("body").click(function(){
           //style: "popup"
           $(".msBar").show();
           $(".msPie").hide();
          // console.log($(body"));
        });*/
            var getPrev = ["msBar"];
            $('#visual').on('change', function() {
                value = $(this).val();
                change(value);
                console.log(value);
            });
            var change = function(val) {
                getPrev.push(val);
                if (getPrev.length > 2) {
                    getPrev.shift();
                }
                console.log(getPrev);

                $("." + getPrev[0]).hide();
                $("." + val).show();
            }
        },

        api_options_toggle: function() {
          /*$("#dropdowns").click(function(){
            console.log("w");
            $("#redlist_opt").slideToggle("slow");
          });*/

          var getPrev = [];
          $('#api').on('change', function() {
              value = $(this).val();
              console.log(value);
              change(value);
          });
          var change = function(val) {
            //console.log(val);
              getPrev.push(val);
              if (getPrev.length > 2) {
                  getPrev.shift();
              }
              console.log(getPrev);

              $("#" + getPrev[0]+"_opt").slideUp(300);
              $("#" + val+"_opt").delay(300).slideDown(300);
          }
        },

        draw_pie_graph: function() {
            var width = 960,
                height = 500,
                radius = Math.min(width, height) / 2;

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#b8817a", "#d2b1ac"]);

            var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(100)

            var newarc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(100)

            var labelArc = d3.svg.arc()
                .outerRadius(radius - 40)
                .innerRadius(radius - 40);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) {
                    return d.money;
                });

            // Paremeter here
            var svg = d3.select(".msPie").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            d3.csv("json/data.csv", type, function(error, data) {
                if (error) throw error;

                console.log(pie(data));

                this.g = svg.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc")

                this.g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) {
                        return "white" //color(d.data.name);
                    })
                    .attr("stroke-dasharray", "10,10")
                    .attr("stroke", "black")
                    .on("mouseover", function() {
                        //d3.select(this).transition().style("stroke-width","-5px");
                        //arc.outerRadius(20)

                        d3.select(this).transition().attr("d", newarc)

                        /*d3.selectAll(".arc")
                              .append("rect")
                              .attr("width",100)
                              .attr("height",100)*/
                    })
                    .on("mouseout", function() {
                        d3.select(this).transition().attr("d", arc);
                        //d3.select(this).transition().style("stroke-width","3px");
                    })

                this.g.append("text")
                    .attr("transform", function(d) {
                        return "translate(" + labelArc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    .text(function(d) { // Another paremeter here
                        return d.data.name + ", " + d.data.money + " $";
                    });

            });

            function type(d) {
                d.money = +d.money;
                return d;
            }

            /*$("body").click(function() {
                console.log("movie");
                d3.csv("json/datanewpie.csv", type, function(error, data) {
                    if (error) throw error;
                    console.log(data);

                    d3.selectAll(".arc").select("path").data(pie(data)).enter()
                        .insert("path")
                        .style("fill", function(d) {
                            return color(d.data.name);
                        })
                        .attr("class", "slice").transition().duration(1000)
                        .attrTween("d", function(d) {
                            this._current = this._current || d;
                            var interpolate = d3.interpolate(this._current, d);
                            this._current = interpolate(0);
                            return function(t) {
                                return arc(interpolate(t));
                            };
                        })
                        .exit()
                        .remove();


                    /*this.g.data(pie(data)).enter().append("g")
                .attr("class", "arc")

            this.g.append("path")
                .attr("d", arc)
                .style("fill", function(d) { return color(d.data.name); })

                this.g.append("text")
                    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .text(function(d) { return d.data.name+", "+d.data.money*1000000+"$"; });*



                })
            })
                /*var tabledat$("tbody tr:not(:first):not(:last):last-child");
            var movdata = jQuery(tabledata).text();
            var final = movdata.replace(/M/g,"\n");
            //var next = final.replace(/\./g,":[");
            console.log(final);


            console.log($("table")[0]);*/

        },

        draw_bar_graph: function() {
            var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 60
                },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], 0.1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(5, "%");

            var svg = d3.select(".msBar").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv("json/datanewpie.csv", type, function(error, data) {
                if (error) throw error;

                var keys = Object.keys(data[0]);
                console.log(keys);

                var arr = [1, 4, 7, 2];

                var sortedArr = data.sort(function(a, b) {
                    return b.money - a.money;
                });

                var gaussianArr = [];

                sortedArr.forEach(function(e, i) {
                    if (i % 2) {
                        gaussianArr.push(e);
                    } else {
                        gaussianArr.unshift(e);
                    }
                });

                console.log(gaussianArr);

                x.domain(gaussianArr.map(function(d) {
                    return d.name;
                }));
                y.domain([0, d3.max(gaussianArr, function(d) {
                    return d.money;
                })]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Frequency");

                svg.selectAll(".bar")
                    .data(gaussianArr)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) {
                        return x(d.name);
                    })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) {
                        return y(d.money);
                    })
                    .attr("height", function(d) {
                        return height - y(d.money);
                    })
                    .attr("stroke", "black")
                    .attr("stroke-dasharray", "10,10");


            });

            function type(d) {
                d.money = +d.money;
                return d;
            }
        },

        draw_line_graph: function() {
                var height = 300;
                var width = 600;
                var margin = {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 20
                };

                // formatters for axis and labels
                var currencyFormat = d3.format("$0.2f");
                var decimalFormat = d3.format("0.2f");

                var svg = d3.select(".msLine")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                svg.append("g")
                    .attr("class", "y axis");

                svg.append("g")
                    .attr("class", "x axis");

                var xScale = d3.scale.ordinal()
                    .rangeRoundBands([margin.left, width], .1);

                var yScale = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");

              /*  var line2 = d3.svg.line()
                    .x(function(d) {
                        return x(d.date);
                    })
                    .y(function(d) {
                        return y(d.close);
                    });

                var polyRegression = regression('polynomial', data.map(function(_d) {
                    return [x(_d.date), y(_d.close)]
                }), 3);

                var regLine = d3.svg.line()
                    .x(function(d){return d[0]})
                    .y(function(d){return d[1]});

                svg.append("path")
                      .datum(data)
                      .attr("class", "line")
                      .attr("d", line2);

                svg.append("path")
                    .datum(lindata)
                    .attr("class", "reg")
                    .attr("d", line2);

                svg.append('path')
                    .datum(polyRegression.points)
                    .attr('class', 'poly')
                    .attr('d', regLine)
*/
                d3.csv("movieData3.csv", function(data) {

                    // extract the x labels for the axis and scale domain
                    var xLabels = data.map(function(d) {
                        return d['yearmonth'];
                    })

                    xScale.domain(xLabels);
                    yScale.domain([0, Math.round(d3.max(data, function(d) {
                        return parseFloat(d['rate']);
                    }))]);

                    var line = d3.svg.line()
                        .x(function(d) {
                            return xScale(d['yearmonth']);
                        })
                        .y(function(d) {
                            return yScale(d['rate']);
                        });

                    svg.append("path")
                        .datum(data)
                        .attr("class", "line")
                        .attr("d", line);

                    svg.select(".x.axis")
                        .attr("transform", "translate(0," + (height) + ")")
                        .call(xAxis.tickValues(xLabels.filter(function(d, i) {
                            if (i % 12 == 0)
                                return d;
                        })))
                        .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("transform", function(d) {
                            return "rotate(-45)";
                        });

                    svg.select(".y.axis")
                        .attr("transform", "translate(" + (margin.left) + ",0)")
                        .call(yAxis.tickFormat(currencyFormat));

                    // chart title
                    svg.append("text")
                        .attr("x", (width + (margin.left + margin.right)) / 2)
                        .attr("y", 0 + margin.top)
                        .attr("text-anchor", "middle")
                        .style("font-size", "16px")
                        .style("font-family", "sans-serif")

                    // x axis label
                    svg.append("text")
                        .attr("x", (width + (margin.left + margin.right)) / 2)
                        .attr("y", height + margin.bottom)
                        .attr("class", "text-label")
                        .attr("text-anchor", "middle")
                        .text("Year-Month");

                    // get the x and y values for least squares
                    var xSeries = d3.range(1, xLabels.length + 1);
                    var ySeries = data.map(function(d) {
                        return parseFloat(d['rate']);
                    });

                    var leastSquaresCoeff = leastSquares(xSeries, ySeries);

                    // apply the reults of the least squares regression
                    var x1 = xLabels[0];
                    var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
                    var x2 = xLabels[xLabels.length - 1];
                    var y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
                    var trendData = [
                        [x1, y1, x2, y2]
                    ];

                    var trendline = svg.selectAll(".msLinReg")
                        .data(trendData);

                    trendline.enter()
                        .append("line")
                        .attr("class", "msLinReg")
                        .attr("x1", function(d) {
                            return xScale(d[0]);
                        })
                        .attr("y1", function(d) {
                            return yScale(d[1]);
                        })
                        .attr("x2", function(d) {
                            return xScale(d[2]);
                        })
                        .attr("y2", function(d) {
                            return yScale(d[3]);
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .style("display", "none");

                    // display equation on the chart
                    svg.append("text")
                        .text("eq: " + decimalFormat(leastSquaresCoeff[0]) + "x + " +
                            decimalFormat(leastSquaresCoeff[1]))
                        .attr("class", "text-label")
                        .attr("x", function(d) {
                            return xScale(x2) - 60;
                        })
                        .attr("y", function(d) {
                            return yScale(y2) - 30;
                        });

                    // display r-square on the chart
                    svg.append("text")
                        .text("r-sq: " + decimalFormat(leastSquaresCoeff[2]))
                        .attr("class", "text-label")
                        .attr("x", function(d) {
                            return xScale(x2) - 60;
                        })
                        .attr("y", function(d) {
                            return yScale(y2) - 10;
                        });

                });

                // returns slope, intercept and r-square of the line
                function leastSquares(xSeries, ySeries) {
                    var reduceSumFunc = function(prev, cur) {
                        return prev + cur;
                    };

                    var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
                    var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

                    var ssXX = xSeries.map(function(d) {
                            return Math.pow(d - xBar, 2);
                        })
                        .reduce(reduceSumFunc);

                    var ssYY = ySeries.map(function(d) {
                            return Math.pow(d - yBar, 2);
                        })
                        .reduce(reduceSumFunc);

                    var ssXY = xSeries.map(function(d, i) {
                            return (d - xBar) * (ySeries[i] - yBar);
                        })
                        .reduce(reduceSumFunc);

                    var slope = ssXY / ssXX;
                    var intercept = yBar - (xBar * slope);
                    var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);

                    return [slope, intercept, rSquare];
                }

            }
            /*  draw_map: function() {
                  var width = 1000;
                  var height = 600;
                  var visual = d3.geo.albersUsa().translate([width / 2, height / 2]).scale([1000]);
                  var path = d3.geo.path().projection(visual);
                  var color = d3.scale.linear().range(["rgb(162,144,212)", "rgb(140,76,166)", "rgb(88,92,214)", "rgb(100,148,237)"]);
                  var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];
                  var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
                  var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
                  d3.csv("stateslived.csv", function(data) {
                      color.domain([0, 1, 2, 3]); // setting the range of the input data

                      // Load GeoJSON data and merge with states data
                      d3.json("us-states.json", function(json) {

                          // Loop through each state data value in the .csv file
                          for (var i = 0; i < data.length; i++) {

                              // Grab State Name
                              var dataState = data[i].state;

                              // Grab data value
                              var dataValue = data[i].visited;

                              // Find the corresponding state inside the GeoJSON
                              for (var j = 0; j < json.features.length; j++) {
                                  var jsonState = json.features[j].properties.name;

                                  if (dataState == jsonState) {

                                      // Copy the data value into the JSON
                                      json.features[j].properties.visited = dataValue;

                                      // Stop looking through geoJSON
                                      break;
                                  }
                              }
                          }
                          // Bind the data to the SVG and create one path per GeoJSON feature
                          svg.selectAll("path")
                              .data(json.features)
                              .enter()
                              .append("path")
                              .attr("d", path)
                              .style("stroke", "#fff")
                              .style("stroke-width", "1")
                              .style("fill", function(d) {

                                  // Get data value
                                  var value = d.properties.visited;

                                  if (value) {
                                      //If value exists…
                                      return color(value);
                                  } else {
                                      //If value is undefined…
                                      return "rgb(213,222,217)";
                                  }
                              });


                          // Map the cities I have lived in!
                          d3.csv("cities-lived.csv", function(data) {

                              svg.selectAll("circle")
                                  .data(data)
                                  .enter()
                                  .append("circle")
                                  .attr("cx", function(d) {
                                      return projection([d.lon, d.lat])[0];
                                  })
                                  .attr("cy", function(d) {
                                      return projection([d.lon, d.lat])[1];
                                  })
                                  .attr("r", function(d) {
                                      return Math.sqrt(d.years) * 4;
                                  })
                                  .style("fill", "rgb(217,91,67)")
                                  .style("opacity", 0.85)

                              // Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks"
                              // http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
                              .on("mouseover", function(d) {
                                  div.transition()
                                      .duration(200)
                                      .style("opacity", .9);
                                  div.text(d.place)
                                      .style("left", (d3.event.pageX) + "px")
                                      .style("top", (d3.event.pageY - 28) + "px");
                              })

                              // fade out tooltip on mouse out
                              .on("mouseout", function(d) {
                                  div.transition()
                                      .duration(500)
                                      .style("opacity", 0);
                              });
                          });

                          // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
                          var legend = d3.select("body").append("svg")
                              .attr("class", "legend")
                              .attr("width", 140)
                              .attr("height", 200)
                              .selectAll("g")
                              .data(color.domain().slice().reverse())
                              .enter()
                              .append("g")
                              .attr("transform", function(d, i) {
                                  return "translate(0," + i * 20 + ")";
                              });

                          legend.append("rect")
                              .attr("width", 18)
                              .attr("height", 18)
                              .style("fill", color);

                          legend.append("text")
                              .data(legendText)
                              .attr("x", 24)
                              .attr("y", 9)
                              .attr("dy", ".35em")
                              .text(function(d) {
                                  return d;
                              });
                      });

                  });*/



    });

    return view;

});
