loadData()
function loadData() {
    d3.csv('Renewable-Energy-Capacity.csv').then(lineChart)
}
function lineChart(data) {
    //set canvas margins
    let leftMargin = 100,
        topMargin = 70,
        rightMargin = 20,
        bottomMargin = 20,
        width = 800,
        height = 600

    //append title
    d3.select('#line-graph')
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

    //max value among all the values
    let maxValue = d3.max(data, (d) =>
        Math.max(+d.Solar, +d.Wind, +d['Small Hydro'], +d['Large Hydro'])
    )

    //y Scale and x Scale
    let yScale = d3
        .scaleLinear()
        .domain([-500, maxValue + 500])
        .range([height - topMargin - bottomMargin, 0])
    let xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.Source))
        .range([0, width - leftMargin - rightMargin])
        .padding(0.2)

    //x-Axis and x-Axis label
    let xAxis = d3.axisBottom(xScale)

    d3.select('svg')
        .append('g')
        .attr('class', 'axis')
        .attr(
            'transform',
            `translate(${leftMargin + 18},${height - bottomMargin})`
        )
        .call(xAxis)
        .append('text')
        .attr('x', width / 2) //middle of the xAxis
        .attr('y', '50') // a little bit below xAxis
        .text('Year')

    //y-Axis and y-Axis label
    let yAxis = d3.axisLeft(yScale).ticks(15)

    d3.select('svg')
        .append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${leftMargin + 18},${topMargin})`) //use variable in translate
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', '-200')
        .attr('y', '-70')
        .attr('text-anchor', 'end')
        .text('In MW')

    //tool-tip text
    const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

    //line 1
    let line1 = d3
        .line()
        .x((d) => xScale(d.Source))
        .y((d) => yScale(+d.Solar))
        .curve(d3.curveCardinal)

    d3.select('svg')
        .selectAll('.line')
        .append('g')
        .attr('class', 'line')
        .data([data])
        .enter()
        .append('path')
        .attr('d', line1)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('transform', `translate(150,${topMargin})`)

    //append circle
    d3.select('svg')
        .selectAll('circle')
        .append('g')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 6)
        .attr('data', (d) => +d.Solar)
        .attr('cx', (d) => xScale(d.Source))
        .attr('cy', (d) => yScale(+d.Solar))
        .style('fill', 'red')
        .attr(
            'transform',
            `translate(${leftMargin + rightMargin + 30},${topMargin})`
        )
        .on('mouseover', (d, dataArray) => {
            console.log(dataArray)
            let val = dataArray['Solar']
            tooltip.transition().duration(200).style('opacity', 0.9)
            tooltip
                .html(
                    `<p>
            Year :
            ${dataArray.Source}
            <br>
            Source :
            ${'Solar'}
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

    //line 2
    let line2 = d3
        .line()
        .x((d) => xScale(d.Source))
        .y((d) => yScale(+d.Wind))
        .curve(d3.curveCardinal)

    d3.select('svg')
        .selectAll('.line')
        .append('g')
        .attr('class', 'line')
        .data([data])
        .enter()
        .append('path')
        .attr('d', line2)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('transform', `translate(150,${topMargin})`)

    //append circle
    d3.select('svg')
        .selectAll('.circle2')
        .append('g')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle2')
        .attr('r', 6)
        .attr('cx', (d) => xScale(d.Source))
        .attr('cy', (d) => yScale(+d.Wind))
        .style('fill', 'blue')
        .attr(
            'transform',
            `translate(${leftMargin + rightMargin + 30},${topMargin})`
        )
        .on('mouseover', (d, dataArray) => {
            console.log(dataArray)
            let val = dataArray['Wind']
            tooltip.transition().duration(200).style('opacity', 0.9)
            tooltip
                .html(
                    `<p>
            Year :
            ${dataArray.Source}
            <br>
            Source :
            ${'Wind'}
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

    //line 3
    let line3 = d3
        .line()
        .x((d) => xScale(d.Source))
        .y((d) => yScale(+d['Small Hydro']))
        .curve(d3.curveCardinal)

    d3.select('svg')
        .selectAll('.line')
        .append('g')
        .attr('class', 'line')
        .data([data])
        .enter()
        .append('path')
        .attr('d', line3)
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('transform', `translate(150,${topMargin})`)

    //append circle
    d3.select('svg')
        .selectAll('.circle3')
        .append('g')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle3')
        .attr('r', 6)
        .attr('cx', (d) => xScale(d.Source))
        .attr('cy', (d) => yScale(+d['Small Hydro']))
        .style('fill', 'green')
        .attr(
            'transform',
            `translate(${leftMargin + rightMargin + 30},${topMargin})`
        )
        .on('mouseover', (d, dataArray) => {
            console.log(dataArray)
            let val = dataArray['Small Hydro']
            tooltip.transition().duration(200).style('opacity', 0.9)
            tooltip
                .html(
                    `<p>
            Year :
            ${dataArray.Source}
            <br>
            Source :
            ${'Small Hydro'}
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

    //line 4
    let line4 = d3
        .line()
        .x((d) => xScale(d.Source))
        .y((d) => yScale(+d['Large Hydro']))
        .curve(d3.curveCardinal)

    d3.select('svg')
        .selectAll('.line')
        .append('g')
        .attr('class', 'line')
        .data([data])
        .enter()
        .append('path')
        .attr('d', line4)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('transform', `translate(150,${topMargin})`)

    //append circle
    d3.select('svg')
        .selectAll('.circle4')
        .append('g')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle4')
        .attr('r', 6)
        .attr('cx', (d) => xScale(d.Source))
        .attr('cy', (d) => yScale(+d['Large Hydro']))
        .style('fill', 'orange')
        .attr(
            'transform',
            `translate(${leftMargin + rightMargin + 30},${topMargin})`
        )
        .on('mouseover', (d, dataArray) => {
            console.log(dataArray)
            let val = dataArray['Large Hydro']
            tooltip.transition().duration(200).style('opacity', 0.9)
            tooltip
                .html(
                    `<p>
              Year :
              ${dataArray.Source}
              <br>
              Source :
              ${'Large Hydro'}
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

    //legends
    let legends = d3.select('#line-graph')

    // create a list of keys
    let keys = ['Solar', 'Wind', 'Large Hydro', 'Small Hydro']
    let colors = ['red', 'blue', 'orange', 'Green']

    //color scale
    let color = d3.scaleOrdinal().domain(keys).range(colors)

    // Add one dot in the legend for each name.
    let size = 20
    legends
        .selectAll('mydots')
        .data(keys)
        .enter()
        .append('circle')
        .attr('r', 6)
        .attr('cx', 850)
        .attr('cy', function (d, i) {
            return 100 + i * (size + 5)
        })
        .attr('width', size)
        .attr('height', size)
        .style('fill', function (d) {
            return color(d)
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
            return 90 + i * (size + 5) + size / 2
        })
        .style('fill', function (d) {
            return color(d)
        })
        .text(function (d) {
            return d
        })
        .attr('text-anchor', 'left')
        .style('alignment-baseline', 'middle')
        .style('font-weight', 'bolder')
        .style('text-shadow', '1px 1px 1px black')
}
