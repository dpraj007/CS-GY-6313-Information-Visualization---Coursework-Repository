import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Header = () => (
  <header className="bg-[#1d1d1f] text-white py-4">
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-8 h-8" />
          <h1 className="text-2xl font-medium">Education Analytics</h1>
        </div>
      </div>
    </div>
  </header>
);