define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph'

], function($, $ui, d3, backbone, Model) {

    var view = backbone.View.extend({

        initialize: function(){
          console.log("response");
          this.draw_table();
          this.api_options_toggle();
          //this.

        },

        draw_table: function(){
          $( "#city" ).autocomplete({
            source: function( request, response ) {
              $.ajax( {
                url: "http://apiv3.iucnredlist.org/api/v3/species/page/1?token=1da43ebfc20ad97f3b32afcee87d47b77d8acfac9113d2273f15c97e26e047c4",
                dataType: "json",
                data: {
                  q: request.term
                },
                success: function( data ) {
                  var arrofsn = [];
                  for(var i = 0; i < data.result.length; i++) {
                    arrofsn.push(data.result[i].scientific_name);
                  }
                  response($.ui.autocomplete.filter(arrofsn, request.term));

                }
              });
            },
            minLength: 2,

          });

          $(".create").click(function(){
            var scientificName = $("#city").val().replace(" ","%20");
            var factor = $("#factors").val();
            //console.log($("#city").val()+" "+$("#factors").val());
            var api =  'http://apiv3.iucnredlist.org/api/v3/'+factor+'/species/name/'+scientificName+'?token=1da43ebfc20ad97f3b32afcee87d47b77d8acfac9113d2273f15c97e26e047c4';
            //console.log('http://apiv3.iucnredlist.org/api/v3/'+factor+'/species/name/'+scientificName+'?token=1da43ebfc20ad97f3b32afcee87d47b77d8acfac9113d2273f15c97e26e047c4');

            console.log(api);

            $.ajax({
              url: api,
              data: {
                 format: 'json'
              },
              error: function() {
                 $('#info').html('<p>An error has occurred</p>');
                 alert("No data meets qualifications");
              },
              dataType: 'json',
              success: function(d) {
                console.log(d);
                //console.log(data);

                d3.select("#table_loc table").remove();
                d3.selectAll(".xaxis_opt").remove();
                d3.selectAll(".yaxis_opt").remove();
                var table = new mappings();
                var keysforbargraph = table.table_mapping(d.result);

              },
              type: 'GET'
           });

          });

          $("#accordion").draggable().resizable({
              alsoResize: "#table_loc"
          });
          $("#table_loc").resizable();


          // Gets table from mappings.js with data as parameter
          // Works w/ two dimensional data
          var data = this.model.get("datasets").result;
        },

        api_options_toggle: function() {
          /*$("#dropdowns").click(function(){
            console.log("w");
            $("#redlist_opt").slideToggle("slow");
          });*/

          var getPrev = [];
          $('#api').on('change', function() {
              value = $(this).val();
              console.log(value);
              change(value);
          });
          var change = function(val) {
            //console.log(val);
              getPrev.push(val);
              if (getPrev.length > 2) {
                  getPrev.shift();
              }
              console.log(getPrev);

              $("#" + getPrev[0]+"_opt").slideUp(300);
              $("#" + val+"_opt").delay(300).slideDown(300);
          }
        }

      });

      return view;

    });
