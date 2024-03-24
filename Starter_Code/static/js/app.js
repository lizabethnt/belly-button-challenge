// read in json data file samples.json
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

let bbData;

// Fetch the JSON data and console log it
dataPromise.then(function(data) {
  bbData = data;
  console.log(bbData);
  // Get names 
  let names = bbData.names;
  console.log('names: ', names);

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
  // Select dropdown
  let dropdown = d3.select("#selDataset");

  //TODO: display a static table for the first sample

  // Define the optionChanged function which will update the plot based on the dropdown menu selection
  function optionChanged(passedValue) {
  // Call the updatePlotly function with the passed value
  updatePlotly(passedValue);
  }
  // Populate options
  names.forEach(name => {
    dropdown.append("option")
    .text(name)
    .attr("value", name);
  });
  // Add change handler
dropdown.on("change", function() {
  updatePlotly();
});

// Update the updatePlotly function to remove the dropdown parameter
function updatePlotly() {

  // Get selected name directly from the dropdown
  const selectedName = d3.select("#selDataset").property("value");

  // Find sample data
  const sampleData = bbData.samples.find(s => s.id === selectedName);

    // Update graph data
    let graphData = [{
      type: "bar",
      orientation: "h",
      x: sampleData.sample_values.slice(0, 10).reverse(),
      y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: sampleData.otu_labels
  }];

  // Update the chart with the new data
  // TODO: Adjust colors on chart to a broader range 
  //and change opacity to more dense
  Plotly.newPlot('bar', graphData);

  // Update the bubble chart data
  var tracebub = {
    x: sampleData.otu_ids.reverse(),
    y: sampleData.sample_values.reverse(),
    mode: 'markers',
    marker: {
      color: sampleData.otu_ids.reverse(),
      size: sampleData.sample_values.reverse()
    },
    text: sampleData.otu_labels
  };
  var layout = {
    title: 'All OTUs on this Sample',
    height: 600,
    width: 1200
  };
  var data = [tracebub];
  // Update the bubble chart
  Plotly.newPlot("bubble", data, layout);
}

  // TODO: update the metadata table 
  // according to sample chosen on the dropdown menu
});

