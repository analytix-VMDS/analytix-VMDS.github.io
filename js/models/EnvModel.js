define([
    'jquery',
    'd3',
    'backbone'
], function($, d3, backbone) {

    var model = backbone.Model.extend({

      //url:'http://apiv3.iucnredlist.org/api/v3/species/page/1?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee',

        // Initial attributes
        defaults:{
            "width": 900,
            "height": 600
        },

        initialize: function(data){
            // Data is going to be an array of objects.
            console.log(data);

            this.set({
              "datasets": data,
            })

        },

    });

    return model;

});
