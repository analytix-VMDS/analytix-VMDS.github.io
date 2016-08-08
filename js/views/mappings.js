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
          var invalidchar = /[|&;$%@"<>()+,]/g;
          var table = d3.select("#table_loc") //.data(data).enter()
              .append("table")
              .attr("class", "table table-condensed")
              .style("margin-bottom", "0px");

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
                  var keyname = d3.select(this).datum();
                  console.log(keyname);
              });

          var trdata = tbody.selectAll("tr")
              .data(data).enter()
              .append("tr");

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

      $("#accordion").draggable().resizable({
          alsoResize: "#table_loc"
      });
      $("#table_loc").resizable();
        },

        bar_graph_mapping: function(mess) {
          console.log(mess);

        }

    });

    return view;

});
