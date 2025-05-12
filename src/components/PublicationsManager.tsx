import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Link, Trash, Save } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { mockResearcherData } from '../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Publication, Author, Link as LinkType, Project } from '../types';

const PublicationsManager = () => {
  const { toast } = useToast();
  const [publications, setPublications] = useState<Publication[]>(mockResearcherData.publications as Publication[]);
  const [newPublication, setNewPublication] = useState<Omit<Publication, 'id'>>({
    title: '',
    authors: [{ name: mockResearcherData.name, orcidId: mockResearcherData.orcidId }],
    year: new Date().getFullYear(),
    type: 'Journal Article',
    source: '',
    identifier: { type: 'DOI', value: '' },
    project: '',
    abstract: '',
    links: []
  });
  const [projects] = useState<Project[]>(mockResearcherData.projects as Project[]);
  const [newLink, setNewLink] = useState<LinkType>({ name: '', url: '' });
  const [newAuthor, setNewAuthor] = useState<Author>({ name: '', orcidId: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPublication({
      ...newPublication,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewPublication({
      ...newPublication,
      [name]: value
    });
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPublication({
      ...newPublication,
      identifier: {
        ...newPublication.identifier,
        [name]: value
      }
    });
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink({
      ...newLink,
      [name]: value
    });
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAuthor({
      ...newAuthor,
      [name]: value
    });
  };

  const addLink = () => {
    if (newLink.name && newLink.url) {
      setNewPublication({
        ...newPublication,
        links: [...newPublication.links, newLink]
      });
      setNewLink({ name: '', url: '' });
    }
  };

  const removeLink = (index: number) => {
    const newLinks = [...newPublication.links];
    newLinks.splice(index, 1);
    setNewPublication({
      ...newPublication,
      links: newLinks
    });
  };

  const addAuthor = () => {
    if (newAuthor.name) {
      setNewPublication({
        ...newPublication,
        authors: [...newPublication.authors, newAuthor]
      });
      setNewAuthor({ name: '', orcidId: '' });
    }
  };

  const removeAuthor = (index: number) => {
    if (index === 0) return; // Don't remove the first author (self)
    
    const newAuthors = [...newPublication.authors];
    newAuthors.splice(index, 1);
    setNewPublication({
      ...newPublication,
      authors: newAuthors
    });
  };

  const savePublication = () => {
    if (!newPublication.title || !newPublication.source) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o título e a fonte da publicação.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a random ID for the new publication
    const newPub: Publication = {
      ...newPublication,
      id: Date.now().toString()
    };
    
    setPublications([...publications, newPub]);
    
    toast({
      title: "Publicação adicionada",
      description: "A publicação foi adicionada com sucesso.",
    });
    
    // Reset form
    setNewPublication({
      title: '',
      authors: [{ name: mockResearcherData.name, orcidId: mockResearcherData.orcidId }],
      year: new Date().getFullYear(),
      type: 'Journal Article',
      source: '',
      identifier: { type: 'DOI', value: '' },
      project: '',
      abstract: '',
      links: []
    });
  };

  const deletePublication = (id: string) => {
    const updatedPublications = publications.filter(pub => pub.id !== id);
    setPublications(updatedPublications);
    
    toast({
      title: "Publicação removida",
      description: "A publicação foi removida com sucesso.",
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-6 mb-6 shadow-md border border-orcid-gray/10">
        <h2 className="text-2xl font-serif font-semibold text-orcid-accent mb-4">Nova Publicação</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <Input 
              name="title"
              value={newPublication.title}
              onChange={handleChange}
              placeholder="Título da publicação"
              className="border-orcid-gray/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ano</label>
            <Input 
              name="year"
              type="number"
              value={newPublication.year}
              onChange={handleChange}
              placeholder="Ano de publicação"
              className="border-orcid-gray/20"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <Select 
              value={newPublication.type} 
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger className="border-orcid-gray/20">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Journal Article">Artigo de Revista</SelectItem>
                <SelectItem value="Conference Paper">Artigo de Conferência</SelectItem>
                <SelectItem value="Book Chapter">Capítulo de Livro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fonte</label>
            <Input 
              name="source"
              value={newPublication.source}
              onChange={handleChange}
              placeholder="Nome da revista/conferência/livro"
              className="border-orcid-gray/20"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Identificador</label>
            <Select 
              value={newPublication.identifier.type} 
              onValueChange={(value) => setNewPublication({
                ...newPublication, 
                identifier: {...newPublication.identifier, type: value}
              })}
            >
              <SelectTrigger className="border-orcid-gray/20">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DOI">DOI</SelectItem>
                <SelectItem value="ISBN">ISBN</SelectItem>
                <SelectItem value="ISSN">ISSN</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Valor do Identificador</label>
            <Input 
              name="value"
              value={newPublication.identifier.value}
              onChange={handleIdentifierChange}
              placeholder="Valor do identificador"
              className="border-orcid-gray/20"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Projeto Relacionado</label>
          <Select 
            value={newPublication.project} 
            onValueChange={(value) => handleSelectChange('project', value)}
          >
            <SelectTrigger className="border-orcid-gray/20">
              <SelectValue placeholder="Selecione um projeto (opcional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Nenhum</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.title}>
                  {project.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Resumo</label>
          <Textarea 
            name="abstract"
            value={newPublication.abstract}
            onChange={handleChange}
            placeholder="Resumo da publicação"
            rows={3}
            className="border-orcid-gray/20"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Autores</h3>
          
          {newPublication.authors.map((author, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="grid grid-cols-2 gap-2 flex-1 mr-2">
                <Input 
                  value={author.name}
                  readOnly={index === 0} // First author is the current researcher
                  placeholder="Nome do autor"
                  className="border-orcid-gray/20"
                />
                <Input 
                  value={author.orcidId}
                  readOnly={index === 0} // First author is the current researcher
                  placeholder="ORCID ID (opcional)"
                  className="border-orcid-gray/20"
                />
              </div>
              {index > 0 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeAuthor(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Input 
              name="name"
              value={newAuthor.name}
              onChange={handleAuthorChange}
              placeholder="Nome do autor"
              className="border-orcid-gray/20"
            />
            <Input 
              name="orcidId"
              value={newAuthor.orcidId}
              onChange={handleAuthorChange}
              placeholder="ORCID ID (opcional)"
              className="border-orcid-gray/20"
            />
          </div>
          
          <Button 
            variant="outline" 
            onClick={addAuthor}
            className="mt-2"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Autor
          </Button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Links</h3>
          
          {newPublication.links.map((link, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="grid grid-cols-2 gap-2 flex-1 mr-2">
                <Input 
                  value={link.name}
                  disabled
                  placeholder="Nome do link"
                  className="border-orcid-gray/20"
                />
                <Input 
                  value={link.url}
                  disabled
                  placeholder="URL"
                  className="border-orcid-gray/20"
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
              className="border-orcid-gray/20"
            />
            <Input 
              name="url"
              value={newLink.url}
              onChange={handleLinkChange}
              placeholder="URL"
              className="border-orcid-gray/20"
            />
          </div>
          
          <Button 
            variant="outline" 
            onClick={addLink}
            className="mt-2"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Link
          </Button>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={savePublication} className="bg-orcid-accent hover:bg-orcid-accent/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Publicação
          </Button>
        </div>
      </Card>
      
      <Card className="p-6 shadow-md border border-orcid-gray/10">
        <h2 className="text-2xl font-serif font-semibold text-orcid-accent mb-4">Publicações Cadastradas</h2>
        
        {publications.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-orcid-dark">Título</TableHead>
                  <TableHead className="text-orcid-dark">Tipo</TableHead>
                  <TableHead className="text-orcid-dark">Ano</TableHead>
                  <TableHead className="text-orcid-dark">Fonte</TableHead>
                  <TableHead className="text-orcid-dark">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publications.map((pub) => (
                  <TableRow key={pub.id} className="hover:bg-orcid-light">
                    <TableCell className="font-medium">{pub.title}</TableCell>
                    <TableCell>{pub.type}</TableCell>
                    <TableCell>{pub.year}</TableCell>
                    <TableCell>{pub.source}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deletePublication(pub.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-orcid-gray text-center py-4">Nenhuma publicação cadastrada</p>
        )}
      </Card>
    </div>
  );
};

export default PublicationsManager;
