/* global d3, scrollama */

metric = "Points"

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
    // tdatalist.value = year
    selectElement1 = document.querySelector('#select1');
    selectElement1.options[selectElement1.selectedIndex].value = metric
    

  };




// GRAPH FOR PROGRESSION PERFORMANCE OF CONFEDERATIONS
function wcconfgraph(chartid, metric, datawc){

    // chartid = '#chart'; datawc= wcdata
    console.log("In WCCONFGRAPH")
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Average "+metric+" by Confederation Across All Worldcups",
        data: {values: datawc},

        width: 700,
        height: 250,
        mark: 'bar',
        encoding: {
          x: {field: 'Year',  type: 'ordinal'},
          y: {field: metric, aggregate: 'mean', type: 'quantitative'},
          tooltip: [{field: metric, aggregate: 'mean', type: 'quantitative'},
                    {field: 'confederation', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

    vegaEmbed(chartid, spec)
    
  };

// Graph using HCAT
function conf_country_concat(chartid, year, metric, datawc){

  var widthg = 150
  // chartid = '#chart'; datawc= wcdata

  console.log("IN NEW GRAPH ************")
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
                y: {field: "Points", aggregate: 'mean', type: 'quantitative', sort: "ascending"},
                tooltip: [{field: "Points", aggregate: 'mean', type: 'quantitative'},
                          {field: 'Team', type: 'ordinal'}],
                color:  {field: 'confederation', type: 'nominal'}
              }
            }
      ]};
      vegaEmbed(chartid, spec)
    }



// PRESENT CONFEDERATION PERFORMANCE FOR A GIVEN YEAR AND METRIC
function confgraph(chartid, year, metric, datawc){

    // chartid = '#chart'; datawc= wcdata
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Average "+metric+" per Confederation - "+year,
        data: {values: datawc},
        transform: [{filter: "datum.Year == "+year}],
        // width: 100,
        mark: 'bar',
        encoding: {
          x: {field: 'confederation',  type: 'ordinal',sort: "-y" },
          y: {field: metric, aggregate: 'mean', type: 'quantitative', sort: "ascending"},
          tooltip: [{field: metric, aggregate: 'mean', type: 'quantitative'},
                    {field: 'confederation', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

    vegaEmbed(chartid, spec)
    
  };

// PRESENT CONFEDERATION PERFORMANCE FOR A GIVEN YEAR AND METRIC
function countrygraph(chartid, year, metric, datawc){

    // chartid = '#chart'; datawc= wcdata
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: metric+" per Country - "+year,
        data: {values: datawc},
        transform: [{filter: "datum.Year == "+year}],
        width: 300,
        mark: 'bar',
        encoding: {
          x: {field: 'Team',  type: 'ordinal',sort: "-y" },
          y: {field: "Points", aggregate: 'mean', type: 'quantitative', sort: "ascending"},
          tooltip: [{field: "Points", aggregate: 'mean', type: 'quantitative'},
                    {field: 'Team', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

    vegaEmbed(chartid, spec)
    
  };


//window.addEventListener("scroll", function (e) {
//    console.log(window.scrollY)
//})

// confgraph('#chart1', 1930, wcdata)


const steps = d3.selectAll(".step")

// instantiate the scrollama
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
    .setup({
        step: ".step",
    })
    .onStepEnter((response) => {
        // { element, index, direction }
        // callbacks[response.index]()

        if (response.index == 1){
            // confgraph('#chart', 1930, metric, wcdata)
            // countrygraph('#chart1', 1930, metric, wcdata)
            conf_country_concat('#chart', 1930, metric, wcdata)
        } else if  (response.index == 2) {
            // confgraph('#chart', 1934, metric, wcdata)
            // countrygraph('#chart1', 1934, metric, wcdata)
            conf_country_concat('#chart', 1934, metric, wcdata)
        } else if  (response.index == 3) {
            // confgraph('#chart', 1938, metric, wcdata)
            // countrygraph('#chart1', 1938, metric, wcdata)
            conf_country_concat('#chart', 1938, metric, wcdata)
        } else {
            var dif1 = response.index - 4
            var year = 1950 + (dif1*4)
            // confgraph('#chart', year, metric, wcdata)
            // countrygraph('#chart1', year, metric, wcdata)
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

// setup resize event
initdropmenu()
// confgraph('#chart', 1930, metric, wcdata)
// countrygraph('#chart1', 1930, metric, wcdata)
conf_country_concat('#chart', 1930, metric, wcdata)
wcconfgraph('#chart2', metric, wcdata)

// Select the button for DATA3
var dropbutton1= d3.select("#select1");

// Wait of Click on button action
dropbutton1.on("click", function() {

    selectElement = document.querySelector('#select1');
    metric = selectElement.options[selectElement.selectedIndex].value;
    console.log(metric1);

    // confgraph('#chart1', year, wcdata)     // chartid = '#chart'; datawc= wcdata
    // teamgraph('#chart2', year, wcdata)
    // wcconfgraph('#chart3', year, datawc)
});

var button1 = d3.select("#Buton1");    

button1.on("click", function() {

    console.log("IN BUTTON 1")

    selectElement1 = document.querySelector('#select1');
    metric = selectElement1.options[selectElement1.selectedIndex].value;
    console.log(metric);

    // confgraph('#chart', 1930, metric, wcdata)
    // countrygraph('#chart1', 1930, metric, wcdata)
    conf_country_concat('#chart', 1930, metric, wcdata)
    wcconfgraph('#chart2', metric, wcdata)

});

window.addEventListener("resize", scroller.resize);
// wcconfgraph('#chart2', metric, wcdata)