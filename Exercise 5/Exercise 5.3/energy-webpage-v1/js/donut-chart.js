d3.csv("data/Data_exercise 5.3.csv", d => {
  return {
    screensize_cat: d.Screensize_Category,
    count: +d.Count
  };
}).then(data => {

  console.log("Line Data:", data);
console.log("First row:", data[0]);
console.log("Keys:", Object.keys(data[0]));
   
    

drawDonutChart(data); // Call Function which will draw the line chart
});



const drawDonutChart = (data) => {

    const width = 500;
  const height = 500;

  // Set up the SVG container for the donut chart
    const svg = d3.select("#donut-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");

      // Set up chart dimensions
    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  
    const radius = Math.min(width, height) / 2 -20; // leave some padding for labels

    // Set up color scale for the donut chart
    const color = d3.scaleOrdinal()
    .domain(data.map(d => d.screensize_cat))
    .range(d3.schemeTableau10); // color scale for the donut chart

// Create a pie generator to compute the angles for each slice of the donut chart
    const pie = d3.pie()
.value(d => d.count)
.sort(null); // disable sorting to maintain the original order of data


const ArcGenerator = d3.arc()
    .innerRadius(radius * 0.5) // inner radius for the donut hole
    .outerRadius(radius * 0.8); // outer radius for the donut chart


    // Create a group element to hold the donut chart and center it within the SVG container
    const innerChart = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`); // center the chart


    // draw the donut chart
    innerChart.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", ArcGenerator)
    .attr("fill", d => color(d.data.screensize_cat))
    .attr("stroke", "white")
    .style("stroke-width", "2px");

   
    // Add labels
    innerChart.selectAll("text")
        .data(pie(data))
        .join("text")
        .attr("transform", d => `translate(${ArcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data.screensize_cat);
};