loadData();
function loadData() {
  d3.csv("Renewable-Energy-Capacity.csv").then(lineChart);
}
function lineChart(data) {
  //set canvas margins

  let leftMargin = 100,
    topMargin = 170,
    rightMargin = 20,
    bottomMargin = 20,
    width = 800,
    height = 600;

  // //append title
  d3.select("#line-graph")
    .append("text")
    .attr("x", 485)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .text(
      "Year-wise and Source-wise Renewable Energy (RE) Capacity Addition in the Country from 2014-15 to 2021-22"
    )
    .style("fill", "black")
    .style("font-size", 16)
    .style("font-weight", "bolder")
    .style("font-family", "Montserrat");

  let maxValue = d3.max(data, (d) =>
    Math.max(+d.Solar, +d.Wind, +d["Small Hydro"], +d["Large Hydro"])
  );

  let yScale = d3
    .scaleLinear()
    .domain([-500, maxValue + 500])
    .range([height - topMargin - bottomMargin, 0]);
  let xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.Source))
    .range([0, width - leftMargin - rightMargin])
    .padding(0.2);

  let xAxis = d3.axisBottom(xScale);

  d3.select("svg")
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${leftMargin + 18},${height - bottomMargin})`)
    .call(xAxis)
    .append("text")
    .attr("x", width / 2) //middle of the xAxis
    .attr("y", "50") // a little bit below xAxis
    .text("Year");

  // //yAxis and yAxis label
  let yAxis = d3.axisLeft(yScale).ticks(15);

  d3.select("svg")
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${leftMargin + 18},${topMargin})`) //use variable in translate
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", "-200")
    .attr("y", "-70")
    .attr("text-anchor", "end")
    .text("In MW");



  let line1 = d3
    .line()
    .x((d) => xScale(d.Source))
    .y((d) => yScale(+d.Solar))
    .curve(d3.curveCardinal);

  d3.select("svg")
    .selectAll(".line")
    .append("g")
    .attr("class", "line")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line1)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("transform", `translate(150,${topMargin})`);

  // //append circle
  d3.select("svg")
    .selectAll("circle")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("data", (d) => +d.Solar)
    .attr("cx", (d) => xScale(d.Source))
    .attr("cy", (d) => yScale(+d.Solar))
    .style("fill", "red")
    .attr(
      "transform",
      `translate(${leftMargin + rightMargin + 30},${topMargin})`
    );

  let line2 = d3
    .line()
    .x((d) => xScale(d.Source))
    .y((d) => yScale(+d.Wind))
    .curve(d3.curveCardinal);

  d3.select("svg")
    .selectAll(".line")
    .append("g")
    .attr("class", "line")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line2)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("transform", `translate(150,${topMargin})`);

  // //append circle
  d3.select("svg")
    .selectAll(".circle2")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle2")
    .attr("r", 6)
    .attr("cx", (d) => xScale(d.Source))
    .attr("cy", (d) => yScale(+d.Wind))
    .style("fill", "blue")
    .attr(
      "transform",
      `translate(${leftMargin + rightMargin + 30},${topMargin})`
    );

  let line3 = d3
    .line()
    .x((d) => xScale(d.Source))
    .y((d) => yScale(+d["Small Hydro"]))
    .curve(d3.curveCardinal);

  d3.select("svg")
    .selectAll(".line")
    .append("g")
    .attr("class", "line")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line3)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2)
    .attr("transform", `translate(150,${topMargin})`);

  // //append circle
  d3.select("svg")
    .selectAll(".circle3")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle3")
    .attr("r", 6)
    .attr("cx", (d) => xScale(d.Source))
    .attr("cy", (d) => yScale(+d["Small Hydro"]))
    .style("fill", "green")
    .attr(
      "transform",
      `translate(${leftMargin + rightMargin + 30},${topMargin})`
    );

  let line4 = d3
    .line()
    .x((d) => xScale(d.Source))
    .y((d) => yScale(+d["Large Hydro"]))
    .curve(d3.curveCardinal);
  // .curve()
  // .curve(d3.curveCardinal)((d) => +d.Solar)
  // console.log(xScale(data[0].Source))
  d3.select("svg")
    .selectAll(".line")
    .append("g")
    .attr("class", "line")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line4)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 2)
    .attr("transform", `translate(150,${topMargin})`);

  // //append circle
  d3.select("svg")
    .selectAll(".circle4")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle4")
    .attr("r", 6)
    .attr("cx", (d) => xScale(d.Source))
    .attr("cy", (d) => yScale(+d["Large Hydro"]))
    .style("fill", "orange")
    .attr(
      "transform",
      `translate(${leftMargin + rightMargin + 30},${topMargin})`
    );

  let legends = d3.select("#line-graph");

  // create a list of keys
  let keys = ["Solar", "Wind", "Large Hydro", "Small Hydro"];
  let colors = ["red", "blue", "orange", "Green"];

  // Usually you have a color scale in your chart already
  let color = d3.scaleOrdinal().domain(keys).range(colors);

  // Add one dot in the legend for each name.
  let size = 20;
  legends
    .selectAll("mydots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("cx", 850)
    .attr("cy", function (d, i) {
      return 159 + i * (size + 5);
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function (d) {
      return color(d);
    })
    .attr("border-radius", "50%");

  // Add one dot in the legend for each name.
  legends
    .selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 850 + size * 1.2)
    .attr("y", function (d, i) {
      return 150 + i * (size + 5) + size / 2;
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function (d) {
      return color(d);
    })
    .text(function (d) {
      return d;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .style("font-weight", "bolder");

  var tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("padding", "0px 10px 0px 10px")
    .style("border-radius", "5px");
  // Add events to circles
  d3.selectAll("circle")
    .on("mouseover", function (d) {
      let data = d.path[0].__data__;
      tip
        .style("opacity", 1)
        .html(
          `<p> Year
                    : 
                    ${data["Source"]}
                    <br>
                    Large Hydro
                    : 
                    ${data["Large Hydro"]}
                    <br>
                    Small Hydro
                    : 
                    ${data["Small Hydro"]}
                    <br>
                    Solar
                    : 
                    ${data["Solar"]}
                    <br>
                    Wind
                    : 
                    ${data["Wind"]}</p>`
        )
        .style("left", d.pageX - 25 + "px")
        .style("top", d.pageY - 150 + "px");
    })
    .on("mouseout", function (d) {
      tip.style("opacity", 0);
    });
}
