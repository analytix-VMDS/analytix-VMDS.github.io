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

        bar_graph_mapping: function(mess) {
          console.log(mess);
          
        }

    });

    return view;

});
