d3.csv("data/Data_exercise 5.1-1.csv", d => {
  return {
    Screen_Tech: d.Screen_Tech,
    Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"]
  };
}).then(data => {

  console.log("Data:", data);
console.log("First row:", data[0]);
console.log("Keys:", Object.keys(data[0]));
   
    // Sort data
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

drawBarChart(data); // Call Function which will draw in the next exercise
});



const width = 1000;
  const height = 500;


const drawBarChart = (data) => {
  
   

  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;



 const svg = d3.select("#bar-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid black");

// create a group element for the inner chart
const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



       //create scales
const xScale = d3.scaleBand() 
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.1);

    
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0]);

const bottomAxis = d3.axisBottom(xScale);
const leftAxis = d3.axisLeft(yScale);

innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

innerChart
    .append("g")
    .call(leftAxis);


    // add axis label
innerChart
.append("text")
.text("Energy Consumption (kWh)")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("text-anchor", "start");



    //draw bars
    innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.Screen_Tech))
      .attr("y", d => yScale(d.Energy_Consumption))
      .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
      .attr("fill", "green");


};


 