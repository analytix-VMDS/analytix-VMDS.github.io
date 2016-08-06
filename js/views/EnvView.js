define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph',
    'js/views/mappings'

], function($, $ui, d3, backbone, Model, mappings) {

    var view = backbone.View.extend({

        initialize: function(){
          console.log("environment");
          var n = 1;
          this.test_bar();
        },

        test_bar: function(){
          var bar = new mappings();
          return bar.bar_graph_mapping("some message");
        }

      });

      return view;

    });
