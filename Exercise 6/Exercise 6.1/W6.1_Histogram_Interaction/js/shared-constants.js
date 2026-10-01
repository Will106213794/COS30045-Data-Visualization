
// dimension setup globally
const margins = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margins.left - margins.right;
const innerHeight = height - margins.top - margins.bottom;



// color setup globally
const barColor = "#606464";
const backgroundColor = "#fffaf0";


// axis scales

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


const binGenerator = d3.bin()
.value(d => d.energyConsumption)