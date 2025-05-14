
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Briefcase, User } from 'lucide-react';
import { mockResearcherData, mockResearchers, joaoResearcher } from '../data/mockData';
import { Researcher } from '../types';
import ResearcherProfile from '../components/ResearcherProfile';
import PublicationSection from '../components/PublicationSection';
import ProjectSection from '../components/ProjectSection';

const ResearcherProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  // Function to check if this is the current user's profile
  const isCurrentUser = () => {
    return id === 'current' || id === mockResearcherData.orcidId;
  };

  useEffect(() => {
    const fetchResearcher = async () => {
      setLoading(true);
      console.log("Fetching researcher data for ID:", id);
      
      // In a real app, fetch from API using the ID
      // Here we're using mock data
      setTimeout(() => {
        if (id === 'current') {
          console.log("Using current researcher data");
          setResearcher(mockResearcherData);
        } else if (id === joaoResearcher.orcidId) {
          console.log("Using João's researcher data");
          setResearcher(joaoResearcher);
        } else {
          console.log("Looking for researcher in mockResearchers");
          const found = mockResearchers.find(r => r.orcidId === id);
          setResearcher(found || null);
        }
        setLoading(false);
      }, 500);
    };

    fetchResearcher();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando perfil do pesquisador...</p>
        </div>
      </div>
    );
  }

  if (!researcher) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Pesquisador não encontrado</h2>
            <p className="mb-6">Não foi possível encontrar um pesquisador com o ID fornecido.</p>
            <Button onClick={() => navigate('/search')}>Voltar para Busca</Button>
          </div>
        </Card>
      </div>
    );
  }

  console.log("Rendering researcher profile:", researcher.name);
  console.log("Publications:", researcher.publications?.length || 0);
  console.log("Projects:", researcher.projects?.length || 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="container mx-auto px-4 mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Voltar
        </Button>
      </div>

      <div className="container mx-auto px-4">
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-blue-800">{researcher.name}</h1>
            
            {isCurrentUser() && (
              <Button 
                onClick={() => navigate('/edit-profile')}
                className="mt-4 md:mt-0"
              >
                Editar Perfil
              </Button>
            )}
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
              <ResearcherProfile researcherId={id} showFullProfile={false} />
            </TabsContent>
            
            <TabsContent value="publications" className="pt-6">
              <PublicationSection 
                publications={researcher.publications || []} 
                allowEdit={isCurrentUser()} 
              />
            </TabsContent>
            
            <TabsContent value="projects" className="pt-6">
              <ProjectSection 
                projects={researcher.projects || []} 
                publications={researcher.publications || []} 
                allowEdit={isCurrentUser()}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ResearcherProfilePage;
