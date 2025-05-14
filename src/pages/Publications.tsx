
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, Search, Filter, Pencil } from 'lucide-react';
import { mockResearcherData } from '../data/mockData';
import { Publication } from '../types';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';

const Publications = () => {
  const navigate = useNavigate();
  const [publications, setPublications] = useState<Publication[]>([...mockResearcherData.publications] as Publication[]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPublications = publications
    .filter(pub => {
      if (filter === 'all') return true;
      return pub.type === filter;
    })
    .filter(pub => {
      if (!searchQuery) return true;
      return (
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pub.year.toString().includes(searchQuery)
      );
    });

  const publicationTypes = [...new Set(publications.map(pub => pub.type))];
  
  const handleEditPublication = (index) => {
    navigate(`/edit-publication/${index}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-4 md:mb-0">Minhas Publicações</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Nova Publicação
        </Button>
      </div>
      
      <Card className="p-6 bg-white border-blue-100">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar publicações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-blue-200"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="border border-blue-200 rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Todas as publicações</option>
              {publicationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="grid">Visualização em Grade</TabsTrigger>
            <TabsTrigger value="list">Visualização em Lista</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPublications.map((pub, index) => (
                <Card key={index} className="p-4 bg-white border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start">
                    <FileText className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium text-blue-800 mb-1">{pub.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{pub.authors.map(a => a.name).join(', ')}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{pub.type}</span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{pub.year}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link to={`/publication/${index}`} className="text-sm text-blue-600 hover:underline">
                          Ver detalhes
                        </Link>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-gray-500 hover:text-blue-600"
                          onClick={() => handleEditPublication(index)}
                        >
                          <Pencil className="w-4 h-4" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="space-y-3">
              {filteredPublications.map((pub, index) => (
                <Card key={index} className="p-4 bg-white border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-blue-800 mb-1">{pub.title}</h3>
                      <p className="text-sm text-gray-600">{pub.authors.map(a => a.name).join(', ')}</p>
                      <p className="text-sm text-gray-500 mt-1">{pub.source}, {pub.year}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mb-2">{pub.type}</span>
                      <div className="flex gap-2">
                        <Link to={`/publication/${index}`} className="text-sm text-blue-600 hover:underline">
                          Ver detalhes
                        </Link>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-gray-500 hover:text-blue-600"
                          onClick={() => handleEditPublication(index)}
                        >
                          <Pencil className="w-4 h-4" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {filteredPublications.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhuma publicação encontrada.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Publications;
