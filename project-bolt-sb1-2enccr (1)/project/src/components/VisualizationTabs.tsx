import React from 'react';

interface VisualizationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const VisualizationTabs: React.FC<VisualizationTabsProps> = ({ activeTab, onTabChange }) => (
  <div className="flex space-x-4 mb-6">
    {['earnings', 'unemployment', 'poverty'].map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeTab === tab
            ? 'bg-[#06c] text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);