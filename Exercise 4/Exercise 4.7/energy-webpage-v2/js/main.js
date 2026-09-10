const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 500")
      .style("border", "1px solid black");




    // get the data from the csv file and log it to the console
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

drawBarChart(data); // call the function to draw the bar chart
});


// function to draw the bar chart
const drawBarChart = data => {





   const xScale = d3.scaleLinear()
  .domain([0, 1100])
  .range([0, 400]);


  const yScale = d3.scaleBand()
 .domain(data.map(d => d.brand))
 .range([0, 500])
 .padding(0.1);



    // Code for bar chart goes here
    const barAndLabel = svg
  .selectAll("g")
  .data(data)
  .join("g")
  .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  

  // bar chart
  barAndLabel
    .append("rect")
    // make the bars proportional to the count value
    .attr("width", d => xScale(d.count)) // as long as the count is not too big, we can multiply it by 10 to make it more visible
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue")
    // Space out the bars
    .attr("x", 70)
    .attr("y", 0)


    

   // the brand name will be displayed at the start of each bar, so we need to append a text element to each bar
    barAndLabel

    .append("text")

        .text(d => d.brand)
        .attr("x", 65)
        .attr("y", 13)
        .attr("text-anchor", "end")
        .style("font-size", "13px");


  
// the count value will be displayed at the end of each bar, so we need to append a text element to each bar
    barAndLabel
    .append("text")
  .text(d => d.count)
        .attr("x", d => 68 + xScale(d.count) + 4)
        .attr("y", 13)
        .style("font-size", "13px");
    
 
  };

const barHeight = 20;
const barSpacing = 5;


