loadData()
function loadData() {
    d3.csv('Renewable-Energy-Capacity.csv').then(drawBarChart)
}
function drawBarChart(myData) {
    // //append title
    d3.select('#bar-chart')
        .append('text')
        .attr('x', 485)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .text(
            'Year-wise and Source-wise Renewable Energy (RE) Capacity Addition in the Country from 2014-15 to 2021-22'
        )
        .style('fill', 'black')
        .style('font-size', 16)
        .style('font-weight', 'bolder')
        .style('font-family', 'Montserrat')

    //margin and size
    const margin = { top: 70, right: 20, bottom: 20, left: 100 },
        width = 1000 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom

    // append the svg object to the body of the page
    const svg = d3
        .select('#bar-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    // Parse the Data
    d3.csv('Renewable-Energy-Capacity.csv').then(function (data) {
        console.log(data)
        // List of subgroups = header of the csv files = soil condition here
        const subgroups = data.columns.slice(1)
        // List of groups = species here = value of the first column called Source -> I show them on the X axis
        const groups = data.map((d) => d.Source)

        //X-Axis and Label
        const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2])
        const xAxis = svg
            .append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
        xAxis
            .append('text')
            .attr('x', 400) //middle of the xAxis
            .attr('y', '50') // a little bit below xAxis
            .text('Year')

        //Y-Axis and Label
        const y = d3.scaleLinear().domain([0, 15000]).range([height, 0])
        svg.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(y))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', '-200')
            .attr('y', '-70')
            .attr('text-anchor', 'end')
            .text('In MW')

        // color palette = one color per subgroup
        const color = d3
            .scaleOrdinal()
            .domain(subgroups)
            .range(['red', 'blue', 'green', 'orange'])

        //stack the data --> stack per subgroup
        const stackedData = d3.stack().keys(subgroups)(data)

        //tooltip text
        const tooltip = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)

        // Show the bars
        svg.append('g')
            .selectAll('g')
            // Enter in the stack data = loop key per key = Source per Source
            .data(stackedData)
            .join('g')
            .attr('fill', (d) => color(d.key))
            .selectAll('rect')
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data((d) => d)
            .join('rect')
            .attr('x', (d) => x(d.data.Source))
            .attr('y', (d) => y(d[1]))
            .attr('height', (d) => y(d[0]) - y(d[1]))
            .attr('width', x.bandwidth())
            .on('mouseover', (d, dataArray) => {
                let val = dataArray[1] - dataArray[0]
                val = Math.round((val + Number.EPSILON) * 100) / 100
                let source = ''
                if (val == dataArray.data['Solar']) source = 'Solar'
                if (val == dataArray.data['Wind']) source = 'Wind'
                if (val == dataArray.data['Small Hydro']) source = 'Small Hydro'
                if (val == dataArray.data['Large Hydro']) source = 'Large Hydro'
                tooltip.transition().duration(200).style('opacity', 0.9)
                tooltip
                    .html(
                        `<p> 
                        Year :
                        ${dataArray.data.Source}
                        <br>
                        Source :
                        ${source}
                        <br>
                        Capacity : 
                        ${val}
                        </p>`
                    )
                    .style('left', d.pageX - 25 + 'px')
                    .style('top', d.pageY - 50 + 'px')
                    .style('padding', '0px 10px 0px 10px')
                    .style('border-radius', '5px')
            })
            .on('mouseout', () =>
                tooltip.transition().duration(500).style('opacity', 0)
            )

        //Legends
        let legends = d3.select('#bar-chart')

        //List of keys
        let keys = ['Solar', 'Wind', 'Small Hydro', 'Large Hydro']
        let colors = ['red', 'blue', 'green', 'orange']

        //Color Scale
        let colorr = d3.scaleOrdinal().domain(keys).range(colors)

        //Add one dot in the legend for each name.
        let size = 20
        legends
            .selectAll('mydots')
            .data(keys)
            .enter()
            .append('circle')
            .attr('r', 6)
            .attr('cx', 850)
            .attr('cy', function (d, i) {
                return 79 + i * (size + 5)
            })
            .attr('width', size)
            .attr('height', size)
            .style('fill', function (d) {
                return colorr(d)
            })
            .attr('border-radius', '50%')

        // Add one text in the legend for each name.
        legends
            .selectAll('mylabels')
            .data(keys)
            .enter()
            .append('text')
            .attr('x', 850 + size * 1.2)
            .attr('y', function (d, i) {
                return 70 + i * (size + 5) + size / 2
            })
            .style('fill', function (d) {
                return colorr(d)
            })
            .text(function (d) {
                return d
            })
            .attr('text-anchor', 'left')
            .style('alignment-baseline', 'middle')
            .style('font-weight', 'bolder')
            .style('text-shadow', '1px 1px 1px black')
    })
}
