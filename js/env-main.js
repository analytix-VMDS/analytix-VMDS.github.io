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
		'js/models/EnvModel',
		//'js/views/graph',
		'js/views/EnvView',
],function($, d3, envModel, envView) {

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
			dataType: 'json',
			success: function(d) {
				console.log(d);
				data.push(d);
				//console.log(data);

				this.env_model = new envModel( d );
				//console.log(this.env_model);
				//this.env_model = new envModel();
				this.env_view = new envView( { "model" : this.env_model } );

			},
			type: 'GET'
	 });
 }


 /*$.ajax({
		url: 'http://uselectionatlas.org/WIKI/api.php',
		async: false,
		success: function(data) {
				console.log(data);
		}
});*/
//ajaxdata('http://apiv3.iucnredlist.org/api/v3/species/page/1?token=1da43ebfc20ad97f3b32afcee87d47b77d8acfac9113d2273f15c97e26e047c4')

ajaxdata('http://apiv3.iucnredlist.org/api/v3/threats/species/name/Loxodonta%20africana?token=1da43ebfc20ad97f3b32afcee87d47b77d8acfac9113d2273f15c97e26e047c4');
 //ajaxdata('http://services.cngnow.com/V1/Stations.svc/external/circlefilter?latitude=35.4675&longitude=-97.5161&range=15&status=active');
 //ajaxdata('http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&cluster=yes&appid=9729c6690aededc3e82e090ffc14c81f');
 //ajaxdata('http://apiv3.iucnredlist.org/api/v3/species/page/1?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee');

		//console.log(data);


});
