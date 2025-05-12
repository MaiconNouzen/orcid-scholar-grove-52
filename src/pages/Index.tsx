
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Briefcase, User, Settings } from 'lucide-react';
import ResearcherProfile from '../components/ResearcherProfile';
import ProfileEditor from '../components/ProfileEditor';
import PublicationsManager from '../components/PublicationsManager';
import ProjectsManager from '../components/ProjectsManager';
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-orcid-light py-8">
      <div className="container mx-auto px-4">
        <Card className="p-6 mb-8 bg-white shadow-md border-l-4 border-l-orcid-accent">
          <div className="flex items-center">
            <div className="mr-4 p-2 bg-orcid-accent/10 rounded-full">
              <BookOpen className="w-6 h-6 text-orcid-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-orcid-dark mb-2">Sistema de Perfil Acadêmico ORCID</h1>
              <p className="text-orcid-gray">Gerencie seu perfil de pesquisador, publicações e projetos acadêmicos</p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 bg-white p-1 shadow-md rounded-lg border border-gray-100 flex justify-center w-full max-w-2xl mx-auto">
            <TabsTrigger value="profile" className="flex items-center data-[state=active]:bg-orcid-accent data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="edit-profile" className="flex items-center data-[state=active]:bg-orcid-accent data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Editar Perfil
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center data-[state=active]:bg-orcid-accent data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Publicações
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center data-[state=active]:bg-orcid-accent data-[state=active]:text-white">
              <Briefcase className="w-4 h-4 mr-2" />
              Projetos
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
