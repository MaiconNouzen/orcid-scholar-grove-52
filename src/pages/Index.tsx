
import React, { useEffect, useState } from 'react';
import ResearcherProfile from '../components/ResearcherProfile';
import { mockResearcherData } from '../data/mockData';
import { Researcher } from '../types';

const Index = () => {
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch the current user's profile data from an API
    // For now, we'll use our mock data
    setLoading(true);
    setTimeout(() => {
      setResearcher(mockResearcherData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-6 flex justify-center items-center">
        <p className="text-lg text-gray-600">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      {researcher && (
        <>
          <ResearcherProfile researcher={researcher} showFullProfile={true} />
        </>
      )}
    </div>
  );
};

export default Index;
