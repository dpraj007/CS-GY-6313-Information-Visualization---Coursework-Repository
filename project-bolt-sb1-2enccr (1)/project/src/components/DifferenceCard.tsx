import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface DifferenceCardProps {
  type: 'earnings' | 'unemployment' | 'poverty';
  currentValue: number;
  previousValue: number | null;
}

export const DifferenceCard: React.FC<DifferenceCardProps> = ({ type, currentValue, previousValue }) => {
  if (previousValue === null) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-500">Select an education level to compare</p>
      </div>
    );
  }

  const difference = currentValue - previousValue;
  const percentChange = ((difference / previousValue) * 100).toFixed(1);
  const isPositive = difference > 0;
  const isNeutral = difference === 0;

  const formatValue = (value: number) => {
    return type === 'earnings' 
      ? `$${Math.abs(value).toLocaleString()}`
      : `${Math.abs(value).toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">Difference from previous</span>
        {isNeutral ? (
          <Minus className="w-5 h-5 text-gray-400" />
        ) : isPositive ? (
          <ArrowUpRight className="w-5 h-5 text-green-500" />
        ) : (
          <ArrowDownRight className="w-5 h-5 text-red-500" />
        )}
      </div>
      <p className={`text-lg font-semibold ${
        isNeutral ? 'text-gray-600' : isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        {isPositive ? '+' : ''}{formatValue(difference)}
      </p>
      <p className="text-sm text-gray-500">
        {isPositive ? '+' : ''}{percentChange}% change
      </p>
    </div>
  );
};