
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Save, Trash } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { mockResearcherData } from '../data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Project } from '../types';

const ProjectsManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>(mockResearcherData.projects);
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'publications'>>({
    title: '',
    description: '',
    startYear: new Date().getFullYear(),
    endYear: '',
    fundingAgency: '',
    role: 'Pesquisador'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  const saveProject = () => {
    if (!newProject.title) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o título do projeto.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a random ID for the new project
    const newProj: Project = {
      ...newProject,
      id: Date.now().toString(),
      publications: [] // Initially, no publications are associated with this project
    };
    
    setProjects([...projects, newProj]);
    
    toast({
      title: "Projeto adicionado",
      description: "O projeto foi adicionado com sucesso.",
    });
    
    // Reset form
    setNewProject({
      title: '',
      description: '',
      startYear: new Date().getFullYear(),
      endYear: '',
      fundingAgency: '',
      role: 'Pesquisador'
    });
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(proj => proj.id !== id);
    setProjects(updatedProjects);
    
    toast({
      title: "Projeto removido",
      description: "O projeto foi removido com sucesso.",
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-serif font-semibold text-orcid-dark mb-4">Novo Projeto</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Título</label>
            <Input 
              name="title"
              value={newProject.title}
              onChange={handleChange}
              placeholder="Título do projeto"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <Textarea 
            name="description"
            value={newProject.description}
            onChange={handleChange}
            placeholder="Descrição do projeto"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ano de Início</label>
            <Input 
              name="startYear"
              type="number"
              value={newProject.startYear}
              onChange={handleChange}
              placeholder="Ano de início"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ano de Término (opcional)</label>
            <Input 
              name="endYear"
              type="number"
              value={newProject.endYear}
              onChange={handleChange}
              placeholder="Ano de término"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Agência de Financiamento</label>
            <Input 
              name="fundingAgency"
              value={newProject.fundingAgency}
              onChange={handleChange}
              placeholder="Nome da agência"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Seu Papel no Projeto</label>
            <Input 
              name="role"
              value={newProject.role}
              onChange={handleChange}
              placeholder="Seu papel"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={saveProject} className="bg-orcid-green hover:bg-orcid-green/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Projeto
          </Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-2xl font-serif font-semibold text-orcid-dark mb-4">Projetos Cadastrados</h2>
        
        {projects.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Agência</TableHead>
                <TableHead>Publicações</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    {project.startYear} - {project.endYear || 'Atual'}
                  </TableCell>
                  <TableCell>{project.fundingAgency}</TableCell>
                  <TableCell>
                    {project.publications ? project.publications.length : 0}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500 text-center py-4">Nenhum projeto cadastrado</p>
        )}
      </Card>
    </div>
  );
};

export default ProjectsManager;
