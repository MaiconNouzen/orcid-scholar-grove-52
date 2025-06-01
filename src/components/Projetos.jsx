
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Projetos({ projects, setProjects }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProjects = projects.filter(project => {
    if (!searchQuery) return true;
    const nameMatch = project.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || descMatch;
  });

  const calculateProgress = (project) => {
    const current = new Date().getFullYear();
    const start = project.startYear;
    const end = typeof project.endYear === 'number' ? project.endYear : parseInt(project.endYear);
    
    if (current < start) return 0;
    if (current > end) return 100;
    
    const total = end - start;
    const elapsed = current - start;
    
    return Math.round((elapsed / total) * 100);
  };

  return (
    <div className="projetos-container">
      <div className="page-header">
        <h1>Meus Projetos de Pesquisa</h1>
        <button className="btn btn-primary">
          ➕ Novo Projeto
        </button>
      </div>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar projetos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-timeline">
              📅 {project.startYear} - {project.endYear}
            </div>
            
            {project.funding && (
              <p className="project-funding">
                <strong>Financiamento:</strong> {project.funding}
              </p>
            )}
            
            <div className="progress-section">
              <div className="progress-header">
                <span>Progresso</span>
                <span>{calculateProgress(project)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${calculateProgress(project)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="project-actions">
              <Link to={`/project/${project.id}`} className="action-link">
                Ver detalhes
              </Link>
              <Link to={`/editar-projeto/${project.id}`} className="action-button">
                ✏️ Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <p>Nenhum projeto encontrado.</p>
        </div>
      )}
    </div>
  );
}

export default Projetos;
