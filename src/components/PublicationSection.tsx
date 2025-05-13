
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Link, Edit } from 'lucide-react';
import PublicationItem from './PublicationItem';
import { useNavigate } from 'react-router-dom';

const PublicationSection = ({ publications }) => {
  const navigate = useNavigate();
  const [expandedTypes, setExpandedTypes] = useState({
    'Journal Article': true,
    'Conference Paper': true,
    'Book Chapter': true,
  });

  const toggleExpand = (type) => {
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
  }, {});

  // Count publications by type
  const publicationCounts = Object.keys(groupedPublications).map(type => ({
    type,
    count: groupedPublications[type].length
  }));

  const handleEdit = (index) => {
    navigate(`/edit-publication/${index}`);
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Publicações Acadêmicas</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate('/publications')}
          className="text-sm"
        >
          Ver todas
        </Button>
      </div>
      
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
                      <div key={index} className="relative">
                        <PublicationItem publication={pub} />
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute top-3 right-12 text-gray-500 hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(publications.indexOf(pub));
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
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
