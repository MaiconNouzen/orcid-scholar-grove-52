
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import PublicationChart from './PublicationChart';
import ProjectPublicationChart from './ProjectPublicationChart';
import { Researcher } from '../types';

interface ResearcherProfileProps {
  researcher?: Researcher;
  researcherId?: string;
  showFullProfile?: boolean;
}

const ResearcherProfile = ({ researcher, researcherId, showFullProfile = true }: ResearcherProfileProps) => {
  const [activeChartTab, setActiveChartTab] = React.useState("publications");

  // If researcher is not provided, use the researcherId from props to fetch it
  React.useEffect(() => {
    if (!researcher && researcherId) {
      console.log("ResearcherProfile should load data for ID:", researcherId);
      // This would be implemented if we weren't passing the researcher directly
    }
  }, [researcher, researcherId]);

  // If we're still waiting for the researcher data
  if (!researcher) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando perfil do pesquisador...</p>
        </div>
      </div>
    );
  }

  // If we're not showing the full profile, just show the basic info
  if (!showFullProfile) {
    return (
      <div className="container mx-auto px-4 max-w-5xl">
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
                {researcher.externalLinks && researcher.externalLinks.map((link, index) => (
                  <li key={index} className="flex items-center text-blue-600 hover:text-blue-800">
                    <Link className="w-4 h-4 mr-2" />
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4 mt-6">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Evolução de Publicações</h3>
              
              <Tabs value={activeChartTab} onValueChange={setActiveChartTab}>
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="publications" className="flex-1">Por Ano</TabsTrigger>
                  <TabsTrigger value="projects" className="flex-1">Por Projeto</TabsTrigger>
                </TabsList>
                
                <TabsContent value="publications">
                  <PublicationChart publications={researcher.publications || []} />
                </TabsContent>
                
                <TabsContent value="projects">
                  <ProjectPublicationChart 
                    publications={researcher.publications || []} 
                    projects={researcher.projects || []} 
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Full profile with tabs is now handled by ResearcherProfilePage
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <ProfileHeader researcher={researcher} />
    </div>
  );
};

export default ResearcherProfile;
