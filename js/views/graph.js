
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph'

], function($, $ui, d3, backbone, Model) {

    var view = backbone.View.extend({

        initialize: function(){

          /*this.element = "#svg_location"

          this.width = this.model.get("width");
          this.height = this.model.get("height");

          this.svg = d3.select(this.element).append("svg")
            .attr("width", this.width)
            .attr("height", this.height);*/

          this.draw_graph();
          this.draw_google_maps();

        },

        draw_graph: function() {
          d3.json("json/test.json", function(data){
            console.log(data);
          })

          //d3.select("svg").style("background", "blue");


        },

        draw_google_maps: function() {
          function initMap() {
              // Create a map object and specify the DOM element for display.
              var map = new google.maps.Map(document.getElementById('map'), {
                  center: {
                      lat: -34.397,
                      lng: 150.644
                  },
                  scrollwheel: false,
                  zoom: 8
              });
          }
        }

      });

      return view;

    });
