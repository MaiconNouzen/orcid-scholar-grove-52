
import React, { useEffect, useState } from 'react';
import ResearcherProfile from '../components/ResearcherProfile';
import PublicationSection from '../components/PublicationSection';
import ProjectSection from '../components/ProjectSection';
import { mockResearcherData } from '../data/mockData';
import { Researcher } from '../types';
import { Card } from '@/components/ui/card';
import ProfileHeader from '../components/ProfileHeader';
import PublicationChart from '../components/PublicationChart';
import ProjectPublicationChart from '../components/ProjectPublicationChart';

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
        <div className="container mx-auto px-4">
          <Card className="p-6 mb-6">
            <ProfileHeader researcher={researcher} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2">
                <Card className="p-4 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-800">Biografia</h3>
                  <p className="text-gray-700">{researcher.bio}</p>
                  
                  {researcher.researchAreas.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Áreas de Pesquisa</h4>
                      <div className="flex flex-wrap gap-2">
                        {researcher.researchAreas.map((area, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {researcher.education && researcher.education.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Formação Acadêmica</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {researcher.education.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card className="p-4">
                  <h3 className="text-xl font-bold mb-4 text-blue-800">Links Acadêmicos</h3>
                  <ul className="space-y-2">
                    {researcher.institutionalPage && (
                      <li className="flex items-center text-blue-600 hover:text-blue-800">
                        <a href={researcher.institutionalPage} target="_blank" rel="noopener noreferrer">
                          Página Institucional
                        </a>
                      </li>
                    )}
                    {researcher.orcidId && (
                      <li className="flex items-center text-blue-600 hover:text-blue-800">
                        <a href={`https://orcid.org/${researcher.orcidId}`} target="_blank" rel="noopener noreferrer">
                          Perfil ORCID
                        </a>
                      </li>
                    )}
                    {researcher.externalLinks && researcher.externalLinks.map((link, index) => (
                      <li key={index} className="flex items-center text-blue-600 hover:text-blue-800">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Publication Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <Card className="p-4">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Evolução de Publicações por Ano</h3>
                <PublicationChart publications={researcher.publications || []} />
              </Card>
              
              <Card className="p-4">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Publicações por Projeto</h3>
                <ProjectPublicationChart 
                  publications={researcher.publications || []} 
                  projects={researcher.projects || []} 
                />
              </Card>
            </div>

            {/* Publications Section */}
            <div className="mt-8">
              <PublicationSection
                publications={researcher.publications || []}
                allowEdit={true}
              />
            </div>

            {/* Projects Section */}
            <ProjectSection
              projects={researcher.projects || []}
              publications={researcher.publications || []}
              allowEdit={true}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
