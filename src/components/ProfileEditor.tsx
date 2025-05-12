
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Link, Plus, Trash } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { mockResearcherData } from '../data/mockData';

const ProfileEditor = () => {
  const { toast } = useToast();
  const [researcher, setResearcher] = useState(mockResearcherData);
  const [newLink, setNewLink] = useState({ name: '', url: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResearcher({
      ...researcher,
      [name]: value
    });
  };

  const handleAreaChange = (e, index) => {
    const newAreas = [...researcher.researchAreas];
    newAreas[index] = e.target.value;
    setResearcher({
      ...researcher,
      researchAreas: newAreas
    });
  };

  const addResearchArea = () => {
    setResearcher({
      ...researcher,
      researchAreas: [...researcher.researchAreas, '']
    });
  };

  const removeResearchArea = (index) => {
    const newAreas = [...researcher.researchAreas];
    newAreas.splice(index, 1);
    setResearcher({
      ...researcher,
      researchAreas: newAreas
    });
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setNewLink({
      ...newLink,
      [name]: value
    });
  };

  const addLink = () => {
    if (newLink.name && newLink.url) {
      setResearcher({
        ...researcher,
        externalLinks: [...researcher.externalLinks, newLink]
      });
      setNewLink({ name: '', url: '' });
    }
  };

  const removeLink = (index) => {
    const newLinks = [...researcher.externalLinks];
    newLinks.splice(index, 1);
    setResearcher({
      ...researcher,
      externalLinks: newLinks
    });
  };

  const saveProfile = () => {
    // In a real application, we would save data to a backend
    toast({
      title: "Perfil atualizado",
      description: "As informações do seu perfil foram atualizadas com sucesso.",
    });
    console.log('Saving profile:', researcher);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-serif font-semibold text-orcid-dark mb-4">Informações Pessoais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome Completo</label>
            <Input 
              name="name"
              value={researcher.name}
              onChange={handleChange}
              placeholder="Nome completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ORCID ID</label>
            <Input 
              name="orcidId"
              value={researcher.orcidId}
              onChange={handleChange}
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Instituição</label>
          <Input 
            name="institution"
            value={researcher.institution}
            onChange={handleChange}
            placeholder="Nome da instituição"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Biografia</label>
          <Textarea 
            name="bio"
            value={researcher.bio}
            onChange={handleChange}
            placeholder="Descrição sobre sua trajetória acadêmica"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Página Institucional</label>
          <Input 
            name="institutionalPage"
            value={researcher.institutionalPage}
            onChange={handleChange}
            placeholder="URL da página institucional"
          />
        </div>
      </Card>
      
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-serif font-semibold text-orcid-dark mb-4">Áreas de Pesquisa</h2>
        
        {researcher.researchAreas.map((area, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input 
              value={area}
              onChange={(e) => handleAreaChange(e, index)}
              placeholder="Área de pesquisa"
              className="mr-2"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => removeResearchArea(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          onClick={addResearchArea}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Área
        </Button>
      </Card>
      
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-serif font-semibold text-orcid-dark mb-4">Links Externos</h2>
        
        {researcher.externalLinks.map((link, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="grid grid-cols-2 gap-2 flex-1 mr-2">
              <Input 
                value={link.name}
                disabled
                placeholder="Nome do link"
              />
              <Input 
                value={link.url}
                disabled
                placeholder="URL"
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => removeLink(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input 
            name="name"
            value={newLink.name}
            onChange={handleLinkChange}
            placeholder="Nome do link"
          />
          <Input 
            name="url"
            value={newLink.url}
            onChange={handleLinkChange}
            placeholder="URL"
          />
        </div>
        
        <Button 
          variant="outline" 
          onClick={addLink}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Link
        </Button>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={saveProfile} className="bg-orcid-green hover:bg-orcid-green/90">
          Salvar Perfil
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditor;
