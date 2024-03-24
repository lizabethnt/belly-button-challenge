// read in json data file samples.json
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

let bbData;

// Fetch the JSON data and console log it
function init(){
  dataPromise.then(function(data) {
  bbData = data;
  console.log("bbData", bbData);
  // Get names 
  let names = bbData.names;

    //create a graph of one sample.  Initializes bar graph to show the first sample: 
    var sampleRow = bbData.samples[0];
    let trace = {
    type: "bar",
    orientation: "h",
    x: sampleRow.sample_values.slice(0,10).reverse(),
    y: sampleRow.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
    text: sampleRow.otu_labels
    }
    let graphData = [trace]
    Plotly.newPlot('bar', graphData);

  // create a bubble chart of the same first sample.  Initializes bubble graph to show the first sample
  var tracebub = {
    x: sampleRow.otu_ids.reverse(),
    y: sampleRow.sample_values.reverse(),
    mode: 'markers',
    marker: {
      color: sampleRow.otu_ids.reverse(),
      size: sampleRow.sample_values.reverse()
    },
    text: sampleRow.otu_labels
  };
  
  var data = [tracebub];
  
  var layout = {
    title: 'All OTUs on this Sample',
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot("bubble", data, layout);

  
  //TODO: display a static table for the first sample's metadata 
  // (edit from the sample code in the plotly documentationhttps://plotly.com/javascript/table/ )
  // metadataRow = [bbData.metadata[0].id, bbData.metadata[0].ethnicity,
                    // bbData.metadata[0].gender, bbData.metadata[0].age, bbData.metadata[0].location]
  // var data = [{
  //   type: 'table',
  //   cells: {
  //     values: metadataRow.values,
  //     align: "center",
  //     line: {color: "black", width: 1},
  //     font: {family: "Arial", size: 11, color: ["black"]}
  //   }
  // }]
  
  // Plotly.newPlot('sample-metadata', data);
  // Select dropdown
  let dropdown = d3.select("#selDataset");

  // Populate options
  names.forEach(name => {
    dropdown.append("option")
    .text(name)
    .attr("value", name);
  });

});
}

function optionChanged(sample) {
  d3.json(url).then(function(bbData) {
  // Get selected name directly from the dropdown
  const selectedName = d3.select("#selDataset").property("value");

  // get samples key
  let samples = bbData.samples
  // filter function to get data from the sample row
  let sampleData = bbData.samples.filter(s => s.id === sample);
  console.log("sampleData: ", sampleData);
  //use sampleData[0] to draw plots
  let sampleRow = sampleData[0];
  console.log("sampleRow: ", sampleRow);
      // Update graph data
    let graphData = [{
      type: "bar",
      orientation: "h",
      x: sampleRow.sample_values.slice(0, 10).reverse(),
      y: sampleRow.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: sampleRow.otu_labels
  }];
    // Update the chart with the new data
  // TODO: Adjust colors on chart to a broader range 
  //and change opacity to more dense
  Plotly.newPlot('bar', graphData);

    // Update the bubble chart data
  var tracebub = {
    x: sampleRow.otu_ids.reverse(),
    y: sampleRow.sample_values.reverse(),
    mode: 'markers',
    marker: {
      color: sampleRow.otu_ids.reverse(),
      size: sampleRow.sample_values.reverse()
    },
    text: sampleRow.otu_labels
  };
  var layout = {
    title: 'All OTUs on this Sample',
    height: 600,
    width: 1200
  };
  var data = [tracebub];
  // Update the bubble chart
  Plotly.newPlot("bubble", data, layout);

})
}

init();


