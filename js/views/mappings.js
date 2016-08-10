define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph'

], function($, $ui, d3, backbone, Model) {

    var view = backbone.View.extend({

        /*initialize: function() {

        },*/

        table_mapping: function(data){
          console.log(data);

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

          //console.log(trheader.datum());
          //console.log(keysdisabled);
          this.carrier(data);

          return "some val";
        },

        carrier: function(data) {
          //console.log(keys);
          //console.log($("#xaxis").val());
          var scope = this;
          $(".graph").click(function(){
            var xaxis = $("#xaxis").val();
            var yaxis = $("#yaxis").val();
            console.log($("#xaxis").val() + " " +$("#yaxis").val());
            console.log(data);
            d3.select(".msBar svg").remove();
            var functionvalue= "bar_graph_mapping";
            window['scope']['bar_graph_mapping'](data, xaxis, yaxis);
          });
        },

        bar_graph_mapping: function(data, xkey, ykey) {
          //console.log(mess);

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

              /*Object.filter = function (obj, ignore, invert) {
                if (ignore === undefined) {
                    return obj;
                }
                invert = invert || false;
                var not = function(condition, yes) { return yes ? !condition : condition; };
                var isArray = Ext.isArray(ignore);
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) &&
                            (isArray && not(!Ext.Array.contains(ignore, key), invert)) ||
                            (!isArray && not(!ignore.call(undefined, key, obj[key]), invert))) {
                        delete obj[key];
                    }
                }
                return obj;
            };*/


              var keys = Object.keys(data[0]);
              console.log(keys);

              x.domain(data.map(function(d) {
                  return d[xkey];
              }));
              y.domain([0, d3.max(data, function(d) {
                  return d[ykey];
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
                      return x(d[xkey]);
                  })
                  .attr("width", x.rangeBand())
                  .attr("y", function(d) {
                      return y(d[ykey]);
                  })
                  .attr("height", function(d) {
                      return height - y(d[ykey]);
                  })
                  //.attr("stroke", "black")
                  //.attr("stroke-dasharray", "10,10")
                  /*.style("fill", function(d) {
                       console.log(d.money);
                       return "rgb(0, 0," + d.money * 2 + ")"; // "green";
                   });*/

          function type(d) {
              //d.money = +d.money;
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
        }

    });

    return view;

});
