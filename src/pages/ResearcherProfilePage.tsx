
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { mockResearcherData, mockResearchers } from '../data/mockData';
import { Researcher } from '../types';
import ResearcherProfile from '../components/ResearcherProfile';

const ResearcherProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearcher = async () => {
      setLoading(true);
      // In a real app, fetch from API using the ID
      // Here we're using mock data
      setTimeout(() => {
        if (id === 'current') {
          setResearcher(mockResearcherData as Researcher);
        } else {
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
      <ResearcherProfile researcherId={id} />
    </div>
  );
};

export default ResearcherProfilePage;
