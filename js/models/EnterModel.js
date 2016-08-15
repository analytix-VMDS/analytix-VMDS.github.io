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
            this.set({
              "datasets": data,
            })

        },

        url:"http://services.cngnow.com/V1/Stations.svc/external/circlefilter?latitude=35.4675&longitude=-97.5161&range=15&status=active"

    });

    return model;

});
