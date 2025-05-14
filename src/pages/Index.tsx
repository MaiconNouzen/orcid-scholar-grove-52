
import React, { useEffect, useState } from 'react';
import ResearcherProfile from '../components/ResearcherProfile';
import PublicationSection from '../components/PublicationSection';
import ProjectSection from '../components/ProjectSection';
import { mockResearcherData } from '../data/mockData';
import { Researcher } from '../types';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Briefcase, User } from 'lucide-react';

const Index = () => {
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-blue-800">{researcher.name}</h1>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="publications" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Publicações
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Projetos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="pt-6">
                <ResearcherProfile researcher={researcher} showFullProfile={true} />
              </TabsContent>
              
              <TabsContent value="publications" className="pt-6">
                <PublicationSection 
                  publications={researcher.publications || []} 
                  allowEdit={true} 
                />
              </TabsContent>
              
              <TabsContent value="projects" className="pt-6">
                <ProjectSection 
                  projects={researcher.projects || []} 
                  publications={researcher.publications || []} 
                  allowEdit={true}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
