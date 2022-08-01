
// var countrylist =  [...new Set(fifar.map(d => d.country_full))].sort()

// Reference: https://vega.github.io/vega-lite/usage/embed.html
// Reference aggregations: https://vega.github.io/vega-lite/docs/aggregate.html


function initdropmenu(){

    console.log("INITIALIZING DROPDOWN MENU")
  
    var tdatalist = d3.select("#select1");

    tdatalist.html("");
    tdlist.forEach(function(c){
        row1 = tdatalist.append('option').text(c);})
    // tdatalist.value = year
    selectElement1 = document.querySelector('#select1');
    selectElement1.options[selectElement1.selectedIndex].value = year

    
    var select2 = d3.select("#select2");

    select2.html("");
    metriclist.forEach(function(c){
    row1 = select2.append('option').text(c);})
    select2.value = metric

    var select3 = d3.select("#select3");

    select3.html("");
    metriclist.forEach(function(c){
    row1 = select3.append('option').text(c);})
    select3.value = metric1

  };

// PRESENT CONFEDERATION PERFORMANCE FOR A GIVEN YEAR AND METRIC
  function confgraph(chartid, year, metric, datawc){

    console.log("IN CONF PER FOR GIVEN YEAR AND METRIC")
    console.log(year)
    console.log(datawc)

    // chartid = '#chart'; datawc= wcdata
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Average "+metric+" per Confederation - "+year,
        data: {values: datawc},  
        transform: [{filter: "datum.Year == "+year}],
        // width: 400,
        mark: 'bar',
        encoding: {
          x: {field: 'confederation',  type: 'ordinal',sort: "-y", title: "Confederation" },
          y: {field: metric, aggregate: 'mean', type: 'quantitative', sort: "ascending"},
          tooltip: [{field: metric, aggregate: 'mean', type: 'quantitative'},
                    {field: 'confederation', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

    vegaEmbed(chartid, spec)
    
  };


// PRESENT CONFEDERATION PERFORMANCE ON FOUR METRICS FOR A GIVEN YEAR
  function confgraph_concat(chartid, year, datawc){

    var widthg = 150
    // chartid = '#chart'; datawc= wcdata
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        
        data: {values: datawc},
        transform: [{filter: "datum.Year == "+year}],
        hconcat: [{
                        title: "Average Points - "+year,
                        width: widthg,
                        mark: 'bar',
                        encoding: {
                        x: {field: 'confederation',  type: 'ordinal',sort: "-y", title: "Confederation"},
                        y: {field: "Points", aggregate: 'mean', type: 'quantitative', sort: "ascending"},
                        tooltip: [{field: "Points", aggregate: 'mean', type: 'quantitative'},
                                    {field: 'confederation', type: 'ordinal'}],
                        color:  {field: 'confederation', type: 'nominal'}
                        }},
                   {                    
                        title: "Average GOALS FOR - "+year,
                        width: widthg,
                        mark: 'bar',
                        encoding: {
                        x: {field: 'confederation',  type: 'ordinal',sort: "-y", title: "Confederation" },
                        y: {field: "Goals For", aggregate: 'mean', type: 'quantitative', sort: "ascending"},
                        tooltip: [{field: "Goals For", aggregate: 'mean', type: 'quantitative'},
                                    {field: 'confederation', type: 'ordinal'}],
                        color:  {field: 'confederation', type: 'nominal'}
                        }},

                    {
                        title: "Average GOALS AGAINST - "+year,
                        width: widthg,
                        mark: 'bar',
                        encoding: {
                        x: {field: 'confederation',  type: 'ordinal',sort: "-y", title: "Confederation" },
                        y: {field: "Goals Against", aggregate: 'mean', type: 'quantitative', sort: "ascending"},
                        tooltip: [{field: "Goals Against", aggregate: 'mean', type: 'quantitative'},
                                    {field: 'confederation', type: 'ordinal'}],
                        color:  {field: 'confederation', type: 'nominal'}
                        }},
                    {
                        title: "Average WINS - "+year,
                        width: widthg,
                        mark: 'bar',
                        encoding: {
                        x: {field: 'confederation',  type: 'ordinal',sort: "-y", title: "Confederation" },
                        y: {field: "Win", aggregate: 'mean', type: 'quantitative', sort: "ascending"},
                        tooltip: [{field: "Win", aggregate: 'mean', type: 'quantitative'},
                                    {field: 'confederation', type: 'ordinal'}],
                        color:  {field: 'confederation', type: 'nominal'}
                        }},

                ]
      };

    vegaEmbed(chartid, spec)
    
  };

//   PRESENT GRAPH WITH THE COUNTRIES THAT HAVE WON THE WOLRD CUP
  function countrywinning(chartid){

    // chartid = '#chart'; datawc= wcdata
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Number fo World Cups Won by Country ",
        data: {values: wcwinners},
        // width: 400,
        mark: 'bar',
        encoding: {
          x: {field: 'country',  type: 'ordinal',sort: "-y", title: "Country" },
          y: {field: 'won', type: 'quantitative', sort: "ascending"},
          tooltip: [{field: 'won', type: 'quantitative'},
                    {field: 'country', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

    vegaEmbed(chartid, spec)
    
  };
  
// PRESENT OVERALL PERFORMANCE FOR CONFEDERATIONS FOR A GIVEN METRIC
  function confgraphoverall(chartid, metric, datawc){

    // chartid = '#chart'; datawc= wcdata
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Average "+metric+" per Confederation from 1930 to 2018",
        data: {values: datawc},
        // width: 400,
        mark: 'bar',
        encoding: {
          x: {field: 'confederation',  type: 'ordinal',sort: "-y", title: "Confederation" },
          y: {field: metric, aggregate: 'mean', type: 'quantitative', sort: "ascending"},
          tooltip: [{field: metric, aggregate: 'mean', type: 'quantitative'},
                    {field: 'confederation', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

    vegaEmbed(chartid, spec)
    
  };


  function teamgraph(chartid, year, metric, datawc){

    // chartid = '#chart'; datawc= wcdata
    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Average "+metric+" by Team - "+year,
        data: {values: datawc},
        transform: [{filter: "datum.Year == "+year}],
        width: 400,
        mark: 'bar',
        encoding: {
          x: {field: 'Team',  type: 'ordinal', sort: "-y" },
          y: {field: metric, type: 'quantitative'},
          tooltip: [{field: metric, type: 'quantitative'},
                    {field: 'Team', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

      vegaEmbed(chartid, spec);
    
  };


function updatetext() {

    countrywc = wclist[year]
    countywon = wcwon[year]

    countrywc2 = wclist[yearY1]
    countywon2 = wcwinners[yearY1]

    var text1 = "World cup of "+year+"  took place in <b><span style='color: darkblue'>"+countrywc+"</span></b>, and it was won by <b><span style='color: darkblue'>"+countywon+"</span></b>!";
    // var text1 = "World cup of "+year+"  took place in "+countrywc+", and it was won by "+countywon+"!";
    var element = document.getElementById("id01");
    element.innerHTML = text1;

}

initdropmenu()
updatetext()
confgraphoverall('#chart0', metric1, wcdata)
countrywinning('#chart01')
confgraph('#chart1', year, metric, wcdata)     // chartid = '#chart'; datawc= wcdata
teamgraph('#chart2', year, metric, wcdata)
confgraph_concat('#chart1f', year, wcdata)



// Wait of Click on button action
d3.select("#select1").on("change", function() {

  var year = d3.select(this).property("value")
  console.log(year);

  countrywc = wclist[year]
  countywon = wcwon[year]

  var text1 = "World cup of "+year+"  took place in <b><span style='color: darkblue'>"+countrywc+"</span></b>, and it was won by <b><span style='color: darkblue'>"+countywon+"</span></b>!";
  const element = document.getElementById("id01");
  element.innerHTML = text1;

  confgraph('#chart1', year, metric, wcdata)     // chartid = '#chart'; datawc= wcdata
  teamgraph('#chart2', year, metric, wcdata)
  confgraph_concat('#chart1f', year, wcdata)
 
});

// Wait of Click on button action
d3.select("#select2").on("change", function() {

  metric = d3.select(this).property("value")
  console.log("In SELECT2: ",metric);

  countrywc = wclist[year]
  countywon = wcwon[year]

  var text1 = "World cup of "+year+"  took place in <b><span style='color: darkblue'>"+countrywc+"</span></b>, and it was won by <b><span style='color: darkblue'>"+countywon+"</span></b>!";
  const element = document.getElementById("id01");
  element.innerHTML = text1;

  confgraph('#chart1', year, metric, wcdata)     // chartid = '#chart'; datawc= wcdata
  teamgraph('#chart2', year, metric, wcdata)
  confgraph_concat('#chart1f', year, wcdata)
  
});


// Wait of Click on button action
d3.select("#select3").on("change", function() {

    var metric = d3.select(this).property("value")
    console.log(metric);

    confgraphoverall('#chart0', metric, wcdata)

});




