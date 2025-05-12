
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Project, Publication } from '../types';

interface ProjectSectionProps {
  projects: Project[];
  publications: Publication[];
}

const ProjectSection = ({ projects, publications }: ProjectSectionProps) => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleExpand = (projectId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Count publications by project
  const getProjectPublications = (projectName: string) => {
    return publications.filter(pub => pub.project === projectName);
  };

  return (
    <Card className="p-4">
      <h2 className="section-title mb-4">Projetos de Pesquisa</h2>
      
      {projects.length === 0 ? (
        <p className="text-gray-500">Nenhum projeto encontrado.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const projectPubs = getProjectPublications(project.title);
            
            return (
              <div key={project.id} className="border border-gray-200 rounded-md bg-white">
                <div 
                  className="accordion-header"
                  onClick={() => toggleExpand(project.id)}
                >
                  <h3 className="font-medium">{project.title}</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      {projectPubs.length} publicações
                    </span>
                    {expandedProjects[project.id] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
                
                {expandedProjects[project.id] && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Período: {project.startYear} - {project.endYear || "Atual"}</h4>
                      
                      {project.fundingAgency && (
                        <p className="text-sm text-gray-700 mb-3">
                          <span className="font-medium">Financiamento:</span> {project.fundingAgency}
                        </p>
                      )}
                      
                      <h4 className="text-sm font-medium mb-2">Publicações associadas:</h4>
                      {projectPubs.length > 0 ? (
                        <ul className="list-disc list-inside text-sm space-y-2 ml-2">
                          {projectPubs.map((pub, index) => (
                            <li key={index}>
                              <span className="text-blue-600">{pub.title}</span> ({pub.year})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">Nenhuma publicação associada a este projeto.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ProjectSection;
