define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph',
    'http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js'

], function($, $ui, d3, backbone, Model) {

    var view = backbone.View.extend({

        /*initialize: function() {

        },*/

        table_mapping: function(data){
          console.log(data);
          //this.update(data);

          var scope = this;

          var invalidchar = /[|&;$%@"<>()+,]/g;
          var keydata = Object.keys(data[0]);
          console.log(keydata);

          d3.select("#xaxis").selectAll("option:not(:first-child)")
              .data(keydata).enter()
              .append("option")
              .text(function(d){return d;})
              .attr("value",function(d){return d;})
              .attr("class","xaxis_opt");

          d3.select("#yaxis").selectAll("option:not(:first-child)")
              .data(keydata).enter()
              .append("option")
              .text(function(d){return d;})
              .attr("value",function(d){return d;})
              .attr("class","yaxis_opt");

          //d3.select("#yaxis").select("option:last-child")
            //      .attr("disabled");

          var table = d3.select("#table_loc") //.data(data).enter()
              .append("table")
              .attr("class", "table table-condensed")
              .style("margin-bottom", "0px");

          var tbody = table.append("tbody");

          var keysdisabled = [];

          var trheader = tbody.append("tr").selectAll("th")
              .data(keydata).enter()
              .append("th")
              .text(function(d) {
                  return d;
              })
              .style("background-color", "lightgrey")
              .on("mouseover", function() {
                  d3.select(this).style("background-color", "grey");
                  var key = d3.select(this).datum().replace(invalidchar, "");
                  d3.selectAll("." + key).style("background-color", "yellow");
              })
              .on("mouseout", function() {
                  d3.select(this).style("background-color", "lightgrey");

                  var key = d3.select(this).datum().replace(invalidchar, "");
                  d3.selectAll("." + key).style("background-color", "white");
              })
              .on("click", function() {
                  var keyname = d3.select(this).datum().replace(invalidchar, "");

                  tp = $("."+keyname).css('opacity') == '1' ? '.5' : '1';
                  $("."+keyname).animate({
                    opacity: tp
                  });

                  function toggleArrayItem(a, v) {
                      var i = a.indexOf(v);
                      if (i === -1)
                          a.push(v);
                      else
                          a.splice(i,1);
                  }

                  toggleArrayItem(keysdisabled, keyname);

                  //scope.carrier(keysdisabled);

              });

          //console.log(keyval());

          var trdata = tbody.selectAll("tr:not(:first-child)")
              .data(data).enter()
              .append("tr");

          console.log(trdata.datum());

          var length = keydata.length;

          function tdCallback(d){
            var key = Object.keys(d)[i];
            return d[key];
          }
          function classCallback(d){
            var key = Object.keys(d)[i];
            return key.replace(invalidchar, "");
          }

          for (var i = 0; i < length; i++) {
              trdata.append("td")
                  .text(tdCallback)
                  .attr("class", classCallback);
          }


          this.carrier(data, keydata);

          return "some val";
        },

        carrier: function(data, allkeys) {

          var scope = this;
          $(".graph").click(function(){
            var xaxis = $("#xaxis").val();
            var yaxis = $("#yaxis").val();

            d3.select(".msBar svg").remove();

            console.log($("#visuals").val());
            var functionvalue= $("#visuals").val();
            scope[functionvalue](data, xaxis, yaxis, allkeys);
          });

          $(".update").click(function(){
            var xaxis = $("#xaxis").val();
            var yaxis = $("#yaxis").val();

            scope.update(data, xaxis, yaxis);
          });
        },

        update: function(newdata, xkey, ykey) {
          console.log(newdata);

          var scope = this;

          var barUpdate = d3.select("svg").data(newdata).transition()
            .attr("transform", function(d) { return "translate(" + scope.x(d[xkey]) + ",0)"; })
            //.attr("transform", function(d) { return "translate(40,20)"; });


          barUpdate.selectAll("rect")//.data(newdata).transition()
              .attr("y", function(d) { return scope.y(d[ykey]); })
              .attr("height", function(d) { return 960-170 - scope.y(d[ykey]); })
              .attr("width", scope.x.rangeBand())
          /*$(".update").click(function(){
            console.log(newdata);
            //d3.selectAll(".bar").data(newdata).

          });*/
          //console.log(data);
        },

        bar_graph_mapping: function(data, xkey, ykey, allkeys) {
          var margin = {
                  top: 20,
                  right: 20,
                  bottom: 150,
                  left: 60
              },
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

          this.x = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);

          this.y = d3.scale.linear()
              .range([height, 0]);

          this.xAxis = d3.svg.axis()
              .scale(this.x)
              .orient("bottom");

          this.yAxis = d3.svg.axis()
              .scale(this.y)
              .orient("left")
              // this could be a value the user could change
              .ticks(10);

          this.tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                //var keydata = Object.keys(d);
                //console.log(keydata);
                  return "<strong>"+xkey+": "+d[xkey]+"</strong> <br> <span style='color:red'>"+ykey+": "+d[ykey]+"</span>";
              })

          var svg = d3.select(".msBar").append("svg")
              //.attr("overflow","visible")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          svg.call(this.tip);

              this.x.domain(data.map(function(d) {
                  return d[xkey];
              }));
              this.y.domain([0, d3.max(data, function(d) {
                  return +d[ykey];
              })]);

              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(this.xAxis)
                  .selectAll("text")
                  .attr("y", 0)
                  .attr("x", 9)
                  .attr("dy", ".35em")
                  .attr("transform", "rotate(45)")
                  .style("text-anchor", "start");


              svg.append("g")
                  .attr("class", "y axis")
                  .call(this.yAxis)
                  .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text(ykey);

              var scope = this;

              svg.selectAll(".bar")
                  .data(data)
                  .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) {
                      return scope.x(d[xkey]);
                  })
                  .attr("width", this.x.rangeBand())
                  .attr("y", function(d) {
                      return scope.y(+d[ykey]);
                  })
                  .attr("height", function(d) {
                      return height - scope.y(+d[ykey]);
                  })
                  .attr("fill", function(d){
                    return "rgb(0, "+d[ykey]+",0)";
                  })
                  //.style("overflow","visible")
                  .on("click", function(){
                    svg.selectAll("rect")
                       .sort(function(a, b) {
                             return d3.ascending(a, b);
                       })
                       .transition()
                       .duration(1000)
                       .attr("x", function(d, i) {
                             return scope.x(d[xkey]);
                       })
                       .attr("y", function(d, i) {
                             return scope.y(d[ykey]);
                       });
                  })
                  .on('mouseover', this.tip.show)
                  .on('mouseout', this.tip.hide);

              //d3.selectAll("g").attr("overflow","visible");


             //function update(newdata) {

             //}
             /*$(".update").click(function(){
               console.log(data);
             });*/

        },

        pie_graph_mapping: function(data, xkey, ykey) {
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
                  return d[ykey];
              });

          // Paremeter here
          var svg = d3.select(".msBar").append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

              this.g = svg.selectAll(".arc")
                  .data(pie(data))
                  .enter().append("g")
                  .attr("class", "arc")

              this.g.append("path")
                  .attr("d", arc)
                  .style("fill", function(d) {
                      return color(d.data[xkey]);
                  })
                  .on("mouseover", function() {
                      d3.select(this).transition().attr("d", newarc)
                  })
                  .on("mouseout", function() {
                      d3.select(this).transition().attr("d", arc);
                  })

              this.g.append("text")
                  .attr("transform", function(d) {
                      return "translate(" + labelArc.centroid(d) + ")";
                  })
                  .attr("dy", ".35em")
                  .text(function(d) { // Another paremeter here
                      return d.data[xkey] + ", " + d.data[ykey] + " $";
                  });

        },

        line_graph_mapping: function(datajs, xkey, ykey) {

          var dataset1 = [{
            'qName': 'Q1',
                'PFTE': '10',
                'EFTE': '62.7',
                'SOME': '72.2'
          }, {
            'qName': 'Q2',
                'PFTE': '58',
                'EFTE': '59.9',
                'SOME': '67.7'
          }, {
            'qName': 'Q3',
                'PFTE': '53.3',
                'EFTE': '59.1',
                'SOME': '69.4'
          }, {
            'qName': 'Q4',
                'PFTE': '35.7',
                'EFTE': '58.8',
                'SOME': '68'
          }, {
            'qName': 'Q5',
                'PFTE': '34.2',
                'EFTE': '58.7',
                'SOME': '72.4'
          }, ];

          var dataset2 = [{
            'qName': 'Q1',
                'PFTE': '53.4',
                'EFTE': '52.7',
                'SOME': '62.2'
          }, {
            'qName': 'Q2',
                'PFTE': '48',
                'EFTE': '49.9',
                'SOME': '57.7'
          }, {
            'qName': 'Q3',
                'PFTE': '33.3',
                'EFTE': '49.1',
                'SOME': '59.4'
          }, {
            'qName': 'Q4',
                'PFTE': '45.7',
                'EFTE': '48.8',
                'SOME': '58'
          }, {
            'qName': 'Q5',
                'PFTE': '54.2',
                'EFTE': '48.7',
                'SOME': '62.4'
          }, ];

          var margin = {
            top: 20,
            right: 80,
            bottom: 30,
            left: 50
          },
          width = 560 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

          //var parseDate = d3.time.format("%Y%m%d").parse;
          var x = d3.scale.ordinal().rangeRoundBands([0, width], .2);
          var y = d3.scale.linear().rangeRound([height, 0]);

          /*var x = d3.time.scale()
            .range([0, width]);

          var y = d3.scale.linear()
            .range([height, 0]);*/

          var color = d3.scale.category10();

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");


          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

          var line = d3.svg.line()
            //.interpolate("basis")
            .x(function (d) {
                return x(d.qName);
            })
            .y(function (d) {
              console.log(d);
                return y(d.qValue);
            });

          var svg = d3.select(".msBar").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

          svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("EFTE (F)");

          update(dataset1);

          /*var transitionInterval = setInterval(function () {
            update(dataset2);
          }, 1000);*/

          $(".update").click(function(){
            update(dataset2);
          });

          // draw and redraw, calculate axes/domains, etc here
          function update(dataset) {


            color.domain(d3.keys(dataset[0]).filter(function (key) {
                return key !== "qName";
            }));

            var efteValues = color.domain().map(function (name) {
            return {
                name: name,
                values: dataset.map(function (d) {
                    return {
                        qName: d.qName,
                        qValue: +d[name]
                    };
                })
                };
            });

            console.log(efteValues);
            x.domain(dataset.map(function(d) {
              return d.qName; }));

            y.domain([
            d3.min(efteValues, function (c) {
                return d3.min(c.values, function (v) {
                    return v.qValue;
                });
            }),
            d3.max(efteValues, function (c) {
                return d3.max(c.values, function (v) {
                    return v.qValue;
                });
            })]);

            // update axes
            d3.transition(svg).select('.y.axis')
                .call(yAxis);

            d3.transition(svg).select('.x.axis')
                .call(xAxis);

            var city = svg.selectAll(".city")
                .data(efteValues);

            var cityEnter = city.enter().append("g")
                .attr("class", "city");

            cityEnter.append("path")
                .attr("class", "line")
                .attr("d", function (d) {
                    return line(d.values);
                })
                .style("stroke", function (d) {
                    return color(d.name);
                });

            // transition by selecting 'city'...
            cityUpdate = d3.transition(city);

            // ... and each path within
            cityUpdate.select('path')
               .transition().duration(600)
                .attr("d", function (d) {
                    return line(d.values);
                });

            city.exit().remove();

            //clearInterval(transitionInterval);
          }

        },

        bw_graph_mapping: function(datajs, xkey, ykey) {
          //initialize the dimensions
          var margin = {top: 10, right: 10, bottom: 10, left: 10},
              width = 800 - margin.left - margin.right,
              height = 100 - margin.top - margin.bottom,
              padding = 20
              midline = (height - padding) / 2;

          //initialize the x scale
          var xScale = d3.scale.linear()
                         .range([padding, width - padding]);

          //initialize the x axis
          var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom");

          var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                //var keydata = Object.keys(d);
                //console.log(keydata);
                  return "<strong>"+xkey+": "+d[xkey]+"</strong> <br> <span style='color:red'>"+ykey+": "+d[ykey]+"</span>";
              })

          //initialize boxplot statistics
          var data = [],
              outliers = [],
              minVal = Infinity,
              lowerWhisker = Infinity,
              q1Val = Infinity,
              medianVal = 0,
              q3Val = -Infinity,
              iqr = 0,
              upperWhisker = -Infinity,
              maxVal = -Infinity;

            data = datajs.map(function(d) {
              return d[ykey];
            });

            data = data.sort(d3.ascending);

            //calculate the boxplot statistics
            minVal = data[0],
            q1Val = d3.quantile(data, .25),
            medianVal = d3.quantile(data, .5),
            q3Val = d3.quantile(data, .75),
            iqr = q3Val - q1Val,
            maxVal = data[data.length - 1];
            // lowerWhisker = d3.max([minVal, q1Val - iqr])
            // upperWhisker = d3.min([maxVal, q3Val + iqr]);

            var index = 0;

            //search for the lower whisker, the mininmum value within q1Val - 1.5*iqr
            while (index < data.length && lowerWhisker == Infinity) {

              if (data[index] >= (q1Val - 1.5*iqr))
                lowerWhisker = data[index];
              else
                outliers.push(data[index]);
              index++;
            }

            index = data.length-1; // reset index to end of array

            //search for the upper whisker, the maximum value within q1Val + 1.5*iqr
            while (index >= 0 && upperWhisker == -Infinity) {

              if (data[index] <= (q3Val + 1.5*iqr))
                upperWhisker = data[index];
              else
                outliers.push(data[index]);
              index--;
            }

            //map the domain to the x scale +10%
            xScale.domain([0,maxVal*1.10]);

            var svg = d3.select(".msBar")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height);

            //append the axis
            svg.append("g")
               .attr("class", "axis")
               .attr("transform", "translate(0, " + (height - padding) + ")")
               .call(xAxis);

            //draw verical line for lowerWhisker
            svg.append("line")
               .attr("class", "whisker")
               .attr("x1", xScale(lowerWhisker))
               .attr("x2", xScale(lowerWhisker))
               .attr("stroke", "black")
               .attr("y1", midline - 10)
               .attr("y2", midline + 10);

            //draw vertical line for upperWhisker
            svg.append("line")
               .attr("class", "whisker")
               .attr("x1", xScale(upperWhisker))
               .attr("x2", xScale(upperWhisker))
               .attr("stroke", "black")
               .attr("y1", midline - 10)
               .attr("y2", midline + 10);

            //draw horizontal line from lowerWhisker to upperWhisker
            svg.append("line")
               .attr("class", "whisker")
               .attr("x1",  xScale(lowerWhisker))
               .attr("x2",  xScale(upperWhisker))
               .attr("stroke", "black")
               .attr("y1", midline)
               .attr("y2", midline);

            //draw rect for iqr
            svg.append("rect")
               .attr("class", "box")
               .attr("stroke", "black")
               .attr("fill", "white")
               .attr("x", xScale(q1Val))
               .attr("y", padding)
               .attr("width", xScale(iqr) - padding)
               .attr("height", 20);

            //draw vertical line at median
            svg.append("line")
               .attr("class", "median")
               .attr("stroke", "black")
               .attr("x1", xScale(medianVal))
               .attr("x2", xScale(medianVal))
               .attr("y1", midline - 10)
               .attr("y2", midline + 10);

            svg.call(tip);

            //draw data as points
            svg.selectAll("circle")
               .data(datajs)
               .enter()
               .append("circle")
               .attr("r", 2.5)
               .attr("class", function(d) {
                if (d[ykey] < lowerWhisker || d[ykey] > upperWhisker)
                  return "outlier";
                else
                  return "point";
               })
               .attr("cy", function(d) {
                return random_jitter();
               })
               .attr("cx", function(d) {
                return xScale(d[ykey]);
               })
               .on("mouseover", tip.show)
               .on("mouseout", tip.hide)//it's like... yeah.
               .append("title")
               .text(function(d) {
                return "Date: " + d[xkey] + "; value: " + d[ykey];
               });

          function random_jitter() {
            if (Math.round(Math.random() * 1) == 0)
              var seed = -5;
            else
              var seed = 5;
            return midline + Math.floor((Math.random() * seed) + 1);
          }

          function type(d) {
            //d.value = +d.value; // coerce to number
            return d;
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

          var analyzation_options = {"bar_graph_mapping": ["None","Gaussian Curve", "Normal Distribution","Polynomial Regression","Linear Regression"],
                                      "pie_graph_mapping": ["None", "Sort"],
                                      "line_graph_mapping": ["None", "Polynomial Regression","Linear Regression"],
                                      "bw_graph_mapping": ["None", "Sort","Quartile"]};

          console.log(analyzation_options);
          d3.select("#analyze").selectAll("option")
              .data(analyzation_options.bar_graph_mapping).enter()
              .append("option")
              .text(function(d){return d});

          var scope = this;

          $("#visuals").on("change", function() {
            d3.select("#analyze").selectAll("option").remove();

            var anval = $(this).val();
            d3.select("#analyze").selectAll("option")
                .data(analyzation_options[anval]).enter()
                .append("option")
                .text(function(d){return d});
          });
        }

    });

    return view;

});
