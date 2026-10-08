const drawHistogram = (data) => {
  // Set up the SVG canvas
  const svg = d3.select("#histogram")
   .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", backgroundColor);


    // Set up the inner chart area. Why? Because we want to leave space for the axes and labels, so we create a group element that is translated by the margins. This way, the inner chart area will be positioned correctly within the SVG canvas, allowing us to draw the histogram bars and axes without overlapping with the margins.
    const innerChart = svg.append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);


    const bins = binGenerator(data);

    console.log("Bins:", bins);


    // Get the minimum and maximum energy consumption values from the bins. The minimum energy consumption is the lower bound of the first bin (bins[0].x0), and the maximum energy consumption is the upper bound of the last bin (bins[bins.length - 1].x1). These values will be used to set the domain of the x-axis scale.
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;

// Get the maximum length of the bins. This value will be used to set the domain of the y-axis scale, ensuring that the tallest bar fits within the chart area.
    const binMaxLength = d3.max(bins, d => d.length);


    console.log("minEng:", minEng);
    console.log("maxEng:", maxEng);
    console.log("binMaxLength:", binMaxLength);


    // Set the domains and ranges for the x and y scales. The xScale maps energy consumption values to pixel positions along the x-axis, while the yScale maps bin lengths (counts) to pixel positions along the y-axis. The range for the xScale is set from 0 to innerWidth, and the range for the yScale is set from innerHeight to 0 (inverted because SVG coordinates start from the top-left corner).
    xScale 
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

    yScale
    .domain([0, binMaxLength])
    .range([innerHeight, 0])
    .nice(); // Optional: Make the y-axis scale "nice" for better tick values

    

// Draw the histogram bars using the data from the bins. Each bar is represented by a rectangle (rect) element, and its position and size are determined by the xScale and yScale. The width of each bar is calculated based on the difference between the upper and lower bounds of the bin, minus 1 pixel for spacing between bars. The height of each bar is determined by the count of items in the bin, mapped to pixel positions using the yScale.

 innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("class", "bar") // create a class for the bars so we can select them later for interactions
    .attr("x", d => xScale(d.x0)) // Position the bar based on the lower bound of the bin
    .attr("y", d => yScale(d.length)) // Position the bar based on the count of items in the bin
    .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1) // Set the width of the bar based on the bin width, minus 1 for spacing
    .attr("height", d => innerHeight - yScale(d.length)) // Set the height of the bar based on the count of items in the bin
    .attr("fill", barColor) // Set the fill color of the bars
    .attr("stroke", backgroundColor) // Optional: Add a black stroke to the bars for better visibility
    .attr("stroke-width", 2);

// draw the axis labels
const bottomAxis = d3.axisBottom(xScale);
const leftAxis = d3.axisLeft(yScale);

innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

innerChart
    .append("g")
    .call(leftAxis);

// axis labels in inner chart that already have margins applied above, so we can just add the labels without worrying about the margins
innerChart
.append("text")
.text("Frequency")
    .attr("x", - 50)
    .attr("y", -10)
    .attr("text-anchor", "start");


// add x-axis label
innerChart
.append("text")
.text("Energy Consumption (kWh)")
    .attr("x", innerWidth )
    .attr("y", innerHeight + 45)
    .attr("text-anchor", "end");

 // Create tooltip for scatterplot
   

    const tooltip = createTooltip(innerChart);

    // Add tooltip events to histogram bars
    handleMouseEvents(
        innerChart.selectAll(".bar"),
        tooltip,
        d => `Count: ${d.length}`
    );

  }