
  var spec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v3.json',
  data: {name: 'table'},
  width: 400,
  mark: 'line',
  encoding: {
    x: {field: 'x', type: 'quantitative', scale: {domain: [0, 100]}},
    y: {field: 'y', type: 'quantitative', scale: {domain: [-1, 1]}}
  }
};

function makeData(N) {
  data = [];
  for (x = 0; x < N; x++) {
    data.push({x: x, y: Math.sin(x / 10)})
  }
  return data
}

vegaEmbed('#chart', spec).then(function(res) {
  var changeSet = vega.changeset().insert(makeData(100));
  res.view.change('table', changeSet).run();
})

console.log("NEW In Script")
console.log(wcdata)



