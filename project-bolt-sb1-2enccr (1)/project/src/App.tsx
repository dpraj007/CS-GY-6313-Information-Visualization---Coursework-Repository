import React, { useState } from 'react';
import { BarChart3, TrendingDown, DollarSign } from 'lucide-react';
import { Header } from './components/Header';
import { MetricsCard } from './components/MetricsCard';
import { VisualizationCard } from './components/VisualizationCard';
import { earningsData, unemploymentData, povertyData } from './data/educationData';

const educationLevels = [
  'Less than High School',
  'High School Graduate',
  "Some College/Associate's",
  "Bachelor's Degree",
  'Graduate Degree'
];

const getDataForLevel = (level: string) => {
  const earningsMap: { [key: string]: number } = {
    'Less than High School': earningsData.median_earnings_in_past_12_months.education_levels.less_than_high_school_graduate,
    'High School Graduate': earningsData.median_earnings_in_past_12_months.education_levels.high_school_graduate_includes_equivalency,
    "Some College/Associate's": earningsData.median_earnings_in_past_12_months.education_levels.some_college_or_associates_degree,
    "Bachelor's Degree": earningsData.median_earnings_in_past_12_months.education_levels.bachelors_degree,
    'Graduate Degree': earningsData.median_earnings_in_past_12_months.education_levels.graduate_or_professional_degree,
  };

  const unemploymentMap: { [key: string]: number } = {
    'Less than High School': 6.5,
    'High School Graduate': 4.8,
    "Some College/Associate's": 3.6,
    "Bachelor's Degree": 2.3,
    'Graduate Degree': 2.3,
  };

  const povertyMap: { [key: string]: number } = {
    'Less than High School': 24.3,
    'High School Graduate': 14.6,
    "Some College/Associate's": 10.0,
    "Bachelor's Degree": 4.6,
    'Graduate Degree': 4.6,
  };

  return {
    earnings: earningsMap[level],
    unemployment: unemploymentMap[level],
    poverty: povertyMap[level],
  };
};

function App() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [previousLevel, setPreviousLevel] = useState<string | null>(null);

  const handleLevelClick = (level: string) => {
    setPreviousLevel(selectedLevel);
    setSelectedLevel(level);
  };

  const currentData = selectedLevel ? getDataForLevel(selectedLevel) : null;
  const previousData = previousLevel ? getDataForLevel(previousLevel) : null;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricsCard
            icon={DollarSign}
            title="Median Earnings"
            value="$86,524"
            subtitle="Graduate Degree Holders"
          />
          <MetricsCard
            icon={TrendingDown}
            title="Unemployment Rate"
            value="2.3%"
            subtitle="Bachelor's or Higher"
          />
          <MetricsCard
            icon={BarChart3}
            title="Poverty Rate"
            value="4.6%"
            subtitle="Bachelor's or Higher"
          />
        </div>

        {/* Visualizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <VisualizationCard
            title="Median Earnings"
            type="earnings"
            value={currentData?.earnings ?? 0}
            previousValue={previousData?.earnings ?? null}
            maxValue={90000}
          />
          <VisualizationCard
            title="Unemployment Rate"
            type="unemployment"
            value={currentData?.unemployment ?? 0}
            previousValue={previousData?.unemployment ?? null}
            maxValue={8}
          />
          <VisualizationCard
            title="Poverty Rate"
            type="poverty"
            value={currentData?.poverty ?? 0}
            previousValue={previousData?.poverty ?? null}
            maxValue={30}
          />
        </div>

        {/* Education Levels */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Education Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {educationLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleLevelClick(level)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedLevel === level
                      ? 'bg-[#06c] text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-lg font-medium mb-2">
                {selectedLevel || 'Select an education level'}
              </p>
              <p className="text-gray-600">
                {selectedLevel
                  ? 'Click another level to compare statistics'
                  : 'Click on any education level to see detailed statistics'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;