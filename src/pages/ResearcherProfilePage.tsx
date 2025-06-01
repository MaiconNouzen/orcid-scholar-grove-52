
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { mockResearchers, mockResearcherData } from '../data/mockData';
import { Researcher } from '../types';
import ResearcherProfile from '../components/ResearcherProfile';
import PublicationSection from '../components/PublicationSection';
import ProjectSection from '../components/ProjectSection';
import { toast } from '@/components/ui/use-toast';

const ResearcherProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const fetchResearcher = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          if (id === 'current') {
            setResearcher(mockResearcherData as Researcher);
            setIsCurrentUser(true);
          } else {
            const found = mockResearchers.find(r => r.orcidId === id);
            if (found) {
              setResearcher(found);
              setIsCurrentUser(false);
            } else {
              setResearcher(null);
              toast({
                title: "Pesquisador não encontrado",
                description: "Não foi possível encontrar um pesquisador com o ID fornecido.",
                variant: "destructive"
              });
            }
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        toast({
          title: "Erro ao carregar perfil",
          description: "Ocorreu um erro ao carregar os dados do pesquisador.",
          variant: "destructive"
        });
        setLoading(false);
      }
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

  // Se for o usuário atual, renderiza como antes
  if (isCurrentUser) {
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
        <ResearcherProfile researcherId={id || 'current'} isEditable={isCurrentUser} />
      </div>
    );
  }

  // Para outros pesquisadores, renderiza com tabs
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
        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="mb-6 bg-blue-50 border border-blue-100">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="publicacoes">Publicações</TabsTrigger>
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="perfil" className="mt-0">
            <ResearcherProfile researcherId={id || ''} isEditable={false} />
          </TabsContent>
          
          <TabsContent value="publicacoes" className="mt-0">
            <PublicationSection publications={researcher.publications} />
          </TabsContent>
          
          <TabsContent value="projetos" className="mt-0">
            <ProjectSection projects={researcher.projects} publications={researcher.publications} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResearcherProfilePage;
