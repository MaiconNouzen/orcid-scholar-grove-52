
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import ResearcherProfile from '../components/ResearcherProfile';
import ProfileEditor from '../components/ProfileEditor';
import PublicationsManager from '../components/PublicationsManager';
import ProjectsManager from '../components/ProjectsManager';
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="p-6 mb-6 bg-white shadow-sm">
          <h1 className="text-3xl font-serif font-bold text-orcid-dark mb-2">Sistema de Perfil Acadêmico</h1>
          <p className="text-gray-600">Gerencie seu perfil de pesquisador, publicações e projetos acadêmicos</p>
        </Card>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 bg-white p-1 shadow-sm">
            <TabsTrigger value="profile" className="data-[state=active]:bg-orcid-light">
              Perfil
            </TabsTrigger>
            <TabsTrigger value="edit-profile" className="data-[state=active]:bg-orcid-light">
              Editar Perfil
            </TabsTrigger>
            <TabsTrigger value="publications" className="data-[state=active]:bg-orcid-light">
              Gerenciar Publicações
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-orcid-light">
              Gerenciar Projetos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-0">
            <ResearcherProfile />
          </TabsContent>
          
          <TabsContent value="edit-profile" className="mt-0">
            <ProfileEditor />
          </TabsContent>
          
          <TabsContent value="publications" className="mt-0">
            <PublicationsManager />
          </TabsContent>
          
          <TabsContent value="projects" className="mt-0">
            <ProjectsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
