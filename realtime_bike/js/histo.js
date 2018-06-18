d3.csv("csv/12a_capacity-histo.csv", function(csv) {
   var data = []
   var dataMax = d3.max(csv, function(d) { return d.capacity; }),
       dataMin = d3.min(csv, function(d) { return d.capacity; });

   csv.map(function(d){
     data.push(+d.capacity)
   })
   data.y = "Number of Stations ";
  data.x = "Capacity"
   console.log(data)
   var svg = d3.select("#arima-forecast"),
       margin = {top: 30, right: 10, bottom: 10, left: 30},
       width = +svg.attr("width") - margin.left - margin.right,
       height = +svg.attr("height") - margin.top - margin.bottom;

   var x = d3.scaleLinear()
    .domain(d3.extent(data)).nice()
    .range([margin.left, width - margin.right]);

   var bins = d3.histogram().domain(x.domain()).thresholds(x.ticks(20))(data);

   var max = d3.max(bins, function(d) {
     return d.y;
   });

   var y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([height - margin.bottom, margin.top]);

var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(data.x));
var red = 35
var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y));
  var bar = svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(bins)
    .enter().append("rect")
      .attr("x", d => x(d.x0) + 1)
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr("y", d => y(d.length))
      .attr("height", d => y(0) - y(d.length));
   svg.append("g")
        .call(xAxis);

  svg.append("g")
        .call(yAxis);
  svg.append("line")
    .attr("x1", x(red))  //<<== change your code here
    .attr("y1", 0)
    .attr("x2", x(red))  //<<== and here
    .attr("y2", height - margin.bottom)
    .style("stroke-width", 1)
    .style("stroke", "red")
    .style("fill", "none");

})
