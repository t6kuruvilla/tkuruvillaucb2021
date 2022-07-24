
var datat = {}  //Data for district-product graph
var datap = {}  //Data for product graph by district
var datacou = {} //Data for product graph at country level
var datpr = []  //Table for district-product graph
var tabpr = []  //Table for product performance
var td = "TRx"
var data3t = {}  //Data for DATA3 graph and funcionts

var weeks1 = []
var weeks2 = []
var weeks3 = []

var datacountry = []  //Table for product performance at country level

var dmn = ""  //District name for district-product graph
var prn = ""  //Product for district-product graph
var prn1 = "" //Product for product performance
var n1 = 0
var dmD3 = ""

var d = 1

var par1 = td+","+d.toString()

function carray(N) {
  var a = [];
  for (var i = 0; i < N; i++) {
      a.push(i);
  }
  return a;
}

function tdata(){

  var tdlist = ["TRx", "Cards_crosstab", "Covered", "NRx"];

  var tdatalist = d3.select("#tdatacontrol1");
  tdatalist.html("");
  tdlist.forEach(function(c){
      row1 = tdatalist.append('option').text(c);})



  var nwlist = [1, 2, 4, 8, 12];

  var nwdata = d3.select("#nweeks");
  nwdata.html("");
  nwlist.forEach(function(c){
      row1 = nwdata.append('option').text(c);})

};

function initpage() {

  totaln = 0
  nn = 0
  dnn = 0
  lr = 0

  tdata();
  data1();
  data2();
  data3f();

};

function graphPRD(){

  var d3 = datap[prn1]

  //k4 = list of districts for the product
  var k4 = Object.keys(d3)
  // console.log("LIST OF DISTRICTS FOR GRAPH ########## :", k4)
  
  // var weeks = carray(52)

  var data = []
  tabpr = []

  var trace = {}

  var t1 = 0
  var t2 = 0

  for (index = 0; index < k4.length; index++) {

    disd = {}

    disd["District"] = k4[index];
    disd["Last Measurement"] = d3[k4[index]][51].toLocaleString();
    disd["Prev Measurement"] = d3[k4[index]][51-d].toLocaleString();
    var ch = ((d3[k4[index]][51]/d3[k4[index]][51-d])-1)*100;
    disd["Per Change"] = ch.toLocaleString();
    t1 += d3[k4[index]][51];
    t2 += d3[k4[index]][51-d];

    tabpr.push(disd);

    var trace = {
      type: "scatter",
      mode: "lines",
      name: k4[index],
      textposition: "bottom",
      x: weeks2,
      y: d3[k4[index]]
    };

    data.push(trace)

  };

    disd = {}
    disd["District"] = "Total Country";
    disd["Last Measurement"] = t1.toLocaleString();
    disd["Prev Measurement"] = t2.toLocaleString();
    ch = ((t1/t2)-1)*100
    disd["Per Change"] = ch.toLocaleString();

    tabpr.push(disd);

  var layout = {
    title: `${td} - ${d} Week(s) Average - Country Level: Product: ${prn1} - Up to Week: `+weeks2[weeks2.length-1],
    yaxis: {
      autorange: true,
      type: "linear"
    },
    showlegend: true
  };

  var TESTER = document.getElementById('tester1');
  Plotly.newPlot( TESTER, data, layout);

};

function graphDMPR(){

    var d2 = datat[dmn]

    var d3 = d2[prn]

    //k4 = list of territories for the product
    var k4 = Object.keys(d3)
    
    // var weeks = carray(52)

    var data = []
    datpr = []

    var trace = {}

    var t1 = 0
    var t2 = 0

    for (index = 0; index < k4.length; index++) {

      terd = {}
      console.log("NAME TERRITORYl ---->", k4[index])
      terd["Territory"] = k4[index];
      terd["Last Measurement"] = d3[k4[index]][51].toLocaleString();
      terd["Prev Measurement"] = d3[k4[index]][51-d].toLocaleString();
      var ch = ((d3[k4[index]][51]/d3[k4[index]][51-d])-1)*100
      terd["Per Change"] = ch.toLocaleString();
      t1 += d3[k4[index]][51]
      t2 += d3[k4[index]][51-d]

      datpr.push(terd);

      var trace = {
        type: "scatter",
        mode: "lines",
        name: k4[index],
        textposition: "bottom",
        x: weeks1,
        y: d3[k4[index]]
      };

      data.push(trace)
  
    };

      terd = {}  
      terd["Territory"] = "Total District";
      terd["Last Measurement"] = t1.toLocaleString();
      terd["Prev Measurement"] = t2.toLocaleString();
      ch = ((t1/t2)-1)*100
      terd["Per Change"] = ch.toLocaleString();
      datpr.push(terd)

    var layout = {
      title: `${td} - ${d} Week(s) Average - District Manager: ${dmn}. Product: ${prn}.  Up to Week: ${weeks1[weeks1.length-1]}`,
      yaxis: {
        autorange: true,
        type: "linear"
      },
      showlegend: true
    };

    TESTER = document.getElementById('tester');
    Plotly.newPlot( TESTER, data, layout);
};

