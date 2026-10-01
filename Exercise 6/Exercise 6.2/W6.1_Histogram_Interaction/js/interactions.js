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
   

    // Add click event listener to the filters.
    // When a filter is clicked, update the isActive property of the filters_screen array
    if(!d.isActive)
    {
        filters_screen.forEach(filter => {
            filter.isActive = d.id === filter.id ? true : false;

        });

        d3.selectAll("#filters_screen .filter")
        .classed("active", filter => filter.id === d.id ? true : false);
    }
 });


    const updateHistogram = () => {
        // Filter the data based on the active filter
       const updatedData = filter.id === "All" ? data : data.filter(tv => tv.screenTech === filter.id);

       const updatedBins = binGenerator(updatedData);

       d3.selectAll("#histogram rect")
       .data(updatedBins)
       .transition()
       .duration(500)
       .ease(d3.easeCubicInOut )
       .attr("y", d => yScale(d.length))
       .attr("height", d => innerHeight - yScale(d.length));
    }



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
    });

}