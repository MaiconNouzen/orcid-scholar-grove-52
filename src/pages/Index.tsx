
import React from 'react';
import ResearcherProfile from '../components/ResearcherProfile';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <ResearcherProfile researcherId="current" />
    </div>
  );
};

export default Index;
