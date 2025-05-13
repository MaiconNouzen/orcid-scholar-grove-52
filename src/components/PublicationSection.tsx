
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PublicationItem from './PublicationItem';
import { Publication } from '../types';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';

interface PublicationSectionProps {
  publications: Publication[];
  allowEdit?: boolean;
}

const PublicationSection = ({ publications, allowEdit = false }: PublicationSectionProps) => {
  return (
    <Card className="p-6 bg-white border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          <FileText className="h-5 w-5" /> 
          Publicações
        </h2>
        
        {allowEdit && (
          <Link to="/edit-publication/new">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Nova Publicação
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {publications.length > 0 ? (
          publications
            .sort((a, b) => Number(b.year) - Number(a.year))
            .map((publication) => (
              <PublicationItem 
                key={publication.id || publication.title} 
                publication={publication} 
                showEditButton={allowEdit}
              />
            ))
        ) : (
          <p className="text-gray-500 text-center py-6">Nenhuma publicação encontrada.</p>
        )}
      </div>
    </Card>
  );
};

export default PublicationSection;
