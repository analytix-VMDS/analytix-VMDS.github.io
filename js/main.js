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
    'js/views/graph',
    'js/views/EnterView',
    'js/views/EnvView',
    'js/views/HealthView',
    'js/views/VoteView',
    'js/views/WagesView'
],function($, d3, Model, View, enterView, envView, healthView, voteView, wagesView) {

  var data = [];
  var scope = this;

  /*$.ajax({
      url:"data-grabber.py", success: function(){alert("DONE");}
 });*/

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

    this.enter_view = new enterView( { "model" : this.graph_model } );
    this.env_view = new envView( { "model" : this.graph_model } );
    this.health_view = new healthView( { "model" : this.graph_model } );
    this.vote_view = new voteView( { "model" : this.graph_model } );
    this.wages_view = new wagesView( { "model" : this.graph_model } );

    this.graph_view = new View( { "model" : this.graph_model } );
    //console.log(this.graph_model)
  }


});
