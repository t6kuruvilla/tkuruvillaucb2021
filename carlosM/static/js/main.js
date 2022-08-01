/* global d3, scrollama */

var metric = "Points"

const width = 400,
    height = 400,
    margin = ({ top: 5, right: 5, bottom: 5, left: 5 }),
    side = 30;

console.log("I AM IN MAIN");
// console.log(wcdata)


function initdropmenu(){

    console.log("INITIALIZING DROPDOWN MENU")

    var metriclist = ["Points", "Position", "Goals For", "Goals Against", "Win", "Draw", "Loss", "Games Played"];

  
    var select1 = d3.select("#select1");

    select1.html("");
    metriclist.forEach(function(c){
        row1 = select1.append('option').text(c);})
    

  };


// Graph using HCAT
function conf_country_concat(chartid, year, metric, datawc){

  var widthg = 150

  console.log("IN CONCAT : ", metric)

  var spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      
      data: {values: datawc},
      transform: [{filter: "datum.Year == "+year}],
     
      hconcat: [{
                title: "Average "+metric+" per Confederation - "+year,
                mark: 'bar',
                width: widthg,
                encoding: {
                  x: {field: 'confederation',  type: 'ordinal',sort: "-y" },
                  y: {field: metric, aggregate: 'mean', type: 'quantitative', sort: "ascending"},
                  tooltip: [{field: metric, aggregate: 'mean', type: 'quantitative'},
                            {field: 'confederation', type: 'ordinal'}],
                  color:  {field: 'confederation', type: 'nominal'}
                }},
              {title: metric+" per Country - "+year,
              mark: 'bar',
              width: 400,
              encoding: {
                x: {field: 'Team',  type: 'ordinal',sort: "-y" },
                y: {field: metric, aggregate: 'mean', type: 'quantitative', sort: "ascending"},
                tooltip: [{field: metric, aggregate: 'mean', type: 'quantitative'},
                          {field: 'Team', type: 'ordinal'}],
                color:  {field: 'confederation', type: 'nominal'}
              }
            }
      ]};
      vegaEmbed(chartid, spec)
    }

// setup resize event
initdropmenu()
conf_country_concat('#chart', 1930, metric, wcdata)

const steps = d3.selectAll(".step")

// instantiate the scrollama
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
    .setup({
        step: ".step",
    })
    .onStepEnter((response) => {

      console.log("IN SCROLLER: ", metric)

        if (response.index == 1){
            conf_country_concat('#chart', 1930, metric, wcdata)
        } else if  (response.index == 2) {
            conf_country_concat('#chart', 1934, metric, wcdata)
        } else if  (response.index == 3) {
            conf_country_concat('#chart', 1938, metric, wcdata)
        } else {
            var dif1 = response.index - 4
            var year = 1950 + (dif1*4)
            conf_country_concat('#chart', year, metric, wcdata)
        } 

        steps.style("opacity", 0.1)
        d3.select(response.element).style("opacity", 1.0)

        console.log("enter", response)
        console.log("enter", response.index)
    

    })
    .onStepExit((response) => {
        // { element, index, direction }
        console.log("exit", response)
    });


// Wait of Click on button action
d3.select("#select1").on("change", function() {

  metric = d3.select(this).property("value")
  console.log("In Drop down: ", metric)

  conf_country_concat('#chart', 1930, metric, wcdata)

});


// window.addEventListener("resize", scroller.resize);
