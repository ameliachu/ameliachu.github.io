d3.csv("csv/13_qqplot.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.SampleQuantiles = +d.SampleQuantiles;
    d.TheoreticalQuantiles = +d.TheoreticalQuantiles;
  });
  var svg = d3.select("#qq-plot");

  var margin = {top: 20, right: 20, bottom: 30, left: 20},
      width = +svg.attr("width")  - margin.left - margin.right,
      height = +svg.attr("height")  - margin.top - margin.bottom;

  var x = d3.scaleLinear()
      .range([0, width]);

  var y = d3.scaleLinear()
      .range([height, 0]);


  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y);

  x.domain(d3.extent(data, function(d) { return d.SampleQuantiles; })).nice();
  y.domain(d3.extent(data, function(d) { return d.TheoreticalQuantiles; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("x", width - margin.right)
      .attr("y", -6)
      .attr("fill", "#000")
      .style("text-anchor", "end")
      .attr("font-weight", "bold")
     .text("Theoretical Quantiles")
;

  svg.append("g")
      .attr("class", "y axis")
      //.attr("transform", "translate(0," + width + ")")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("fill", "#000")
      .style("text-anchor", "end")
      .attr("font-weight", "bold")
      .text("Sample Quantiles");

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 2)
      .attr("cx", function(d) { return x(d.SampleQuantiles); })
      .attr("cy", function(d) { return y(d.TheoreticalQuantiles); })
      .attr("fill", "steelblue");

  svg.append("line")
    .attr("x1", x(-12.5507721429024))
    .attr("y1", y(-21.7479))
    .attr("x2", x(14.04521))
    .attr("y2", y(24.3488124301189))
    .style("stroke-width", 1)
    .style("stroke", "black")
    .style("fill", "none");

});
