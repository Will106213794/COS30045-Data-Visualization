// Function to populate the filter buttons for screen technology and size
const populateFilters = (data) => {
   
// Define the filters for screen technology
    d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (e, d) => {
        // Handle filter click event
        console.log("CLicked filter:", e);
        console.log("CLicked filter data:", d);


        filters_screen.forEach(filter => {
            filter.isActive = d.id === filter.id;
        });

        d3.selectAll("#filters_screen .filter")
            .classed("active", filter => filter.id === d.id);

        updateHistogram();
   
 });



 // Define the filters for screen technology
    d3.select("#filters_size")
    .selectAll(".filter")
    .data(filters_size)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (e, d) => {
        // Handle filter click event
        console.log("CLicked filter:", e);
        console.log("CLicked filter data:", d);

       
        filters_size.forEach(filter => {
            filter.isActive = d.id === filter.id;
        });

        d3.selectAll("#filters_size .filter")
            .classed("active", filter => filter.id === d.id);

        updateHistogram();
    
    });


// Function to update the histogram based on the selected filter button clicked
const updateHistogram = () => {
        // Finds the active filter for screen technology and size from the filters_screen and filters_size arrays, respectively. The find method is used to locate the filter object where isActive is true, indicating that it is the currently selected filter.
        // called filters_screen from shared-constants.js to filter the data based on the selected screen technology
            const selectedFilter = filters_screen.find(filter => filter.isActive);


              const selectedFilter2 = filters_size.find(filter => filter.isActive);

           
          
    let updatedData = data;

     // Filter by screen technology if a specific filter is selected (not "All")
    if (selectedFilter.id !== "All") {
        updatedData = updatedData.filter(tv => tv.screenTech === selectedFilter.id);
    }

    // Filter by screen size if a specific filter is selected (not "All Sizes")
    if (selectedFilter2.id !== "All Sizes") {
        updatedData = updatedData.filter(tv => tv.screenSize === selectedFilter2.id);
    }


        // Update the histogram with the filtered data
       const updatedBins = binGenerator(updatedData);

       // Update the yScale domain based on the new bin lengths
       d3.selectAll("#histogram .bar")
       .data(updatedBins)
       .transition()
       .duration(500)
       .ease(d3.easeCubicInOut )
       .attr("y", d => yScale(d.length))
       .attr("height", d => innerHeight - yScale(d.length));
    }



    
}


// Function to create a tooltip for the chart
// called from the histogram and scatterplot functions to create a tooltip for both types of charts before handling mouse events for the tooltip display
const createTooltip = (chart) => {

const tooltip = chart
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0);


    tooltip
    .append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.8 );



    tooltip
    .append("text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 +2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white"  )
    .attr("font-weight", 900);

    return tooltip;

}


// Function to handle mouse events for tooltip display
// called from the histogram and scatterplot functions to handle mouse events for both types of charts
const handleMouseEvents = (selection, tooltip, getText) => {
   

    selection
    .on("mouseover", (e, d) => {

    console.log("Mouse entered circle:", d);

// show information about the circle in the tooltip
    tooltip
    .select("text")
    .text(getText(d));

// either get the cx and cy attributes for circles or the x and y attributes for bars
    const cx = e.target.getAttribute("cx") || e.target.getAttribute("x");
    const cy = e.target.getAttribute("cy") || e.target.getAttribute("y");

    tooltip
    .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5*tooltipHeight})`)
    .transition()
    .duration(200)
    .style("opacity", 1);


    })

    .on("mouseleave", (e, d) => {


console.log("Mouse left circle:", d);


tooltip
.style("opacity", 0)
.attr("transform", `translate(0, 500)`);

    });




}



