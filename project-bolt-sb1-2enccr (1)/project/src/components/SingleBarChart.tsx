import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SingleBarChartProps {
  type: 'earnings' | 'unemployment' | 'poverty';
  value: number;
  previousValue: number | null;
  maxValue: number;
}

export const SingleBarChart: React.FC<SingleBarChartProps> = ({ type, value, maxValue }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3.select(chartRef.current);
    const width = chartRef.current.clientWidth;
    const height = chartRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear()
      .domain([0, maxValue])
      .range([chartHeight, 0]);

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5)
        .tickFormat(d => type === 'earnings' ? `$${d/1000}k` : `${d}%`));

    // Add bar
    const bar = g.append('rect')
      .attr('x', chartWidth / 4)
      .attr('width', chartWidth / 2)
      .attr('y', y(value))
      .attr('height', 0)
      .attr('fill', '#06c')
      .attr('rx', 6);

    // Animate bar
    bar.transition()
      .duration(750)
      .attr('y', y(value))
      .attr('height', chartHeight - y(value));

    // Add value label
    g.append('text')
      .attr('class', 'value-label')
      .attr('x', chartWidth / 2)
      .attr('y', y(value) - 10)
      .attr('text-anchor', 'middle')
      .text(type === 'earnings' ? `$${value.toLocaleString()}` : `${value}%`);

  }, [type, value, maxValue]);

  return (
    <svg
      ref={chartRef}
      className="w-full h-full"
      style={{ minHeight: '300px' }}
    />
  );
};