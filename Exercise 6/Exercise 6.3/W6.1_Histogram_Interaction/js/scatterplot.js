const drawScatterplot = (data) => {
   
     xScaleS
        .domain([0, d3.max(data, d => d.star)])
        .range([0, innerWidth]);

    yScaleS
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .range([innerHeight, 0]);

   
    // Set up the SVG container for the scatterplot
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)

   innerChartS = svg
   .append("g")
   .attr("transform", `translate(${margins.left}, ${margins.top})`);





   // draw the axis labels
const bottomAxis = d3.axisBottom(xScaleS);
const leftAxis = d3.axisLeft(yScaleS);

innerChartS.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

innerChartS
    .append("g")
    .call(leftAxis);

// axis labels
      // add y-axis label
innerChartS
.append("text")
.text("Labeled Energy Consumption (kWh)")
    .attr("x", - 50)
    .attr("y", -10)
    .attr("text-anchor", "start");


// add x-axis label
innerChartS
.append("text")
.text("Star Rating")
    .attr("x", innerWidth )
    .attr("y", innerHeight + 45)
    .attr("text-anchor", "end");


       // Draw scatter plot
    innerChartS.selectAll("circle")
        .data(data) // bring in the data
        .join("circle") // create a circle for each data point
        .attr("r", 4) // radius of the circle
        .attr("cx", d => xScaleS(d.star)) // x axis position based on star rating
        .attr("cy", d => yScaleS(d.energyConsumption)) // y axis position based on energy consumption
         .attr("fill", d => colorScale(d.screenTech)); 

}
