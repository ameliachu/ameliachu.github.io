d3.csv("arima-aicc.csv", function(data) {
  // the columns you'd like to display
  var columns = ["p","d","q","constant","AICC"];
  var max = d3.max(data, function(d) { return d.AICC; });
  var table = d3.select("#arima-aicc"),
  thead = table.append("thead"),
  tbody = table.append("tbody");

  //append the header row
  thead.append("tr")
  .selectAll("th")
  .data(columns)
  .enter()
  .append("th")
    .text(function(column) { return column; })
    .style('font-size', 12);

// create a row for each object in the data
var rows = tbody.selectAll("tr")
  .data(data)
  .enter()
  .append("tr");

  // create a cell in each row for each column
var cells = rows.selectAll("td")
.data(function(row) {
    return columns.map(function(column) {
        return {column: column, value: row[column]};
      });
    })
    .enter()
    .append("td")
    .text(function(d) { if (isNaN(d.value)) { return d.value}
    else {return d.value}; })
    .style('background-color',function(d){ if(Number(d.value) == Number(max)) { return "steelblue"} })
    .style('color',function(d) { if(Number(d.value) == Number(max)) { return "white"} })
    .style('font-size', 10)
  });
