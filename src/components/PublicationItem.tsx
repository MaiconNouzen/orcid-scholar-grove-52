
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Publication } from '../types';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface PublicationItemProps {
  publication: Publication;
  showEditButton?: boolean;
}

const PublicationItem = ({ publication, showEditButton = false }: PublicationItemProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-blue-700">{publication.title}</h3>
          <p className="text-sm text-gray-600">
            {publication.authors.map(author => (
              <Link 
                key={author.orcidId} 
                to={`/researcher/${author.orcidId}`}
                className="hover:underline mr-2"
              >
                {author.name}
              </Link>
            )).reduce((prev, curr) => [prev, ', ', curr] as any)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {publication.year}
          </span>
          
          {showEditButton && (
            <Link to={`/edit-publication/${publication.id}`}>
              <Button variant="outline" size="sm">Editar</Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Tipo:</span> {publication.type}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Fonte:</span> {publication.source}
        </p>
      </div>
      
      {publication.abstract && (
        <div className="mt-2">
          <p className="text-sm text-gray-700">{publication.abstract.length > 150 ? `${publication.abstract.substring(0, 150)}...` : publication.abstract}</p>
        </div>
      )}
      
      {publication.links && publication.links.length > 0 && (
        <div className="mt-2 flex gap-2">
          {publication.links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {link.name}
            </a>
          ))}
        </div>
      )}
    </Card>
  );
};

export default PublicationItem;