function districtN(dml){
    // CREATE OPTIONS FOR SELECTION FORM WITH DISTRICT MANAGERS

    var tdml = d3.select("#dmcontrol");
    tdml.html("");
    // var row1 = tdml.append('option').text("All");
    dml.forEach(function(c){
        row1 = tdml.append('option').text(c);
    })

};

function productN(prdl, dropdown1){
  // CREATE OPTIONS FOR SELECTION FORM WITH DISTRICT MANAGERS

  var tprl = d3.select(dropdown1);
  tprl.html("");

  // var row1 = tdml.append('option').text("All");
  prdl.forEach(function(c){
      row1 = tprl.append('option').text(c);
  })
};

function dmData3(dml, dropdown){
  // CREATE OPTIONS FOR SELECTION of DISTRICT MANAGERS in DATA3

  var tdm = d3.select(dropdown);
  tdm.html("");

  // var row1 = tdml.append('option').text("All");
  dml.forEach(function(c){
      row1 = tdm.append('option').text(c);
  })
};

function tabterritory(){

  var tbody = d3.select("tbody");

  tbody.html("");

  datpr.forEach(function(d1) {
      
      var row = tbody.append('tr');
  
      Object.entries(d1).forEach(function([key, value]){
          // console.log(key, value);
          row.append("td").text(value);
      });
  });

};


function tabprd(){

  var table2 = d3.select("#prdtable");
  var tbody = table2.select("tbody");

  tbody.html("");

  tabpr.forEach(function(d1) {
      
      var row = tbody.append('tr');
  
      Object.entries(d1).forEach(function([key, value]){
          // console.log(key, value);
          row.append("td").text(value);
      });
  });

};


//POPULATE TABLE FOR PRODUCT AT COUNTRY LEVEL
function tablecou(){

  var table3 = d3.select("#coutable");
  var tbody1 = table3.select("tbody");

  // console.log('I AM IN TAB COUNTRY TABLE #######')
  // console.log(datacountry)

  tbody1.html("");

  datacountry.forEach(function(d1) {
      
      var row = tbody1.append('tr');
  
      Object.entries(d1).forEach(function([key, value]){
          // console.log(key, value);
          row.append("td").text(value);
      });
  });


};

function graphD3(){

  weeks3 = data3t["x"];

  var data3 = data3t[dmD3];

  weeks3.forEach(function(w, index) {
    weeks3[index] = w.replace("Week", "");
  });

  // datacou = data3
  var k1 = Object.keys(data3)

  // console.log("List of products in Data 3: ", k1)

  var data = []
  // datacountry = []

  var trace = {}

  var t1 = 0
  var t2 = 0

  datacountry = [];

  console.log("GRAPH3333333333333333333333333333333333333333333333333333333333333333333333333333333")

  for (index = 0; index < k1.length; index++) {

    n = data3[k1[index]].length - 1

    prdd = {}
    prdd["Product"] = k1[index];
    prdd["Last Measurement"] = data3[k1[index]][n].toLocaleString();
    prdd["Prev Measurement"] = data3[k1[index]][n-d].toLocaleString();
    var ch = ((data3[k1[index]][n]/data3[k1[index]][n-d])-1)*100
    prdd["Per Change"] = ch.toLocaleString();
    t1 += data3[k1[index]][n]
    t2 += data3[k1[index]][n-d]

    datacountry.push(prdd);

    // var weeks = carray(n)

    console.log("ONE PRODUCT LINE:  ---->",prdd);

    var trace = {
      type: "scatter",
      mode: "lines",
      marker: {
        size: 12,
        symbol: "diamond-open"
      },
      name: k1[index],
      textposition: "bottom",
      x: weeks3,
      y: data3[k1[index]]
    };

    data.push(trace)

  };

    prdd = {}

    prdd["Product"] = "Total Country";
    prdd["Last Measurement"] = t1.toLocaleString();
    prdd["Prev Measurement"] = t2.toLocaleString();
    ch = ((t1/t2)-1)*100
    prdd["Per Change"] = ch.toLocaleString();
    datacountry.push(prdd);

  var layout = {
    title: `${td} - ${d} Week(s) Average - Product Performance for ${dmD3} - Up to Week `+ weeks3[weeks3.length-1],
    yaxis: {
      autorange: true,
      type: "linear"
    },
    showlegend: true
  };

  var TESTER = document.getElementById('tester2');
  Plotly.newPlot( TESTER, data, layout);

};

