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
    'js/models/HealthModel',
    'js/views/graph',
    'js/views/HealthView',
],function($, d3, healthModel, View, healthView) {

  var data = [];
  var scope = this;

var ajaxdata = function(api) {
   $.ajax({
      url: api,
      data: {
         format: 'json'
      },
      error: function() {
         $('#info').html('<p>An error has occurred</p>');
      },
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);

      },
      type: 'GET'
   });
 }

 ajaxdata('http://services.cngnow.com/V1/Stations.svc/external/circlefilter?latitude=35.4675&longitude=-97.5161&range=15&status=active');

    this.graph_model = new healthModel( data );

    this.enter_view = new healthView( { "model" : this.graph_model } );

});
