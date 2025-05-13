
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Publication, Project } from '../types';
import { Link } from 'react-router-dom';
import { Plus, Briefcase } from 'lucide-react';

interface ProjectSectionProps {
  projects: Project[];
  publications: Publication[];
  allowEdit?: boolean;
}

const ProjectSection = ({ projects, publications, allowEdit = false }: ProjectSectionProps) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  // Get publications for a specific project
  const getProjectPublications = (projectId: string) => {
    return publications.filter(pub => pub.project === projectId);
  };

  return (
    <Card className="p-6 mt-8 bg-white border-blue-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          <Briefcase className="h-5 w-5" /> 
          Projetos de Pesquisa
        </h2>
        
        {allowEdit && (
          <Link to="/edit-project/new">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Novo Projeto
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {projects.length > 0 ? (
          projects
            .sort((a, b) => Number(b.startYear) - Number(a.startYear))
            .map((project) => (
              <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-blue-700">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.startYear} - {project.endYear}</p>
                  </div>
                  {allowEdit && (
                    <Link to={`/edit-project/${project.id}`}>
                      <Button variant="outline" size="sm">Editar</Button>
                    </Link>
                  )}
                </div>

                <p className="mt-2 text-gray-700">{project.description}</p>
                
                {project.fundingAgency && (
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Financiador:</span> {project.fundingAgency}
                  </p>
                )}

                {getProjectPublications(project.id).length > 0 && (
                  <div className="mt-3">
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-blue-600 p-0"
                      onClick={() => toggleProject(project.id)}
                    >
                      {expandedProject === project.id ? 'Esconder publicações' : `Ver ${getProjectPublications(project.id).length} publicações`}
                    </Button>
                    
                    {expandedProject === project.id && (
                      <ul className="mt-2 space-y-2 pl-4 border-l-2 border-blue-200">
                        {getProjectPublications(project.id).map((pub) => (
                          <li key={pub.id || pub.title} className="text-sm">
                            <Link to={`/edit-publication/${pub.id}`} className="hover:text-blue-600">
                              {pub.title} ({pub.year})
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </Card>
            ))
        ) : (
          <p className="text-gray-500 text-center py-6">Nenhum projeto encontrado.</p>
        )}
      </div>
    </Card>
  );
};

export default ProjectSection;
