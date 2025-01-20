import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ icon: Icon, title, value, subtitle }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <Icon className="w-8 h-8 text-[#06c]" />
      <span className="text-sm text-gray-500">{title}</span>
    </div>
    <h3 className="text-3xl font-semibold">{value}</h3>
    <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
  </div>
);