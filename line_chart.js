// !preview r2d3 data=air
//
// r2d3: https://rstudio.github.io/r2d3
//

//var barHeight = Math.floor(height / data.length);

//svg.selectAll('rect')
//  .data(data)
//  .enter().append('rect')
//    .attr('width', function(d) { return d * width; })
//    .attr('height', barHeight)
//    .attr('y', function(d, i) { return i * barHeight; })
//    .attr('fill', 'steelblue');
    

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 200
    height = 200,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," 
    + margin.top + ")");
console.log(data[1]);

var parseTime = d3.timeParse("%y-%b-%d");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.mg_per_cubic_mt); });

//d3.tsv("data.tsv", function(d) {
//  d.date = parseTime(d.date);
//  d.mg_per_cubic_mt = +d.mg_per_cubic_mt;
//  return d;
//  }, function(error, data) {
//  if (error) throw error;

x.domain(d3.extent(data, function(d) { 
    d.date = parseTime(d.date);
    return d.date; 
  }));
y.domain(d3.extent(data, function(d) { return d.mg_per_cubic_mt; }));

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
      .remove();

g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
//});