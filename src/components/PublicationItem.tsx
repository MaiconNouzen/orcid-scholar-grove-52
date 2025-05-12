
import React, { useState } from 'react';
import { Link, Plus, Minus, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PublicationItem = ({ publication }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between">
        <h4 className="font-medium text-orcid-dark">{publication.title}</h4>
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
        >
          {expanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mt-2">
        {publication.authors.map((author, i) => (
          <span key={i}>
            <a 
              href={author.orcidId ? `https://orcid.org/${author.orcidId}` : "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${author.orcidId ? 'text-blue-600 hover:underline' : 'text-gray-700'}`}
            >
              {author.name}
            </a>
            {i < publication.authors.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      
      <div className="text-sm text-gray-500 mt-1">
        <span className="font-medium">{publication.source}</span>, {publication.year}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge variant="outline" className="bg-gray-100">
          {publication.identifier.type}: {publication.identifier.value}
        </Badge>
        {publication.project && (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
            Projeto: {publication.project}
          </Badge>
        )}
        <Badge variant="outline" className="bg-orcid-light text-orcid-dark border-orcid-green">
          {publication.type}
        </Badge>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          {publication.abstract && (
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-1">Resumo:</h5>
              <p className="text-sm text-gray-700">{publication.abstract}</p>
            </div>
          )}
          
          {publication.links && publication.links.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Links:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {publication.links.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded"
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    <span className="truncate">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PublicationItem;
