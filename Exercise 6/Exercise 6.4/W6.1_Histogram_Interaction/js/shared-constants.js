
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



// default filters setup globally

// used in interactions.js
const filters_screen =[
    {id: "All", label: "All", isActive: true},
    { id: "LED",label: "LED",isActive: false},
     { id: "OLED",label: "OLED",isActive: false},
     { id: "LCD",label: "LCD",isActive: false}
];


const filters_size =[
    {id: "All Sizes", label: "All Sizes", isActive: true},
    { id: 24,label: "24\"",isActive: false},
     { id: 32,label: "32\"",isActive: false},
     { id: 55,label: "55\"",isActive: false},
        { id: 65,label: "65\"",isActive: false},
        { id: 98,label: "98\"",isActive: false}
];


// scatterplot dimensions and scales
let innerChartS;

const tooltipWidth = 100;
const tooltipHeight = 32;


const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);


