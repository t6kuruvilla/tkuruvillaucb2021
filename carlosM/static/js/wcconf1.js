
// var countrylist =  [...new Set(fifar.map(d => d.country_full))].sort()

// Reference: https://vega.github.io/vega-lite/usage/embed.html
// Reference aggregations: https://vega.github.io/vega-lite/docs/aggregate.html

console.log(metric)

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
  function wcconfgraph(chartid, metric, datawc){

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
  function wcconfgraph_selected(chartid, metric, datawc, confname){

   
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
wcconfgraph('#chart3', metric, wcdata)
wcconfgraph_selected('#chart3a', metric, wcdata, confname)


d3.select("#select5").on("change", function() {

  metric = d3.select(this).property("value")
  console.log("IN selection: ", metric)

  wcconfgraph('#chart3', metric, wcdata)
  wcconfgraph_selected('#chart3a', metric, wcdata, confname)

}); 


d3.select("#select6").on("change", function() {

  confname = d3.select(this).property("value")

  wcconfgraph_selected('#chart3a', metric, wcdata, confname)

});