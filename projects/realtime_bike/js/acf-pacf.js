function acf (csv , id) {d3.csv(csv, function(csv) {
  var data = []
  var max = d3.max(csv, function(d) { return d.acf; }),
      min = d3.min(csv, function(d) { return d.acf; });
      if (min > 0 ){
	       var min = 0
       }; //if min is less that zero only, else return 0
       csv.map(function(d){
         data.push(+d.acf)
       })
       //console.log(max);
       //console.log(min);
       //console.log("data",data);
       var svg = d3.select(id),
           margin = {top: 30, right: 10, bottom: 10, left: 30},
           width = +svg.attr("width") - margin.left - margin.right,
           height = +svg.attr("height") - margin.top - margin.bottom;

       var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

       var x = d3.scaleBand().domain(d3.range(data.length)).rangeRound([0, width]).padding(0.01);
       var y = d3.scaleLinear().domain([min, max]).rangeRound([height, 0]);
       var yAxis = d3.axisLeft(y);

     g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", function(d) { return d < 0 ? "bar negative" : "bar positive"; })
         .attr("y", function(d) { return y(Math.max(0, d)); })
         .attr("x", function(d, i) { return x(i); })
         .attr("height", function(d) { return Math.abs(y(d) - y(0)); })
         .attr("width", 1);
     g.append("g")
         .attr("class", "x axis")
         .call(yAxis);

     g.append("g")
         .attr("class", "y axis")
       .append("line")
         .attr("y1", y(0))
         .attr("y2", y(0))
         .attr("x1", 0)
         .attr("x2", width);
       });}
function pacf (csv , id) {d3.csv(csv, function(csv) {
 var data = []
 var max = d3.max(csv, function(d) { return d.pacf; }),
     min = d3.min(csv, function(d) { return d.pacf; });
     if (min > 0 ){
	       var min = 0
      }; //if min is less that zero only, else return 0
      csv.map(function(d){
        data.push(+d.pacf)
      })
      //console.log(max);
      //console.log(min);
      //console.log("data",data);
      var svg = d3.select(id),
          margin = {top: 30, right: 10, bottom: 10, left: 30},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;

      var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleBand().domain(d3.range(data.length)).rangeRound([0, width]).padding(0.01);
      var y = d3.scaleLinear().domain([min, max]).rangeRound([height, 0]);
      var yAxis = d3.axisLeft(y);

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", function(d) { return d < 0 ? "bar negative" : "bar positive"; })
        .attr("y", function(d) { return y(Math.max(0, d)); })
        .attr("x", function(d, i) { return x(i); })
        .attr("height", function(d) { return Math.abs(y(d) - y(0)); })
        .attr("width", 1);
    g.append("g")
        .attr("class", "x axis")
        .call(yAxis);

    g.append("g")
        .attr("class", "y axis")
      .append("line")
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("x1", 0)
        .attr("x2", width);
      });}
