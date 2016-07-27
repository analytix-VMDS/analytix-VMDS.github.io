
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
          d3.json("json/test.json", function(data){
            console.log(data);
          })
          console.log("u");
          /*var zip = $('select option:selected').text().substring(1, 6);
          $.getJSON('http://data.colorado.gov/resource/4ykn-tg5h.json?entityStatus=Good%20Standing&principalZipCode=', function (data) {
            console.log(data);
          });*/
          /*var user = new User();
          $.ajax({
              type: 'POST',
              url : 'http://demo.ckan.org/api/3/action/group_list',
              crossDomain: true,
              data: JSON.stringify(user),
              contentType:'application/json; charset=utf-8',
              dataType: 'json'
          });*/
          d3.select("svg").style("background", "blue");


        }

      });

      return view;

    });
