d3.csv("data/ARE_Spot_Prices.csv", d => {
  return {
    year: d.Year,
    averagePrices: +d["Average Price (notTas-Snowy)"]
  };
}).then(data => {

  console.log("Line Data:", data);
console.log("First row:", data[0]);
console.log("Keys:", Object.keys(data[0]));
   
    

drawLineChart(data); // Call Function which will draw the line chart
});



const drawLineChart = (data) => {


      const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");

  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  // create a group element for the inner chart
const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


           //create scales
const xScale = d3.scaleBand() 
    .domain(data.map(d => d.year))
    .range([0, innerWidth]);

    
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrices)])
    .range([innerHeight, 0]);


    
const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d")); // Format the tick labels as integers



const leftAxis = d3.axisLeft(yScale);


innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

innerChart
    .append("g")
    .call(leftAxis);


 // add y-axis label
innerChart
.append("text")
.text("Average Price (notTas-Snowy)")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("text-anchor", "start");


// add x-axis label
innerChart
.append("text")
.text("Year")
    .attr("x", (innerWidth + margin.right)-130)
    .attr("y", innerHeight + margin.bottom -20)
    .attr("text-anchor", "end");

   // Draw scatter plot
    innerChart.selectAll("circle")
        .data(data) // bring in the data
        .join("circle") // create a circle for each data point
        .attr("r", 4) // radius of the circle
        .attr("cx", d => xScale(d.year)) // x axis position based on year
        .attr("cy", d => yScale(d.averagePrices)) // y axis position based on averagePrices
        .attr("fill", "black"); // color of the circle


    const lineGenerator = d3.line() // Create a line generator function
    .x(d => xScale(d.year)) // x axis position based on year
    .y(d => yScale(d.averagePrices));  // y axis position based on averagePrices


    // Draw the line connecting the points
    innerChart
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2)
    .attr("d", lineGenerator(data)); // call the line generator function with the data to create the path

};