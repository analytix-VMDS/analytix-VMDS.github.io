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
    'js/models/WagesModel',
    'js/views/graph',
    'js/views/WagesView',
],function($, d3, wagesModel, View, wagesView) {

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

    this.wages_model = new wagesModel( data );

    this.wages_view = new wagesView( { "model" : this.wages_model } );

});
