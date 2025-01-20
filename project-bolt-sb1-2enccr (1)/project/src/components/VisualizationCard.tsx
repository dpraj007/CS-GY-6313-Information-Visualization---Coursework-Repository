import React from 'react';
import { SingleBarChart } from './SingleBarChart';
import { DifferenceCard } from './DifferenceCard';

interface VisualizationCardProps {
  title: string;
  type: 'earnings' | 'unemployment' | 'poverty';
  value: number;
  previousValue: number | null;
  maxValue: number;
}

export const VisualizationCard: React.FC<VisualizationCardProps> = ({
  title,
  type,
  value,
  previousValue,
  maxValue,
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="h-[300px] bg-gray-50 rounded-xl p-4 mb-4">
      <SingleBarChart
        type={type}
        value={value}
        previousValue={previousValue}
        maxValue={maxValue}
      />
    </div>
    <DifferenceCard
      type={type}
      currentValue={value}
      previousValue={previousValue}
    />
  </div>
);