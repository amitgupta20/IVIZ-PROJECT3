loadData();
function loadData() {
  d3.csv("Renewable-Energy-Capacity.csv").then(drawBarChart);
}
function drawBarChart(myData) {
  // //append title
  d3.select("#bar-chart")
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
  const margin = { top: 70, right: 30, bottom: 40, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

  // // append the svg object to the body of the page
  const svg = d3.select("#bar-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Parse the Data
  d3.csv("Renewable-Energy-Capacity.csv").then( function(data) {
      console.log(data);
    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called Source -> I show them on the X axis
    const groups = data.map(d => (d.Source))

    // Add X axis
    const x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 15000])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(["red", "blue", "orange", "Green"])

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subgroups)
      (data)

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = Source per Source
      .data(stackedData)
      .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(d => d)
        .join("rect")
          .attr("x", d => x(d.data.Source))
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width",x.bandwidth())
  })
}
