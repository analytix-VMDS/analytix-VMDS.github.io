define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph'

], function($, $ui, d3, backbone, Model) {

    var view = backbone.View.extend({

        initialize: function() {

            this.alternate_types_of_graphs();
            this.draw_pie_graph();
            this.draw_bar_graph();
            this.draw_line_graph();
            this.draw_table();
            this.draw_line_reg();
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
                        d3.select(this).style("background-color", "blue")
                        var key = d3.select(this).datum().replace(invalidchar, "");
                        d3.selectAll("." + key).style("background-color", "green")
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

                for (var i = 0; i < keydata.length; i++) {
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

            var getPrev = ["msLinReg"];
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
                console.log(getPrev);

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

            d3.csv("json/data.csv", type, function(error, data) {
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
            var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 50
                },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var formatDate = d3.time.format("%d-%b-%y");

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var line = d3.svg.line()
                .x(function(d) {
                    //console.log(x(d));
                    return x(d.IssueDate);
                })
                .y(function(d) {
                    //console.log(y(d));
                    return y(d.money);
                });

            var svg = d3.select(".msLine").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv("json/datanewpie.csv", type, function(error, data) {
                if (error) throw error;
                console.log(data);

                x.domain(d3.extent(data, function(d) {
                    //console.log(d.IssueDate);
                    return d.IssueDate;
                }));
                y.domain(d3.extent(data, function(d) {
                    console.log(d.IssueDate);
                    return d.money;
                }));

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
                    .text("Price ($)");

                svg.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("d", line);
            });

            function type(d) {
                d.IssueDate = formatDate.parse(d.IssueDate);
                d.money = +d.money;
                return d;
            }
        },

        draw_line_reg: function() {
            var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 50
                },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var formatDate = d3.time.format("%d-%b-%y");

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var line = d3.svg.line()
                .x(function(d) {
                    return x(d.date);
                })
                .y(function(d) {
                    return y(d.close);
                });

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.tsv("movieData3.tsv", type, function(error, data) {
                if (error) throw error;

                x.domain(d3.extent(data, function(d) {
                    return d.date;
                }));
                y.domain(d3.extent(data, function(d) {
                    return d.close;
                }));

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
                    .text("Price ($)");

                svg.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("d", line);
            });

            function type(d) {
                d.date = formatDate.parse(d.date);
                d.close = +d.close;
                return d;
            }

        }

    });

    return view;

});
