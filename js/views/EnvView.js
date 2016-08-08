define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/EnvModel',
    'js/views/mappings'

], function($, $ui, d3, backbone, envModel, mappings) {

    var view = backbone.View.extend({

        initialize: function(){
          console.log("environment");
          var n = 1;
          this.table();
          //this.test_bar();
          //this.model = new envModel();/*
          //this.listenTo(this.model, 'sync', this.render);
          //this.model.fetch();*/
          //console.log(this.model);
        },

        render: function() {
          //alert('My model loaded: ' + this.model.toJSON());
          /*var jsdata = this.model.toJSON();
          this.table(jsdata);
          this.test_bar(jsdata);*/
          //return data;
        },

        table: function() {
          //console.log(this.model.get("datasets"));

          // Gets table from mappings.js with data as parameter
          // Works w/ two dimensional data
          var table = new mappings();
          return table.table_mapping(this.model.get("datasets"));
        },

        test_bar: function(){
        //  console.log(this.render());
        //  console.log(data);
          var bar = new mappings();
          return bar.bar_graph_mapping("some message");
        }

      });

      return view;

    });
