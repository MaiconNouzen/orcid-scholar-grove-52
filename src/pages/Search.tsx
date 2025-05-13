
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, UserPlus } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

interface SearchResult {
  orcidId: string;
  name: string;
  institution: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    
    // Simulação de busca na API ORCID
    setTimeout(() => {
      // Resultados mockados para demonstração
      const mockResults = [
        { orcidId: '0000-0002-1825-0097', name: 'João Silva', institution: 'Universidade Federal do Rio de Janeiro' },
        { orcidId: '0000-0002-1825-0098', name: 'Maria Santos', institution: 'Universidade de São Paulo' },
        { orcidId: '0000-0002-1825-0099', name: 'Carlos Oliveira', institution: 'Universidade Estadual de Campinas' },
      ];
      
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="p-6 bg-white border-blue-100">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Buscar Pesquisadores por ORCID</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Nome do pesquisador ou ORCID ID"
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
        </form>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <p>Buscando pesquisadores...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">Resultados da Busca</h2>
            {results.map((result) => (
              <Card key={result.orcidId} className="p-4 flex items-center justify-between bg-white border-gray-200">
                <div>
                  <h3 className="text-lg font-medium text-blue-800">{result.name}</h3>
                  <p className="text-gray-600">{result.institution}</p>
                  <p className="text-sm text-gray-500">ORCID: {result.orcidId}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                  >
                    <RouterLink to={`/profile/${result.orcidId}`}>
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
      </Card>
    </div>
  );
};

export default Search;
