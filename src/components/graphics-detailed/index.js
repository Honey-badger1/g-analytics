import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import './graph-det.css';


function BarChartDetailed({data}){
   const draw=()=>{
    var margin = {top: 25, right: 20, bottom: 20, left: 140},
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

var x = d3.scaleLinear()
          .range([0, width]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".second").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  // format the data
  data.forEach(function(d) {
    d.series = +d.series;
  });

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.series; })])
  y.domain(data.map(function(d) { return d.label; }));
  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bars")
      .data(data)
    .enter().append("rect")
      .attr("class", "bars")
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {return x(d.series); } )
      .attr("y", function(d) { return y(d.label); })
      .attr("height", y.bandwidth());

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));


  
   }

    return (
         <div draw={draw()}></div>
     
        
    )

}

export default BarChartDetailed;