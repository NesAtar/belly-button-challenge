
//1. Use the D3 library to read in samples.json from the URL 

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// 2. Create a horizontal bar chart with dropdown menu to display the top 10 OTUs found in that individual
    //Use sample_values as the values for the bar chart.
    //Use otu_ids as the labels for the bar chart.
    //Use otu_labels as the hovertext for the chart.

// Function to fetch and display sample metadata
function displayMetadata(sample) {
    d3.json(url).then(data => {
        // Find the metadata for the selected sampleId
        let metadata = data.metadata
        //.find(metadata => metadata.id == sampleId);
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample)
        let result = resultArray[0]

        let PANEL = d3.select('#sample-metadata');
        PANEL.html("");

        for (key in result){
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };

        // Select the metadata div
        //let metadataDiv = d3.select("#sample-metadata");
        // Clear previous content
        //metadataDiv.html("");
        
        // Append metadata key-value pairs as paragraphs
        //Object.entries(metadata).forEach(([key, value]) => {
          //  metadataDiv.append("p").text(`${key}: ${value}`);
        //});
    //}).catch(error => {
      //  console.error("Error fetching metadata:", error);
    //
    });
}

function createbargraph(sampleId){
    d3.json(url).then(data => {
        console.log("sampleId", sampleId); 
        let samples = data.samples;
        let filteredsample = samples.filter(sample => sample.id === sampleId);
        let newsample = filteredsample[0];
        console.log("newsample=",newsample);
        let otu = newsample.otu_ids;
        console.log("otu",otu)
        let OTUids = otu.slice(0, 10).map(otuID =>`OTU ${otuID}`).reverse();
        let otulabels = newsample.otu_labels.slice(0, 10).reverse();
        let samplevalues = newsample.sample_values.slice(0, 10).reverse();
        let chartdata = {
            x: samplevalues,
            y: OTUids,
            type: 'bar',
            text: otulabels,
            orientation: 'h'
        };
        let chartlayout = { 
            title: "Top 10 OTUs"
        }
        Plotly.newPlot('bar',[chartdata],chartlayout);
    });
}
function createdashboard (){
    let dropdown = d3.select ('#selDataset');
    d3.json(url).then(data => {
        let samplenames = data.names;
        for(let i = 0; i < samplenames.length; i++){
            let sampleId = samplenames[i];
            dropdown.append ('option').text(sampleId).property('value', sampleId);
        };
        let chosenid = dropdown.property('value');
        createbargraph (chosenid);
        createBubbleChart (chosenid);
    });
}
function optionChanged (value){
    createbargraph (value);
    createBubbleChart (value);
}
createdashboard();


//3. Create a bubble chart that displays each sample.
    //Use otu_ids for the x values.
    //Use sample_values for the y values.
    //Use sample_values for the marker size.
    //Use otu_ids for the marker colors.
    //Use otu_labels for the text values.

function createBubbleChart(sampleId) {
    d3.json(url).then((data)=> {
    console.log("data", data); 

    let samples = data.samples;
    console.log("samples", samples);
    let filteredsample = samples.filter(sample => sample.id === sampleId);
    console.log("filteredsample", filteredsample);
    let newsample = filteredsample[0];
    let extractid = newsample.otu_ids;
    console.log("extractid", extractid);
    let collection = newsample.sample_values;
    let pull = newsample.otu_labels;

    let trace = {
        x: extractid,
        y: collection,
        mode: 'markers',
        marker: {
            size: collection,
            color: extractid,
            colorscale: 'Viridis'
        },
        text: pull
    };
    let layout = {
        title: 'Bubble Chart',
        xaxis: {title: 'OTU IDs' },
        yaxis: {title: 'Sample Values'}
    };
    let bubbleData = [trace];
    Plotly.newPlot('bubble', bubbleData, layout);
}
    )
}


//4. Display the sample metadata, i.e., an individual's demographic information.

// // Function to fetch and display sample metadata
// function displayMetadata(sampleId) {
//     d3.json(url).then(data => {
//         // Find the metadata for the selected sampleId
//         let metadata = data.metadata.find(metadata => metadata.id == sampleId);
        
//         // Select the metadata div
//         let metadataDiv = d3.select("#sample-metadata");
        
//         // Clear previous content
//         metadataDiv.html("");
        
//         // Append metadata key-value pairs as paragraphs
//         Object.entries(metadata).forEach(([key, value]) => {
//             metadataDiv.append("p").text(`${key}: ${value}`);
//         });
//     }).catch(error => {
//         console.error("Error fetching metadata:", error);
//     });
// }

// Call the displayMetadata function when the dropdown selection changes
function init() {
    let selector = d3.select("#selDataset");
    d3.json(url).then(data =>{
    let sampleNames = data.names 
    for (let i = 0 ; i< sampleNames.length; i++){
        selector.append("option").text(sampleNames[i]).property("value",sampleNames[i])
    };
    let firstSample = sampleNames[0];
    createbargraph(firstSample);
    createBubbleChart(firstSample);
    displayMetadata(firstSample); 
    });
};

function optionChanged(newSample){
    displayMetadata(newSample);
    createbargraph(newSample);
    createBubbleChart(newSample)
}
init();


//5. Display each key-value pair from the metadata JSON object somewhere on the page.

// // Function to fetch and display sample metadata
// function displayMetadata(sampleId) {
//     d3.json(url).then(data => {
//         // Find the metadata for the selected sampleId
//         let metadata = data.metadata.find(metadata => metadata.id == sampleId);
        
//         // Select the container where you want to display the metadata
//         let metadataContainer = d3.select("#metadata-container");
        
//         // Clear previous content
//         metadataContainer.html("");
        
//         // Append metadata key-value pairs as list items
//         Object.entries(metadata).forEach(([key, value]) => {
//             metadataContainer.append("p").text(`${key}: ${value}`);
//         });
//     }).catch(error => {
//         console.error("Error fetching metadata:", error);
//     });
// }
// // Call the displayMetadata function when the dropdown selection changes
// function optionChanged(value) {
//     createbargraph(value);
//     createBubbleChart(value);
//     displayMetadata(value); 
// }

//6. Update all the plots when a new sample is selected.

//7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to 
// your deployment and your GitHub repo. Ensure that your repository has regular commits and a 
// thorough README.md file