// GET DATA FOR PRODUCT AT COUNTRY LEVEL
function data3f(){

  par1 = td+","+d.toString()

  var url3 = `/data3/${par1}`
  
  console.log("GETTING DATA3333")

  d3.json(url3, function(data3r) {

    var k1 = Object.keys(data3r);

    k1f = [];

    k1.forEach(function(k, index) {
      if ((k != "x") && (k != 0) && (k != "John Clark")) {
        k1f.push(k)
      };
    });

    dmData3(k1f, "#dmcontrol-d3")  //Populate the list of products for the dropdown menu in template
    data3t = data3r;
    dmD3 = "Country";

    graphD3();
    tablecou();

  });
};

// GET DATA FOR PRODUCT AT COUNTRY LEVEL by DISTRICT
function data2(){

  par1 = td+","+d.toString()

  var url2 = `/data2/${par1}`
  
  console.log("GETTING DATA222222")

  d3.json(url2, function(data2) {

    console.log("IN DATA2 ****")

    var k1 = Object.keys(data2);
 
    datap = data2["data"];

    weeks2 = data2["x"];
    
    weeks2.forEach(function(w, index) {
      weeks2[index] = w.replace("Week", "");
    });

    // Products in dataset 
    var k2 = Object.keys(datap)
    // console.log("List of products in the data: ", k2)

    // Update list of District for Webpage control
    var prdl1 = data2["prl"];

    // console.log("LIST PRODUCTS :", prdl1);

    productN(prdl1, "#prdcontrol1")  //Populate the list of products for the dropdown menu in template
    prn1 = prdl1[0];

    graphPRD();
    tabprd();

  });
};

function data1(){
  
  // var url1 = '/data1/${td}'

  par1 = td+","+d.toString()

  var url1 = `/data1/${par1}`

  // console.log("This is type of data in data1: ",td);

  d3.json(url1, function(data1) {
  
    // console.log("IN DATA1 ****")

    var k1 = Object.keys(data1)
    var l1 = k1.length
  
    datat = data1["data"];
    weeks1 = data1["x"];

    weeks1.forEach(function(w, index) {
      weeks1[index] = w.replace("Week", "");
    });

    // Districts in dataset 
    var k2 = Object.keys(datat)
    // console.log("List of Districts in the data: ", k2)

    // Update list of District for Webpage control
    var dml1 = data1[k1[1]] 
    districtN(dml1)
    dmn = dml1[0]

    // Update list of District for Webpage control
    prdl1 = data1[k1[2]]
    productN(prdl1, "#prdcontrol")
    prn = prdl1[0]

    graphDMPR();
    tabterritory();

  });
}

initpage();

// Select the button for DATA1
var button = d3.select("#filter-btn");

// Wait of Click on button action
button.on("click", function() {

  // console.log("BUTTON WAS SELECTED ########")

  // Read date in input field
  var inputDM = d3.select("#dmcontrol");
  dmn = inputDM.property("value");
  
  var inputPR = d3.select("#prdcontrol");
  prn = inputPR.property("value");

  // console.log ("DM name: ", dmn)
  // console.log ("PRD name: ", prn)
  
  graphDMPR()
  tabterritory()

});

// Select the button for DATA2
var button1 = d3.select("#filter-btn1");

// Wait of Click on button action
button1.on("click", function() {

  // console.log("I AM IN PRODUCT BUTTON ########")

  // window.navigate("index2.html");
  // window.location.assign("index2.html"); 

  var inputPR = d3.select("#prdcontrol1");
  prn1 = inputPR.property("value");

  // console.log ("PRD name: ", prn1)
  
  graphPRD()
  tabprd()

});


// Select the button for DATA3
var button3 = d3.select("#filter-btn-d3");

// Wait of Click on button action
button3.on("click", function() {

  // console.log("I AM IN PRODUCT FOR DATA 3 ########")

  var inputPR = d3.select("#dmcontrol-d3");
  dmD3 = inputPR.property("value");

  // console.log ("PRD name: ", dmD3)
  
  graphD3();
  tablecou();

});


// Select the button for TYPE OF DATA - TRx, Cards, Covered Cards
var but_tdata = d3.select("#btn1_tdata");

but_tdata.on("click", function() {

  // console.log("SELECT TYPE OF DATA BUTTON ########")

  var bttdata = d3.select("#tdatacontrol1");
  td = bttdata.property("value");

  var nwdata = d3.select("#nweeks");
  d = nwdata.property("value");

  par1 = td+","+d.toString()

  // console.log ("Type of Data: ", td);
  // console.log ("Number of Weeks: ", d);

  data1();
  data2();
  data3f();

});

