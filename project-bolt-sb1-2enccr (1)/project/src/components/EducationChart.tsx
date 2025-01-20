import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { earningsData, unemploymentData, povertyData } from '../data/educationData';

interface EducationChartProps {
  type: 'earnings' | 'unemployment' | 'poverty';
}

export const EducationChart: React.FC<EducationChartProps> = ({ type }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3.select(chartRef.current);
    const width = chartRef.current.clientWidth;
    const height = chartRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 60, left: 80 };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    let data: { name: string; value: number }[] = [];

    if (type === 'earnings') {
      data = Object.entries(earningsData.median_earnings_in_past_12_months.education_levels).map(([key, value]) => ({
        name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        value: value as number
      }));
    } else if (type === 'unemployment') {
      data = unemploymentData.education_data.map(d => ({
        name: d.education_level,
        value: parseFloat(d.unemployment_rate)
      }));
    } else {
      data = povertyData["Population 25 Years and Over for Whom Poverty Status is Determined by Educational Attainment Level"].map(d => ({
        name: d["Educational Level"],
        value: parseFloat(d["Estimate"])
      }));
    }

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, chartWidth])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([chartHeight, 0]);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5)
        .tickFormat(d => type === 'earnings' ? `$${d/1000}k` : `${d}%`));

    // Add bars
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.name) as number)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => chartHeight - y(d.value))
      .attr('fill', '#06c')
      .attr('rx', 4)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#0080ff');

        g.append('text')
          .attr('class', 'value-label')
          .attr('x', (x(d.name) as number) + x.bandwidth() / 2)
          .attr('y', y(d.value) - 5)
          .attr('text-anchor', 'middle')
          .text(type === 'earnings' ? `$${d.value.toLocaleString()}` : `${d.value}%`);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#06c');
        
        g.selectAll('.value-label').remove();
      });

  }, [type]);

  return (
    <svg
      ref={chartRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
};