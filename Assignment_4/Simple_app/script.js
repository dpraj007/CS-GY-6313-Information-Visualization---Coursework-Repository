// Load the data from JSON file
d3.json('median_earnings_data.json').then(function(data) {
    const earningsData = data.median_earnings_in_past_12_months.education_levels;
    const educationLevels = Object.keys(earningsData);
  
    let previousEarnings = 0;
  
    // Set up SVG dimensions
    const svg = d3.select('#chart');
    const width = parseFloat(svg.style('width'));
    const height = parseFloat(svg.style('height'));
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  
    // Create scales
    const xScale = d3.scaleBand()
      .domain(['Earnings'])
      .range([margin.left, width - margin.right])
      .padding(0.4);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(Object.values(earningsData)) * 1.1])
      .range([height - margin.bottom, margin.top]);
  
    // Add axes
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(''));
  
    const yAxis = svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));
  
    // Initialize bar (empty)
    const bar = svg.append('rect')
      .attr('x', xScale('Earnings'))
      .attr('width', xScale.bandwidth())
      .attr('y', yScale(0))
      .attr('height', height - margin.bottom - yScale(0))
      .attr('fill', '#69b3a2');
  
    // Event listeners for education levels
    d3.selectAll('#education-levels li')
      .on('mouseover', function() {
        const levelKey = d3.select(this).attr('data-level');
        const currentEarnings = earningsData[levelKey];
  
        // Update bar
        bar.transition()
          .duration(500)
          .attr('y', yScale(currentEarnings))
          .attr('height', height - margin.bottom - yScale(currentEarnings));
  
        // Update y-axis if necessary
        if (currentEarnings > yScale.domain()[1]) {
          yScale.domain([0, currentEarnings * 1.1]);
          yAxis.transition().duration(500).call(d3.axisLeft(yScale));
        }
  
        // Update info box
        d3.select('#current-level').text(formatEducationLevel(levelKey));
        d3.select('#earnings-display').text(`Median Earnings: $${formatNumber(currentEarnings)}`);
  
        const difference = previousEarnings ? currentEarnings - previousEarnings : 0;
        d3.select('#difference-display').text(`Difference: $${formatNumber(difference)}`);
  
        // Update previous earnings
        previousEarnings = currentEarnings;
      })
      .on('mouseout', function() {
        // Optionally reset the bar or keep it displayed
      });
  
    // Helper functions
    function formatEducationLevel(levelKey) {
      const levelNames = {
        'less_than_high_school_graduate': 'Less than High School Graduate',
        'high_school_graduate_includes_equivalency': 'High School Graduate',
        'some_college_or_associates_degree': "Some College or Associate's Degree",
        'bachelors_degree': "Bachelor's Degree",
        'graduate_or_professional_degree': 'Graduate or Professional Degree'
      };
      return levelNames[levelKey];
    }
  
    function formatNumber(value) {
      return value.toLocaleString();
    }
  });
  


// Existing code for the first visualization remains unchanged

/***** First Visualization Code *****/

// Load the data from JSON file for median earnings
d3.json('median_earnings_data.json').then(function(data) {
  // Existing code for the first visualization
  // ...
});

/***** Second Visualization Code *****/

// Load the data from unemployment_data.json
d3.json('unemployment_data.json').then(function(data) {
  const educationData = data.find(d => d.education_data).education_data;

  // Process the data into a usable format
  const unemploymentData = {};
  educationData.forEach(item => {
    const level = item.education_level;
    const unemploymentRate = parseFloat(item.unemployment_rate.replace('%', ''));
    unemploymentData[level] = unemploymentRate;
  });

  let previousUnemploymentRate = 0;

  // Set up SVG dimensions for the unemployment chart
  const svg2 = d3.select('#unemployment-chart');
  const width2 = parseFloat(svg2.style('width'));
  const height2 = parseFloat(svg2.style('height'));
  const margin2 = { top: 20, right: 20, bottom: 30, left: 50 };

  // Create scales
  const xScale2 = d3.scaleBand()
    .domain(['Unemployment Rate'])
    .range([margin2.left, width2 - margin2.right])
    .padding(0.4);

  const yScale2 = d3.scaleLinear()
    .domain([0, d3.max(Object.values(unemploymentData)) * 1.1])
    .range([height2 - margin2.bottom, margin2.top]);

  // Add axes
  svg2.append('g')
    .attr('transform', `translate(0, ${height2 - margin2.bottom})`)
    .call(d3.axisBottom(xScale2).tickFormat(''));

  const yAxis2 = svg2.append('g')
    .attr('transform', `translate(${margin2.left}, 0)`)
    .call(d3.axisLeft(yScale2).tickFormat(d => d + '%'));

  // Initialize bar (empty)
  const bar2 = svg2.append('rect')
    .attr('x', xScale2('Unemployment Rate'))
    .attr('width', xScale2.bandwidth())
    .attr('y', yScale2(0))
    .attr('height', height2 - margin2.bottom - yScale2(0))
    .attr('fill', '#ff7f0e');

  // Event listeners for education levels
  d3.selectAll('#unemployment-education-levels li')
    .on('mouseover', function() {
      const levelKey = d3.select(this).attr('data-level');
      const currentUnemploymentRate = unemploymentData[levelKey];

      // Update bar
      bar2.transition()
        .duration(500)
        .attr('y', yScale2(currentUnemploymentRate))
        .attr('height', height2 - margin2.bottom - yScale2(currentUnemploymentRate));

      // Update y-axis if necessary
      if (currentUnemploymentRate > yScale2.domain()[1]) {
        yScale2.domain([0, currentUnemploymentRate * 1.1]);
        yAxis2.transition().duration(500).call(d3.axisLeft(yScale2).tickFormat(d => d + '%'));
      }

      // Update info box
      d3.select('#current-unemployment-level').text(levelKey);
      d3.select('#unemployment-display').text(`Unemployment Rate: ${currentUnemploymentRate}%`);

      const difference = previousUnemploymentRate ? (currentUnemploymentRate - previousUnemploymentRate).toFixed(1) : 0;
      d3.select('#unemployment-difference-display').text(`Difference: ${difference}%`);

      // Update previous unemployment rate
      previousUnemploymentRate = currentUnemploymentRate;
    })
    .on('mouseout', function() {
      // Optionally reset the bar or keep it displayed
    });
});


