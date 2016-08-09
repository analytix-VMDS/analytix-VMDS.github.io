define([
    'jquery',
    'd3',
    'backbone'
], function($, d3, backbone) {

    var model = backbone.Model.extend({

        // Initial attributes
        defaults:{
            "width": 900,
            "height": 600
        },

        initialize: function(data){
            // Data is going to be an array of objects.

            console.log("model");

            this.set({
              "datasets": data,
            })

        },

        data: function() {

        }

    });

    //var d = new Data()

    return model;

});
