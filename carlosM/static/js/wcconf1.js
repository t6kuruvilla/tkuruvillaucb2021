
// var countrylist =  [...new Set(fifar.map(d => d.country_full))].sort()

// Reference: https://vega.github.io/vega-lite/usage/embed.html
// Reference aggregations: https://vega.github.io/vega-lite/docs/aggregate.html


function initdropmenu(){

    var select5 = d3.select("#select5");

    select5.html("");
    metriclist.forEach(function(c){
    row1 = select5.append('option').text(c);})
    select5.value = metric1

    var select6 = d3.select("#select6");

    select6.html("");
    conflist.forEach(function(c){
    row1 = select6.append('option').text(c);})
    select6.value = confname
  };

  
// GRAPH FOR PROGRESSION PERFORMANCE OF CONFEDERATIONS
  function wcconfgraph(chartid, year, metric, datawc){

    // chartid = '#chart'; datawc= wcdata
    console.log("In WCCONFGRAPH")
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Average "+metric+" by Confederation Across All Worldcups",
        data: {values: datawc},
        // width: 700,
        // height: 250,
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


  // GRAPH FOR PROGRESSION PERFORMANCE OF SELECTED CONFEDERATION CONFEDERATIONS
  function wcconfgraph_selected(chartid, year, metric, datawc, confname){

   
    // console.log(datawc)
    console.log("In WCCONFGRAPH SELECTED")

    var confdata = d3.group(datawc, d => d.confederation).get(confname)
    // console.log(confdata)

    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Average "+metric+" by Confederation Across All Worldcups",
        data: {values: confdata},
        mark: 'bar',
        encoding: {
          x: {field: 'Year',  type: 'ordinal'},
          y: {field: metric, aggregate: 'mean', type: 'quantitative'},
          tooltip: [{field: metric, aggregate: 'mean', type: 'quantitative'}],
        }
      };

    vegaEmbed(chartid, spec)
    console.log("OUT OF SELECTED")
    
  };

initdropmenu()
wcconfgraph('#chart3', year, metric2, wcdata)
wcconfgraph_selected('#chart3a', year, metric2, wcdata, confname)


var dropbutton5= d3.select("#select5");

// Wait of Click on button action
dropbutton5.on("click", function() {

    selectElement = document.querySelector('#select5');
    metric5 = selectElement.options[selectElement.selectedIndex].value;
    console.log(metric);

    // confgraph('#chart1', year, wcdata)     // chartid = '#chart'; datawc= wcdata
    // teamgraph('#chart2', year, wcdata)
    // wcconfgraph('#chart3', year, datawc)
});


var dropbutton6= d3.select("#select6");

// Wait of Click on button action
dropbutton6.on("click", function() {

    selectElement = document.querySelector('#select6');
    confname = selectElement.options[selectElement.selectedIndex].value;
    console.log(confname);

    // confgraph('#chart1', year, wcdata)     // chartid = '#chart'; datawc= wcdata
    // teamgraph('#chart2', year, wcdata)
    // wcconfgraph('#chart3', year, datawc)
});



var button5 = d3.select("#Buton5");    

button5.on("click", function() {

    console.log("IN BUTTON 5")

    selectElement2 = document.querySelector('#select5');
    metric2 = selectElement2.options[selectElement2.selectedIndex].value;
    console.log(country);

    wcconfgraph('#chart3', year, metric2, wcdata)

});

var button6 = d3.select("#Buton6");    

button6.on("click", function() {

    console.log("IN BUTTON 6")

    selectElement2 = document.querySelector('#select6');
    confname = selectElement2.options[selectElement2.selectedIndex].value;
    console.log(confname);

    wcconfgraph_selected('#chart3a', year, metric2, wcdata, confname)

});
