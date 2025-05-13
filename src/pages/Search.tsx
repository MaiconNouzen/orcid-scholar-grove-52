
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, UserPlus, Filter, BookOpen, Briefcase } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Researcher {
  orcidId: string;
  name: string;
  institution: string;
  area?: string;
  profileUrl?: string;
}

interface Publication {
  id: string;
  title: string;
  authors: { name: string; orcidId: string }[];
  year: number;
  journal: string;
  doi?: string;
}

interface Project {
  id: string;
  title: string;
  institution: string;
  startYear: number;
  endYear: number | string;
  status: 'Concluído' | 'Em andamento';
  area: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('researchers');
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState('all');
  const [years, setYears] = useState('all');
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    
    // Simulação de busca na API ORCID
    setTimeout(() => {
      // Resultados mockados para demonstração
      if (filter === 'researchers') {
        const mockResearchers = [
          { orcidId: '0000-0002-1825-0097', name: 'João Silva', institution: 'Universidade Federal do Rio de Janeiro', area: 'Ciência da Computação' },
          { orcidId: '0000-0002-1825-0098', name: 'Maria Santos', institution: 'Universidade de São Paulo', area: 'Biologia Molecular' },
          { orcidId: '0000-0002-1825-0099', name: 'Carlos Oliveira', institution: 'Universidade Estadual de Campinas', area: 'Física Quântica' },
          { orcidId: '0000-0002-1825-0100', name: 'Ana Pereira', institution: 'Universidade Federal de Minas Gerais', area: 'Medicina' },
          { orcidId: '0000-0002-1825-0101', name: 'Pedro Costa', institution: 'Universidade de Brasília', area: 'Engenharia Civil' },
        ];
        setResearchers(mockResearchers);
      } else if (filter === 'publications') {
        const mockPublications = [
          { id: '1', title: 'Avanços em Machine Learning aplicados à Saúde', authors: [{ name: 'João Silva', orcidId: '0000-0002-1825-0097' }], year: 2023, journal: 'Brazilian Journal of Technology', doi: '10.1234/bjt.2023.001' },
          { id: '2', title: 'Análise Genômica Comparativa de Espécies Amazônicas', authors: [{ name: 'Maria Santos', orcidId: '0000-0002-1825-0098' }], year: 2022, journal: 'Science Brazil', doi: '10.1234/sb.2022.005' },
          { id: '3', title: 'Mecânica Quântica e suas Aplicações Industriais', authors: [{ name: 'Carlos Oliveira', orcidId: '0000-0002-1825-0099' }], year: 2023, journal: 'Physics Today', doi: '10.1234/pt.2023.010' },
          { id: '4', title: 'Novos Tratamentos para Doenças Autoimunes', authors: [{ name: 'Ana Pereira', orcidId: '0000-0002-1825-0100' }], year: 2021, journal: 'Medical Research Brazil', doi: '10.1234/mrb.2021.008' },
          { id: '5', title: 'Sustentabilidade em Projetos de Infraestrutura Urbana', authors: [{ name: 'Pedro Costa', orcidId: '0000-0002-1825-0101' }], year: 2022, journal: 'Engineering Studies', doi: '10.1234/es.2022.003' },
        ];
        setPublications(mockPublications);
      } else if (filter === 'projects') {
        const mockProjects = [
          { id: '1', title: 'Desenvolvimento de Algoritmos de IA para Diagnóstico Médico', institution: 'UFRJ', startYear: 2022, endYear: 2024, status: 'Em andamento' as const, area: 'Tecnologia e Saúde' },
          { id: '2', title: 'Conservação da Biodiversidade na Amazônia', institution: 'USP', startYear: 2020, endYear: 2023, status: 'Concluído' as const, area: 'Meio Ambiente' },
          { id: '3', title: 'Materiais Supercondutores para Computação Quântica', institution: 'UNICAMP', startYear: 2021, endYear: 2025, status: 'Em andamento' as const, area: 'Física e Tecnologia' },
          { id: '4', title: 'Imunoterapia para Doenças Autoimunes', institution: 'UFMG', startYear: 2019, endYear: 2022, status: 'Concluído' as const, area: 'Medicina' },
          { id: '5', title: 'Desenvolvimento Urbano Sustentável', institution: 'UnB', startYear: 2021, endYear: 2024, status: 'Em andamento' as const, area: 'Engenharia e Sustentabilidade' },
        ];
        setProjects(mockProjects);
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="p-6 bg-white border-blue-100">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Buscar no ORCID Connect</h1>
        
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="researchers" className="flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Pesquisadores
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Publicações
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Projetos
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={
                    filter === 'researchers' ? "Nome do pesquisador ou ORCID ID" : 
                    filter === 'publications' ? "Título da publicação ou autor" : 
                    "Nome do projeto ou instituição"
                  }
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border-blue-200 focus:border-blue-500"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <SearchIcon className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">Filtros:</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <Select value={area} onValueChange={setArea}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Área de Pesquisa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as áreas</SelectItem>
                    <SelectItem value="cs">Ciência da Computação</SelectItem>
                    <SelectItem value="bio">Biologia</SelectItem>
                    <SelectItem value="physics">Física</SelectItem>
                    <SelectItem value="med">Medicina</SelectItem>
                    <SelectItem value="eng">Engenharia</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={years} onValueChange={setYears}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os anos</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="older">Antes de 2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
        
        <TabsContent value="researchers">
          {loading ? (
            <div className="flex justify-center py-8">
              <p>Buscando pesquisadores...</p>
            </div>
          ) : researchers.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-700">Pesquisadores Encontrados</h2>
              {researchers.map((researcher) => (
                <Card key={researcher.orcidId} className="p-4 flex items-center justify-between bg-white border-gray-200">
                  <div>
                    <h3 className="text-lg font-medium text-blue-800">{researcher.name}</h3>
                    <p className="text-gray-600">{researcher.institution}</p>
                    <p className="text-sm text-gray-500">Área: {researcher.area}</p>
                    <p className="text-sm text-gray-500">ORCID: {researcher.orcidId}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <RouterLink to={`/profile/${researcher.orcidId}`}>
                        Ver Perfil
                      </RouterLink>
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <UserPlus className="mr-1 h-4 w-4" />
                      Seguir
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : query && !loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum pesquisador encontrado com esses critérios.</p>
            </div>
          ) : null}
        </TabsContent>
        
        <TabsContent value="publications">
          {loading ? (
            <div className="flex justify-center py-8">
              <p>Buscando publicações...</p>
            </div>
          ) : publications.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-700">Publicações Encontradas</h2>
              {publications.map((publication) => (
                <Card key={publication.id} className="p-4 bg-white border-gray-200">
                  <h3 className="text-lg font-medium text-blue-800">{publication.title}</h3>
                  <p className="text-gray-600">
                    {publication.authors.map(a => a.name).join(', ')} ({publication.year})
                  </p>
                  <p className="text-sm text-gray-500 mb-2">{publication.journal}</p>
                  {publication.doi && (
                    <p className="text-sm text-gray-500">DOI: {publication.doi}</p>
                  )}
                  <div className="mt-3 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <RouterLink to={`/publications/${publication.id}`}>
                        Ver Detalhes
                      </RouterLink>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <RouterLink to={`/profile/${publication.authors[0].orcidId}`}>
                        Perfil do Autor
                      </RouterLink>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : query && !loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma publicação encontrada com esses critérios.</p>
            </div>
          ) : null}
        </TabsContent>
        
        <TabsContent value="projects">
          {loading ? (
            <div className="flex justify-center py-8">
              <p>Buscando projetos...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-700">Projetos Encontrados</h2>
              {projects.map((project) => (
                <Card key={project.id} className="p-4 bg-white border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-blue-800">{project.title}</h3>
                      <p className="text-gray-600">{project.institution}</p>
                      <p className="text-sm text-gray-500">
                        Período: {project.startYear}-{typeof project.endYear === 'string' ? project.endYear : project.endYear}
                      </p>
                      <p className="text-sm text-gray-500">Área: {project.area}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'Em andamento' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <RouterLink to={`/projects/${project.id}`}>
                        Ver Detalhes
                      </RouterLink>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : query && !loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum projeto encontrado com esses critérios.</p>
            </div>
          ) : null}
        </TabsContent>
      </Card>
    </div>
  );
};

export default Search;
