const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");


svg
  .append("rect")
    .attr("x", 100)
    .attr("y", 200)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");


 d3.csv("data/exercise4.4.csv", d => {
    console.log(d); 
}
);


d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count //=> converts to number
  };
}).then(data => {
  console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));
data.sort((a, b) => b.count - a.count);

drawBarChart(data); 
});


const drawBarChart = data => {

    // Code for bar chart goes here
    svg
    .selectAll("rect")
    .data(data)
    .join("rect")

    // make the bars proportional to the count value
    .attr("width", d => d.count) // as long as the count is not too big, we can multiply it by 10 to make it more visible
    .attr("height", barHeight)
    .attr("fill", "steelblue")

    // Space out the bars
    .attr("x", 0)
    .attr("y", (d, i) => i * (barHeight + barSpacing))

    // Add a class to each bar based on the count value
    .attr("class", d => {
    console.log(d);
     return `bar bar-${d.count}`;
    });

  
  };

const barHeight = 20;
const barSpacing = 5;