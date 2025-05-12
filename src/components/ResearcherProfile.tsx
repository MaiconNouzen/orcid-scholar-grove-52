
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import PublicationSection from './PublicationSection';
import ProjectSection from './ProjectSection';
import PublicationChart from './PublicationChart';
import { mockResearcherData } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Project, Publication } from '../types';

interface Researcher {
  name: string;
  orcidId: string;
  institution: string;
  department: string;
  role: string;
  email: string;
  bio: string;
  education: string[];
  researchInterests: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    googleScholar?: string;
    github?: string;
  };
  institutionalPage: string;
  externalLinks: {
    name: string;
    url: string;
  }[];
  publications: Publication[];
  projects: Project[];
}

const ResearcherProfile = () => {
  const [researcher, setResearcher] = useState<Researcher>(mockResearcherData);
  const [loading, setLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState<'publications' | 'projects' | 'both'>('both');

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
        setResearcher(mockResearcherData);
        setLoading(false);
      }, 800);
    };

    fetchOrcidData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="h-8 bg-orcid-light rounded w-64 mx-auto"></div>
          </div>
          <p className="text-lg text-gray-600">Carregando perfil do pesquisador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ProfileHeader researcher={researcher} />

      <div className="flex justify-center my-6 space-x-2">
        <Button
          variant={displayMode === 'publications' ? 'default' : 'outline'}
          onClick={() => setDisplayMode('publications')}
          className={displayMode === 'publications' ? 'bg-orcid-green hover:bg-orcid-green/90' : ''}
        >
          Publicações
        </Button>
        <Button
          variant={displayMode === 'projects' ? 'default' : 'outline'}
          onClick={() => setDisplayMode('projects')}
          className={displayMode === 'projects' ? 'bg-orcid-green hover:bg-orcid-green/90' : ''}
        >
          Projetos
        </Button>
        <Button
          variant={displayMode === 'both' ? 'default' : 'outline'}
          onClick={() => setDisplayMode('both')}
          className={displayMode === 'both' ? 'bg-orcid-green hover:bg-orcid-green/90' : ''}
        >
          Ambos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          {(displayMode === 'publications' || displayMode === 'both') && (
            <PublicationSection publications={researcher.publications} />
          )}
          
          {(displayMode === 'projects' || displayMode === 'both') && (
            <ProjectSection projects={researcher.projects} publications={researcher.publications} />
          )}
        </div>
        
        <div className="md:col-span-1">
          <Card className="p-4 mb-6">
            <h3 className="section-title mb-4">Evolução de Publicações</h3>
            <PublicationChart publications={researcher.publications} />
          </Card>
          
          <Card className="p-4">
            <h3 className="section-title mb-4">Links Acadêmicos</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Link className="w-4 h-4 mr-2" />
                <a href={researcher.institutionalPage} target="_blank" rel="noopener noreferrer">
                  Página Institucional
                </a>
              </li>
              <li className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Link className="w-4 h-4 mr-2" />
                <a href={`https://orcid.org/${researcher.orcidId}`} target="_blank" rel="noopener noreferrer">
                  Perfil ORCID
                </a>
              </li>
              {researcher.externalLinks.map((link, index) => (
                <li key={index} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
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
