define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/graph',
    'js/views/mappings'

], function($, $ui, d3, backbone, Model, mappings) {

    var view = backbone.View.extend({

        initialize: function(){
          console.log("response");
          this.draw_table();
          this.api_options_toggle();
          //this.

        },

        draw_table: function(){

          function appendOption(selected,tLength,topics)
          {
              for(i = selected.options.length - 1 ; i >= 0 ; i--)
              {
                  selected.remove(i);
              }
              for(var ii=0;ii<tLength;ii++)
              {
                  var opt=topics[ii].name;
                  var code=topics[ii].code;
                  var option=document.createElement("option");
                  option.textContent=opt;
                  option.value=code;
                  selected.appendChild(option);
              }
          }

          //onchange="subTopicDisplay();"
          //$("#topic").onchange = subTopicDisplay();

          function Topic(name, code){
              this.name=name;
              this.code=code;
          }


          var popSex=new Topic("Population by Sex","B01001");
          var femalePop=new Topic("Female Population","_026E");
          var malePop=new Topic("Male Population","_002E");
          var totalPop=new Topic("Total Population","_001E");
          var allPop=new Topic("All Subtopics","B01001_026E,B01001_002E,B01001_001E")

          var citizenship=new Topic("Nativity and Citizenship in the US","B05001");
          var bornAbroad=new Topic("US Citizen-Born Abroad","_004E");
          var bornUSIsland=new Topic("US Citizen-Born in Island Territories","_003E");
          var notCitizen=new Topic("Not a Citizen","_006E");
          var naturalized=new Topic("Naturalized Citizen","_005E");
          var bornInUS=new Topic("US Citizen-Born in US","_002E");
          var totalCit=new Topic("Total Population","_001E");
          var allCit=new Topic("All Subtopics","B05001_004E,B05001_003E,B05001_006E,B05001_005E,B05001_002E,B05001_001E")

          var workSex=new Topic("Occupation by Sex","C24010");
          var menInCSE=new Topic("Men in CS and Engineering","_007E");
          var womenInCSE=new Topic("Women in CS and Engineering","043E");
          var menWork=new Topic("Men in the Workforce","_002E");
          var womenWork=new Topic("Women in the Workforce","_038E");
          var totalWork=new Topic("Total Workforce","_001E");
          var allWork=new Topic("All Subtopics","C24010_007E,C24010_043E,C24010_002E,C24010_038E,C24010_001E" )

          var topics=[popSex,citizenship,workSex];
          var selected=document.getElementById("topic");
          var tLength=topics.length;

          appendOption(selected,tLength,topics);

          subTopicDisplay();
          $("#topic").on('change', function(){
            subTopicDisplay();
          });
          
          function subTopicDisplay()
          {
              var subTopics=[];
              var selected=document.getElementById("topic");
              var sel=document.getElementById("subtopic");
              var text=selected.options[selected.selectedIndex].textContent;
              //document.write(text);
              if(text==topics[0].name)
                  subTopics=[allPop,femalePop,malePop];
              if(text==topics[1].name)
                  subTopics=[allCit,bornAbroad,bornUSIsland,bornInUS,naturalized,notCitizen];
              if(text==topics[2].name)
                  subTopics=[allWork,menInCSE,womenInCSE,menWork,womenWork];
              length=subTopics.length;
              appendOption(sel, length, subTopics);
          }

          function State(name, fips,short)
          {
              this.name=name;
              this.fips=fips;
              this.short=short;
          }

                  var AL=new State("Alabama","01","AL");
                  var AK=new State("Alaska","02","AK");
                  var AZ=new State("Arizona","04","AZ");
                  var AR=new State("Arkansas","05","AR");
                  var CA=new State("California","06","CA");
                  var CO=new State("Colorado","08","CO");
                  var CT=new State("Connecticut","09","CT");
                  var DE=new State("Delaware","10","DE");
                  var FL=new State("Florida","12","FL");
                  var GA=new State("Georgia","13","GA");
                  var HI=new State("Hawaii","15","HI");
                  var ID=new State("Idaho","16","ID");
                  var IL=new State("Illinois","17","IL");
                  var IN=new State("Indiana","18","IN");
                  var IA=new State("Iowa","19","IA");
                  var KS=new State("Kansas","20","KS");
                  var KY=new State("Kentucky","21","KY");
                  var LA=new State("Louisiana","22","LA");
                  var ME=new State("Maine","23","ME");
                  var MD=new State("Maryland","24","MD");
                  var MA=new State("Massachusetts","25","MA");
                  var MI=new State("Michigan","26","MI");
                  var MN=new State("Minnesota","27","MN");
                  var MS=new State("Mississippi","28","MS");
                  var MO=new State("Missouri","29","MO");
                  var MT=new State("Montana","30","MT");
                  var NE=new State("Nebraska","31","NE");
                  var NV=new State("Nevada","32","NV");
                  var NH=new State("New Hampshire","33","NH");
                  var NJ=new State("New Jersey","34","NJ");
                  var NM=new State("New Mexico","35","NM");
                  var NY=new State("New York","36","NY");
                  var NC=new State("North Carolina","37","NC");
                  var ND=new State("North Dakota","38","ND");
                  var OH=new State("Ohio","39","OH");
                  var OK=new State("Oklahoma","40","OK");
                  var OR=new State("Oregon","41","OR");
                  var PA=new State("Pensalvania","42","PA");
                  var RI=new State("Rhode Island","44","RI");
                  var SC=new State("South Carolina","45","SC");
                  var SD=new State("South Dakota","46","SD");
                  var TN=new State("Tennesee","47","TN");
                  var TX=new State("Texas","48","TX");
                  var UT=new State("Utah","49","UT");
                  var VT=new State("Vermont","50","VT");
                  var VA=new State("Virginia","51","VA");
                  var WA=new State("Washington","53","WA");
                  var WV=new State("West Virginia","54","WV");
                  var WI=new State("Wisconsin","55","WI");
                  var WY=new State("Wyoming","56","WY");

          var states=[AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,
                      KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,
                      ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY];

          var sel=document.getElementById("state");
          var length=states.length;
                  for(var ii=0;ii<length;ii++)
                  {
                      var opt=states[ii].name;
                      var short=states[ii].fips;
                      var option=document.createElement("option");
                      option.textContent=opt;
                      option.value=short;
                      sel.appendChild(option);
                  }
          $(function generateGETURL()
          {
               jQuery.support.cors = true;
               $(".create").click(function(){
                 var key="7313e4d2e33dd0757b87e83ebdb702767bde8edc";

                 var yearBar=document.getElementById("year");
                 var topicBar=document.getElementById("topic");
                 var subTopicBar=document.getElementById("subtopic");
                 var stateBar=document.getElementById("state");

                 var year=yearBar.options[yearBar.selectedIndex].value;
                 var topicCode=topicBar.options[topicBar.selectedIndex].value;
                 var subTopicCode=subTopicBar.options[subTopicBar.selectedIndex].value;
                 var subTopicName=subTopicBar.options[subTopicBar.selectedIndex].textContent;
                 var state=stateBar.options[stateBar.selectedIndex].value;

                 var url="";

                 if(state=="none")
                 {
                    if(subTopicName=="All Subtopics")
                    {
                        url="http://api.census.gov/data/"+year+"/acs5/?get="+subTopicCode+",NAME&for=us:1&key="+key;
                    }
                    //so basically just mess with this part....
                    else
                    {
                        var s="";
                        for(var ii=1;ii<states.length;ii++)
                        {
                             s+=(","+states[ii].fips);
                        }
                        url="http://api.census.gov/data/"+year+"/acs5/?get="+topicCode+subTopicCode+",NAME&for=state:01"+s+"&key="+key;
                    }
                 }
                 else
                 {
                    if(subTopicName=="All Subtopics")
                    {
                        url="http://api.census.gov/data/"+year+"/acs5/?get="+subTopicCode+",NAME&for=state:"+state+"&key="+key;
                    }
                    else
                    {
                        url="http://api.census.gov/data/"+year+"/acs5/?get="+topicCode+subTopicCode+",NAME&for=state:"+state+"&key="+key;
                    }
                 }
                 $.ajax({
                    type:'GET',
                    url:url,
                    success:function(data)
                    {

                      var keynames = data[0];

                      var keyarr = [];
                      for(var k = 1; k < data.length; k++) {
                        var obj = {};
                        for (var n = 0; n < keynames.length; n++) {
                          obj[keynames[n]] = data[k][n];
                        }

                        keyarr.push(obj);

                      }
                      console.log(keyarr);

                      d3.select("#table_loc table").remove();

                      var table = new mappings();
                      return table.table_mapping(keyarr);


                    }
                })
           })
          })
          /*$( "#city" ).autocomplete({
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

          });*/

          $(".create").click(function(){
            /*var scientificName = $("#city").val().replace(" ","%20");
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
           });*/

         });

          $("#accordion").draggable().resizable({
              alsoResize: "#table_loc"
          });
          $("#table_loc").resizable();


          // Gets table from mappings.js with data as parameter
          // Works w/ two dimensional data
          //var data = this.model.get("datasets").result;
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
