
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

          this.draw_graph();

        },

        draw_graph: function() {
          d3.select("svg").style("background", "blue");
          d3.select(".icon").on("mouseover", function(){
            d3.select(".icon").transition().style("background-color", "purple");
          })

        }

      });

      return view;

    });
