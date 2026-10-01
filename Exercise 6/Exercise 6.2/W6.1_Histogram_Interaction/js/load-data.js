d3.csv("data/Ex6_TVdata.csv", d => {
  return {
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // convert screenSize to a number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // convert energyConsumption to a number
    star: +d.star // convert star rating to a number
  };
}).then(data => {

  console.log("Data:", data);
console.log("First row:", data[0]);
console.log("Keys:", Object.keys(data[0]));
   
    
    
drawHistogram(data); // Call Function which will draw in the next exercise
populateFilters(data); // Call Function which will populate the filters in the next exercise


}).catch(error => {
  console.error("Error loading the data:", error);
});


