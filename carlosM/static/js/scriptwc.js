
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
    countywon = wcwinners[year]

    countrywc2 = wclist[yearY1]
    countywon2 = wcwinners[yearY1]

    var text1 = "World cup of "+year+"  took place in "+countrywc+", and it was won by "+countywon+"!";
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

// Select the button for DATA3
var dropbutton3= d3.select("#select3");

// Wait of Click on button action
dropbutton3.on("click", function() {

    selectElement = document.querySelector('#select3');
    metric1 = selectElement.options[selectElement.selectedIndex].value;
    console.log(metric1);

    // confgraph('#chart1', year, wcdata)     // chartid = '#chart'; datawc= wcdata
    // teamgraph('#chart2', year, wcdata)
    // wcconfgraph('#chart3', year, datawc)
});


// Select the button for DATA3
var dropbutton1= d3.select("#select1");

// Wait of Click on button action
dropbutton1.on("click", function() {

    selectElement = document.querySelector('#select1');
    year = selectElement.options[selectElement.selectedIndex].value;
    console.log(year);

    // confgraph('#chart1', year, wcdata)     // chartid = '#chart'; datawc= wcdata
    // teamgraph('#chart2', year, wcdata)
    // wcconfgraph('#chart3', year, datawc)
});



var dropbutton2= d3.select("#select2");

// Wait of Click on button action
dropbutton2.on("click", function() {

    selectElement = document.querySelector('#select2');
    metric = selectElement.options[selectElement.selectedIndex].value;
    console.log(metric);

    // confgraph('#chart1', year, wcdata)     // chartid = '#chart'; datawc= wcdata
    // teamgraph('#chart2', year, wcdata)
    // wcconfgraph('#chart3', year, datawc)
});


var dropbutton3= d3.select("#select3");

// Wait of Click on button action
dropbutton3.on("click", function() {

    selectElement = document.querySelector('#select3');
    country = selectElement.options[selectElement.selectedIndex].value;
    console.log(country);

    // confgraph('#chart1', year, wcdata)     // chartid = '#chart'; datawc= wcdata
    // teamgraph('#chart2', year, wcdata)
    // wcconfgraph('#chart3', year, datawc)
});


// Select the button
var button1 = d3.select("#Buton1");    

button1.on("click", function() {

    console.log("IN BUTTON 1")
    
    selectElement = document.querySelector('#select1');
    year = selectElement.options[selectElement.selectedIndex].value;
    console.log(year);

    selectElement2 = document.querySelector('#select2');
    metric = selectElement2.options[selectElement2.selectedIndex].value;
    console.log(metric);

    countrywc = wclist[year]
    countywon = wcwinners[year]

    var text1 = "World cup of "+year+"  took place in "+countrywc+", and it was won by "+countywon+"!";
    const element = document.getElementById("id01");
    element.innerHTML = text1;

    confgraph('#chart1', year, metric, wcdata)     // chartid = '#chart'; datawc= wcdata
    teamgraph('#chart2', year, metric, wcdata)
    confgraph_concat('#chart1f', year, wcdata)

});


// Select the button
var button2 = d3.select("#Buton2");    

button2.on("click", function() {

    console.log("IN BUTTON 2")

    selectElement2 = document.querySelector('#select3');
    metric1 = selectElement2.options[selectElement2.selectedIndex].value;
    console.log(metric1);

    confgraphoverall('#chart0', metric1, wcdata)

});


var buttonY1 = d3.select("#ButonY1");    

buttonY1.on("click", function() {

    console.log("IN BUTTON Y1")

    selectElement2 = document.querySelector('#selectY1');
    yearY1 = selectElement2.options[selectElement2.selectedIndex].value;
    console.log(yearY1);

    updatetext()
    confgraph_concat('#chart1f', yearY1, wcdata)

});


