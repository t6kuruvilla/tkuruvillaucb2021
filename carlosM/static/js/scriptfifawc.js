
// Reference: https://vega.github.io/vega-lite/usage/embed.html
// Reference aggregations: https://vega.github.io/vega-lite/docs/aggregate.html


function initdropmenu(){
  
    // DROP DOWN MENU TO SELECT COUNTRY FOR FIFA RANKING AND WC PERFORMANCE
    var select4 = d3.select("#select4");

    select4.html("");
    countrylist.forEach(function(c){
    row1 = select4.append('option').text(c);})
    select4.value = country

  };


//   GRAPH FOR FIFA RANKING AND WC PERFORMANCE FOR A GIVEN COUNTRY

  function fifarank(chartid, country, datafifa, wcdata){

    // chartid = '#chart'; datawc= wcdata

    console.log("IN FIFARANK *****************")

    fifacountries = d3.group(datafifa, d => d.country_full)


    if (country == 'South Korea') {
        fcountry = fifacountries.get(fifakorea)
      } else {
        fcountry = fifacountries.get(country)
      }

      wcyear = d3.group(wcdata, d => d.Team)

      if (country == 'USA') {
        wccountry = wcyear.get(wcusaname)
      } else {
        wccountry = wcyear.get(country)
      }
      
      console.log(wcyear)

      var spec3 = {

        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "FIFA Ranking vs. World Cup Position for "+country, 
        layer: [{
            data: {values: fcountry},
            width: 700,
            height: 250,
            mark: {type: 'line', point: true, fill: "white"},
            encoding: {
            x: {field: 'rank_date', type: 'temporal', title: "Year"},
            y: {field: 'rank', type: 'quantitative', title: "Rank/Position"},
            tooltip: [{field: 'rank', type: 'quantitative'}]
            }
        },
        {
            data: {values: wccountry},
            transform: [{filter: "datum.Year > 1993"}],
            width: 700,
            height: 250,
            mark: {type: 'point', color: 'red'},
            // color: 'red',
            encoding: {
            x: {field: 'DateD', type: 'temporal', title: "Year"},
            y: {field: 'Position', type: 'quantitative', title: "Rank/Position"},
            tooltip: [{field: 'Position', type: 'quantitative'},
                      {field: 'Year', type: 'quantitative'}
                      ]
            }
            
        }
    ]
      }

      vegaEmbed(chartid, spec3);
    
  };

function rank1fifa(chartid, datafifa) {

    var rankfifa = d3.group(datafifa, d => d.rank)

    var firstr = rankfifa.get(1)
    
    console.log(firstr)

    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "Top Countries at NUNMBER One FIFA Rank Position (1993-2018)",
        data: {values: firstr},
        mark: 'bar',
        encoding: {
          x: {field: 'country_full',  type: 'ordinal',sort: "-y", title: "Country" },
          y: {field: 'rank', aggregate: 'sum', type: 'quantitative', title: "Sum of 1st Place FIFA Rank"},
          tooltip: [{field: 'rank', aggregate: 'sum', type: 'quantitative'},
                    {field: 'country_full', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

    vegaEmbed(chartid, spec)

}

function wc1fifa(chartid, wcdata) {

    var wcrank = d3.group(wcdata, d => d.Position)

    var firstwc = wcrank.get(1,2)
    
    console.log(firstwc)

    var spec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        title: "World Cup Wins (1994-2018)",
        data: {values: firstwc},
        transform: [{filter: "datum.Year > 1993"}],
        mark: 'bar',
        encoding: {
          x: {field: 'Team',  type: 'ordinal',sort: "-y", title:"Country" },
          y: {field: 'Position', aggregate: 'sum', type: 'quantitative', title: "Number of WC Wins"},
          tooltip: [{field: 'Position', aggregate: 'sum', type: 'quantitative'},
                    {field: 'Team', type: 'ordinal'}],
          color:  {field: 'confederation', type: 'nominal'}
        }
      };

    vegaEmbed(chartid, spec)

}


// INITIALIZE MENUS AND GRAPH

initdropmenu()

fifarank('#chart4', country, fifar, wcdata)

rank1fifa('#chart4a', fifar)

wc1fifa('#chart4b', wcdata) 



// Wait of Click on button action
d3.select("#select4").on("change", function() {

  var country = d3.select(this).property("value")
  console.log(metric);

  fifarank('#chart4', country, fifar, wcdata)

});


// Select the button

// ACTION BUTTON FOR UPDATING FIFA RANKING AND WC PERFORMANCE GRAPH
var button4 = d3.select("#Buton4");    

button4.on("click", function() {

    console.log("IN BUTTON 4")

    selectElement2 = document.querySelector('#select4');
    country = selectElement2.options[selectElement2.selectedIndex].value;
    console.log(country);

    fifarank('#chart4', country, fifar, wcdata)

});

