// script.js

// Define the color mapping for G20 countries and ROW
// const countryColors = {
//     "RUS": "#1f77b4",
//     "CHN": "#ff7f0e",
//     "USA": "#2ca02c",
//     "CAN": "#d62728",
//     "BRA": "#9467bd",
//     "AUS": "#8c564b",
//     "IND": "#e377c2",
//     "ARG": "#7f7f7f",
//     "SAU": "#bcbd22",
//     "MEX": "#17becf",
//     "IDN": "#aec7e8",
//     "ZAF": "#ffbb78",
//     "TUR": "#98df8a",
//     "FRA": "#ff9896",
//     "DEU": "#c5b0d5",
//     "JPN": "#c49c94",
//     "ITA": "#f7b6d2",
//     "GBR": "#c7c7c7",
//     "KOR": "#dbdb8d",
//     "ROW": "#7f7f7f" // Added ROW color
// };




const countryColors = {
    "RUS": "#4D5360", // Charcoal Grey
    "CHN": "#FF6B6B", // Pastel Red
    "USA": "#4ECDC4", // Turquoise
    "CAN": "#C7F464", // Lime Green
    "BRA": "#556B2F", // Dark Olive Green
    "AUS": "#FF9F1C", // Bright Orange
    "IND": "#FFD93D", // Lemon Chiffon
    "ARG": "#6C3483", // Dark Purple
    "SAU": "#E6B0AA", // Tan
    "MEX": "#2E86C1", // Denim Blue
    "IDN": "#F6D8CE", // Peach
    "ZAF": "#ED4C67", // Bright Red
    "TUR": "#B33771", // Raspberry
    "FRA": "#F79F1F", // Pumpkin Orange
    "DEU": "#A3CB38", // Lime Green
    "JPN": "#EE5A24", // Burnt Orange
    "ITA": "#009B77", // Pine Green
    "GBR": "#0652DD", // Royal Blue
    "KOR": "#9980FA", // Lavender
    "ROW": "#2F3542"  // Dark Slate Grey
};










// Load the data from data.json
d3.json('data.json').then(function(dataset) {
    const topics = dataset.map(d => d.topic);
    
    // Populate the dropdown with topics
    const select = d3.select('#topic-select');
    select.selectAll('option')
        .data(topics)
        .enter()
        .append('option')
        .attr('value', d => d)
        .text(d => d);

    // Initial rendering with the first topic
    renderTreemap(dataset[0]);

    // Update treemap on topic change
    select.on('change', function() {
        const selectedTopic = d3.select(this).property('value');
        const topicData = dataset.find(d => d.topic === selectedTopic);
        renderTreemap(topicData);
    });

    // Function to render the treemap
    function renderTreemap(topicData) {
        // Remove existing treemap
        d3.select('#treemap').selectAll('*').remove();

        const data = topicData.data;

        // Calculate the sum of G20 contributions
        const sumG20 = Object.values(data).reduce((acc, val) => acc + val, 0);

        // Calculate Rest of the World (ROW)
        const rowValue = +(100 - sumG20).toFixed(2); // Ensuring two decimal places

        // Add ROW to the data
        const extendedData = { ...data, "ROW": rowValue };

        // Prepare data in hierarchical format for D3 treemap
        const root = d3.hierarchy({children: Object.entries(extendedData).map(([key, value]) => ({key, value}))})
            .sum(d => d.value);

        // Create treemap layout
        d3.treemap()
            .size([document.getElementById('treemap').clientWidth, document.getElementById('treemap').clientHeight])
            .padding(1)
            (root);

        // Create tooltip
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip');

        // Append nodes
        d3.select('#treemap')
            .selectAll('div')
            .data(root.leaves())
            .enter()
            .append('div')
            .attr('class', 'node')
            .style('left', d => `${d.x0}px`)
            .style('top', d => `${d.y0}px`)
            .style('width', d => `${d.x1 - d.x0}px`)
            .style('height', d => `${d.y1 - d.y0}px`)
            .style('background-color', d => countryColors[d.data.key] || '#ccc')
            .style('transition', 'all 0.5s')
            .on('mouseover', function(event, d) {
                tooltip.style('opacity', 1)
                       .html(`<strong>${getCountryName(d.data.key)}</strong><br>${topicData.topic}: ${d.data.value}%`)
                       .style('left', (event.pageX + 10) + 'px')
                       .style('top', (event.pageY + 10) + 'px');
            })
            .on('mousemove', function(event) {
                tooltip.style('left', (event.pageX + 10) + 'px')
                       .style('top', (event.pageY + 10) + 'px');
            })
            .on('mouseout', function() {
                tooltip.style('opacity', 0);
            })
            .text(d => `${getCountryCode(d.data.key)}: ${d.data.value}%`);
    }

    // Utility function to get full country name
    const countryNames = {
        "RUS": "Russia",
        "CHN": "China",
        "USA": "United States",
        "CAN": "Canada",
        "BRA": "Brazil",
        "AUS": "Australia",
        "IND": "India",
        "ARG": "Argentina",
        "SAU": "Saudi Arabia",
        "MEX": "Mexico",
        "IDN": "Indonesia",
        "ZAF": "South Africa",
        "TUR": "Turkey",
        "FRA": "France",
        "DEU": "Germany",
        "JPN": "Japan",
        "ITA": "Italy",
        "GBR": "United Kingdom",
        "KOR": "South Korea",
        "ROW": "Rest of the World" // Added ROW name
    };

    function getCountryName(code) {
        return countryNames[code] || code;
    }

    function getCountryCode(code) {
        return code;
    }

    // Handle window resize for responsiveness
    window.addEventListener('resize', () => {
        const selectedTopic = d3.select('#topic-select').property('value');
        const topicData = dataset.find(d => d.topic === selectedTopic);
        renderTreemap(topicData);
    });
}).catch(function(error){
    console.error('Error loading the data:', error);
});
