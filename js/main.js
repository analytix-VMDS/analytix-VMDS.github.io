/*
/ Main script that acts as the entry point for the application
*/

requirejs.config({
    baseUrl:'',
    paths: {
        backbone: 'lib/backbone/backbone-min',
        bootstrap: 'lib/bootstrap/js/bootstrap.min',
        d3: 'lib/d3/d3.min',
        jquery: 'lib/jquery/jquery.min',
        jqueryui: 'lib/jquery-ui/jquery-ui.min',
        underscore: 'lib/underscore/underscore-min'
    }
})

// Main application single entry point
requirejs([
    'jquery',
    'd3',
    'js/models/graph',
    'js/views/graph'
],function($, d3, Model, View) {

  var data = [];
  var scope = this;

  for(var i = 0; i < 1; i++) {
    d3.json("json/file"+i+".json", function(error, json){

      if (error) {  //If error is not null, something went wrong.
        console.log(error);  //Log the error.
      } else {      //If no error, the file loaded correctly.

        //Include other code to execute after successful file load here
        data = json;
        caller(data);

      }
    })
  }

  var caller = function(data) {
    //console.log(data);
    this.graph_model = new Model( data );
    this.graph_view = new View( { "model" : this.graph_model } );
    //console.log(this.graph_model)
  }


});
