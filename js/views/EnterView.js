define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',

], function($, $ui, d3, backbone) {

    var view = backbone.View.extend({

        initialize: function() {

            this.alternate_types_of_graphs();
            this.draw_pie_graph();
            this.draw_bar_graph();
            this.draw_line_graph();
            this.draw_table();
            this.alternate_types_of_analyses();
            this.alternate_types_of_subtopics();

        },

        draw_table: function() {
            //var vcc = /[~!@$%^&*&*()()+=,./';:"?>[]\{}|`#]/g;
            //var f = /fsad/g;
            var invalidchar = /[|&;$%@"<>()+,]/g;
            d3.csv("json/datanewpie.csv", function(error, data) {
                if (error) throw error;

                var table = d3.select("#table_loc") //.data(data).enter()
                    .append("table")
                    .attr("class", "table table-condensed")
                    .style("margin-bottom", "0px")

                var keydata = Object.keys(data[0]);

                var tbody = table.append("tbody");

                var trheader = tbody.append("tr").selectAll("th")
                    .data(keydata).enter()
                    .append("th")
                    .text(function(d) {
                        return d;
                    })
                    .style("background-color", "lightgrey")
                    .on("mouseover", function() {
                        d3.select(this).style("background-color", "grey")
                        var key = d3.select(this).datum().replace(invalidchar, "");
                        d3.selectAll("." + key).style("background-color", "yellow")
                    })
                    .on("mouseout", function() {
                        d3.select(this).style("background-color", "lightgrey")

                        var key = d3.select(this).datum().replace(invalidchar, "");
                        d3.selectAll("." + key).style("background-color", "white")
                    })
                    .on("click", function() {
                        var keyname = d3.select(this).datum();
                        console.log(keyname);
                    })

                var trdata = tbody.selectAll("tr")
                    .data(data).enter()
                    .append("tr")
                var length = keydata.length;
                for (var i = 0; i < length; i++) {
                    trdata.append("td")
                        .text(function(d) {
                            //console.log(d);
                            var key = Object.keys(d)[i];
                            return d[key];
                        })
                        .attr("class", function(d) {
                            var key = Object.keys(d)[i];
                            return key.replace(invalidchar, "");
                        });
                }

            });

            $("#accordion").draggable().resizable({
                alsoResize: "#table_loc"
            });
            $("#table_loc").resizable();
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
                    .text(function(d) {
                        return d.data.name + ", " + d.data.money * 1000000 + "$";
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
                .rangeRoundBands([0, width], .1);

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

                x.domain(data.map(function(d) {
                    return d.name;
                }));
                y.domain([0, d3.max(data, function(d) {
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
                    .data(data)
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
                    .attr("stroke-dasharray", "10,10")
                    /*.style("fill", function(d) {
                         console.log(d.money);
                         return "rgb(0, 0," + d.money * 2 + ")"; // "green";
                     });*/
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

                    $(".msLine").click(function(){
                     $(".msLinReg").show();
                    });

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

    });

    return view;

});
