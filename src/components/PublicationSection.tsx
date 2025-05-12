
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PublicationItem from './PublicationItem';
import { Publication } from '../types';

interface PublicationSectionProps {
  publications: Publication[];
}

const PublicationSection = ({ publications }: PublicationSectionProps) => {
  const [expandedTypes, setExpandedTypes] = useState({
    'Journal Article': true,
    'Conference Paper': true,
    'Book Chapter': true,
  });

  const toggleExpand = (type: string) => {
    setExpandedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Group publications by type
  const groupedPublications = publications.reduce((acc, pub) => {
    if (!acc[pub.type]) {
      acc[pub.type] = [];
    }
    acc[pub.type].push(pub);
    return acc;
  }, {} as Record<string, Publication[]>);

  // Count publications by type
  const publicationCounts = Object.keys(groupedPublications).map(type => ({
    type,
    count: groupedPublications[type].length
  }));

  return (
    <Card className="p-4 mb-6">
      <h2 className="section-title mb-4">Publicações Acadêmicas</h2>
      
      {publicationCounts.length === 0 ? (
        <p className="text-gray-500">Nenhuma publicação encontrada.</p>
      ) : (
        <>
          {['Journal Article', 'Conference Paper', 'Book Chapter'].map((type) => {
            const typePubs = groupedPublications[type] || [];
            if (typePubs.length === 0) return null;
            
            return (
              <div key={type} className="mb-6">
                <div 
                  className="accordion-header"
                  onClick={() => toggleExpand(type)}
                >
                  <h3 className="font-medium">{type} ({typePubs.length})</h3>
                  {expandedTypes[type] ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
                
                {expandedTypes[type] && (
                  <div className="mt-2 space-y-4">
                    {typePubs.map((pub, index) => (
                      <PublicationItem key={index} publication={pub} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </Card>
  );
};

export default PublicationSection;
