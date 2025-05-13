
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import PublicationSection from './PublicationSection';
import ProjectSection from './ProjectSection';
import PublicationChart from './PublicationChart';
import ProjectPublicationChart from './ProjectPublicationChart';
import { mockResearcherData, mockResearchers } from '../data/mockData';
import { Researcher } from '../types';

interface ResearcherProfileProps {
  researcherId?: string;
}

const ResearcherProfile = ({ researcherId }: ResearcherProfileProps) => {
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState("publications");

  // This is where we would fetch data from ORCID API in a real implementation
  useEffect(() => {
    const fetchOrcidData = async () => {
      setLoading(true);
      // In a real implementation, we'd call the ORCID API here
      // const response = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/record`, {
      //   headers: { 'Accept': 'application/json' }
      // });
      // const data = await response.json();
      
      // For now, we use our mock data
      setTimeout(() => {
        if (researcherId && researcherId !== 'current') {
          const found = mockResearchers.find(r => r.orcidId === researcherId);
          setResearcher(found || mockResearcherData as Researcher);
        } else {
          setResearcher(mockResearcherData as Researcher);
        }
        setLoading(false);
      }, 500);
    };

    fetchOrcidData();
  }, [researcherId]);

  if (loading || !researcher) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando perfil do pesquisador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ProfileHeader researcher={researcher} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <PublicationSection publications={researcher.publications} />
          <ProjectSection projects={researcher.projects} publications={researcher.publications} />
        </div>
        
        <div className="md:col-span-1">
          <Card className="p-4 mb-6">
            <h3 className="section-title mb-4">Evolução de Publicações</h3>
            
            <Tabs value={activeChartTab} onValueChange={setActiveChartTab}>
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="publications" className="flex-1">Por Ano</TabsTrigger>
                <TabsTrigger value="projects" className="flex-1">Por Projeto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="publications">
                <PublicationChart publications={researcher.publications} />
              </TabsContent>
              
              <TabsContent value="projects">
                <ProjectPublicationChart publications={researcher.publications} projects={researcher.projects} />
              </TabsContent>
            </Tabs>
          </Card>
          
          <Card className="p-4">
            <h3 className="section-title mb-4">Links Acadêmicos</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-blue-600 hover:text-blue-800">
                <Link className="w-4 h-4 mr-2" />
                <a href={researcher.institutionalPage} target="_blank" rel="noopener noreferrer">
                  Página Institucional
                </a>
              </li>
              <li className="flex items-center text-blue-600 hover:text-blue-800">
                <Link className="w-4 h-4 mr-2" />
                <a href={`https://orcid.org/${researcher.orcidId}`} target="_blank" rel="noopener noreferrer">
                  Perfil ORCID
                </a>
              </li>
              {researcher.externalLinks.map((link, index) => (
                <li key={index} className="flex items-center text-blue-600 hover:text-blue-800">
                  <Link className="w-4 h-4 mr-2" />
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResearcherProfile;