// Existing code for the first and second visualizations remains unchanged

/***** Third Visualization Code *****/

// Load the data from poverty_data.json
d3.json('poverty_data.json').then(function(data) {
  const povertyDataArray = data["Population 25 Years and Over for Whom Poverty Status is Determined by Educational Attainment Level"];

  // Process the data into a usable format
  const povertyData = {};
  povertyDataArray.forEach(item => {
    const level = item["Educational Level"];
    const estimate = parseFloat(item["Estimate"].replace('%', ''));
    povertyData[level] = estimate;
  });

  let previousPovertyRate = 0;

  // Set up SVG dimensions for the poverty chart
  const svg3 = d3.select('#poverty-chart');
  const width3 = parseFloat(svg3.style('width'));
  const height3 = parseFloat(svg3.style('height'));
  const margin3 = { top: 20, right: 20, bottom: 30, left: 50 };

  // Create scales
  const xScale3 = d3.scaleBand()
    .domain(['Poverty Rate'])
    .range([margin3.left, width3 - margin3.right])
    .padding(0.4);

  const yScale3 = d3.scaleLinear()
    .domain([0, d3.max(Object.values(povertyData)) * 1.1])
    .range([height3 - margin3.bottom, margin3.top]);

  // Add axes
  svg3.append('g')
    .attr('transform', `translate(0, ${height3 - margin3.bottom})`)
    .call(d3.axisBottom(xScale3).tickFormat(''));

  const yAxis3 = svg3.append('g')
    .attr('transform', `translate(${margin3.left}, 0)`)
    .call(d3.axisLeft(yScale3).tickFormat(d => d + '%'));

  // Initialize bar (empty)
  const bar3 = svg3.append('rect')
    .attr('x', xScale3('Poverty Rate'))
    .attr('width', xScale3.bandwidth())
    .attr('y', yScale3(0))
    .attr('height', height3 - margin3.bottom - yScale3(0))
    .attr('fill', '#2ca02c'); // Green color

  // Event listeners for education levels
  d3.selectAll('#poverty-education-levels li')
    .on('mouseover', function() {
      const levelKey = d3.select(this).attr('data-level');
      const currentPovertyRate = povertyData[levelKey];

      // Update bar
      bar3.transition()
        .duration(500)
        .attr('y', yScale3(currentPovertyRate))
        .attr('height', height3 - margin3.bottom - yScale3(currentPovertyRate));

      // Update y-axis if necessary
      if (currentPovertyRate > yScale3.domain()[1]) {
        yScale3.domain([0, currentPovertyRate * 1.1]);
        yAxis3.transition().duration(500).call(d3.axisLeft(yScale3).tickFormat(d => d + '%'));
      }

      // Update info box
      d3.select('#current-poverty-level').text(levelKey);
      d3.select('#poverty-display').text(`Poverty Rate: ${currentPovertyRate}%`);

      const difference = previousPovertyRate ? (currentPovertyRate - previousPovertyRate).toFixed(1) : 0;
      d3.select('#poverty-difference-display').text(`Difference: ${difference}%`);

      // Update previous poverty rate
      previousPovertyRate = currentPovertyRate;
    })
    .on('mouseout', function() {
      // Optionally reset the bar or keep it displayed
    });
});

