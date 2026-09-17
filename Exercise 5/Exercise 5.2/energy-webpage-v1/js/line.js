d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    console.log(data);

    drawLineChart(data);
});


const drawLineChart = data => {

    // Set up margins
    const margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 70
    };

    const width = 500;
    const height = 400;

    // Create SVG container
    const svg = d3.select("#lineChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create inner chart
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Calculate chart dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    // Create x scale
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);


    // Create y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);


    // Create x axis
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));

    // Create y axis
    const yAxis = d3.axisLeft(yScale);


    // Add x axis
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);


    // Add y axis
    innerChart.append("g")
        .call(yAxis);


    // Add x axis label
    innerChart.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .text("Year");


    // Add y axis label
    innerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Average Price (USD/MWh)");


    // Draw scatter plot
    innerChart.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", "black");


    // Create line generator
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));


    // Draw line
    innerChart.append("path")
        .datum(data)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2);
};