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



    const updateHistogram = () => {
        // Filter the data based on the active filter
            const selectedFilter = filters_screen.find(filter => filter.isActive);

const updatedData = selectedFilter.id === "All"
    ? data
    : data.filter(tv => tv.screenTech === selectedFilter.id);


       const updatedBins = binGenerator(updatedData);

       d3.selectAll("#histogram .bar")
       .data(updatedBins)
       .transition()
       .duration(500)
       .ease(d3.easeCubicInOut )
       .attr("y", d => yScale(d.length))
       .attr("height", d => innerHeight - yScale(d.length));
    }



    
}






