
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Researcher } from '../types';
import { mockResearcherData } from '../data/mockData';
import { toast } from '@/hooks/use-toast';

const EditProfile = () => {
  const [researcher, setResearcher] = useState<Researcher>(mockResearcherData as Researcher);
  const [newArea, setNewArea] = useState('');
  const [newLink, setNewLink] = useState({ name: '', url: '' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui enviaria os dados para API
    toast({
      title: "Perfil salvo",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResearcher((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addResearchArea = () => {
    if (!newArea.trim()) return;
    setResearcher((prev) => ({
      ...prev,
      researchAreas: [...prev.researchAreas, newArea]
    }));
    setNewArea('');
  };

  const removeResearchArea = (index: number) => {
    setResearcher((prev) => ({
      ...prev,
      researchAreas: prev.researchAreas.filter((_, i) => i !== index)
    }));
  };

  const addExternalLink = () => {
    if (!newLink.name.trim() || !newLink.url.trim()) return;
    setResearcher((prev) => ({
      ...prev,
      externalLinks: [...prev.externalLinks, { ...newLink }]
    }));
    setNewLink({ name: '', url: '' });
  };

  const removeExternalLink = (index: number) => {
    setResearcher((prev) => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Editar Perfil</h1>
      
      <form onSubmit={handleSave}>
        <Card className="p-6 mb-6 bg-white border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Informações Básicas</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <Input
                name="name"
                value={researcher.name}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ORCID ID</label>
              <Input
                name="orcidId"
                value={researcher.orcidId}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
              <Input
                name="institution"
                value={researcher.institution}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <Input
                name="department"
                value={researcher.department || ''}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Função</label>
              <Input
                name="role"
                value={researcher.role || ''}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                name="email"
                type="email"
                value={researcher.email || ''}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
              <Textarea
                name="bio"
                value={researcher.bio}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
                rows={4}
              />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-6 bg-white border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Áreas de Pesquisa</h2>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {researcher.researchAreas.map((area, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                  <span>{area}</span>
                  <button 
                    type="button" 
                    onClick={() => removeResearchArea(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                placeholder="Adicionar área de pesquisa"
                className="border-blue-200"
              />
              <Button 
                type="button" 
                onClick={addResearchArea}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-6 bg-white border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Links Externos</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Página Institucional</label>
              <Input
                name="institutionalPage"
                value={researcher.institutionalPage}
                onChange={handleBasicInfoChange}
                className="w-full border-blue-200"
              />
            </div>
            
            <div className="space-y-2">
              {researcher.externalLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={link.name} disabled className="flex-1 border-blue-200 bg-gray-50" />
                  <Input value={link.url} disabled className="flex-1 border-blue-200 bg-gray-50" />
                  <Button 
                    type="button" 
                    variant="destructive"
                    onClick={() => removeExternalLink(index)}
                    size="icon"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={newLink.name}
                onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                placeholder="Nome do link"
                className="border-blue-200"
              />
              <Input
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="URL"
                className="border-blue-200"
              />
              <Button 
                type="button" 
                onClick={addExternalLink}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
