
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Pesquisador({ searchResults }) {
  const { id } = useParams();
  const [researcher, setResearcher] = useState(null);
  const [activeTab, setActiveTab] = useState('perfil');

  useEffect(() => {
    const found = searchResults.find(r => r.orcidId === id);
    if (found) {
      setResearcher(found);
    }
  }, [id, searchResults]);

  if (!researcher) {
    return (
      <div className="pesquisador-container">
        <div className="error-message">
          <h2>Pesquisador não encontrado</h2>
          <p>Não foi possível encontrar um pesquisador com o ID fornecido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pesquisador-container">
      <div className="researcher-header">
        <div className="researcher-avatar-large">
          {researcher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
        <div className="researcher-info">
          <h1>{researcher.name}</h1>
          <p className="institution">{researcher.institution}</p>
          {researcher.department && <p className="department">{researcher.department}</p>}
          <div className="orcid-badge">
            <span>ORCID: </span>
            <a href={`https://orcid.org/${researcher.orcidId}`} target="_blank" rel="noopener noreferrer">
              {researcher.orcidId}
            </a>
          </div>
        </div>
      </div>

      <div className="researcher-tabs">
        <button 
          className={activeTab === 'perfil' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('perfil')}
        >
          Perfil
        </button>
        <button 
          className={activeTab === 'publicacoes' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('publicacoes')}
        >
          Publicações
        </button>
        <button 
          className={activeTab === 'projetos' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('projetos')}
        >
          Projetos
        </button>
      </div>

      <div className="researcher-content">
        {activeTab === 'perfil' && (
          <div className="tab-content">
            <div className="research-areas-section">
              <h3>Áreas de Pesquisa</h3>
              <div className="research-areas">
                {researcher.researchAreas.map((area, index) => (
                  <span key={index} className="research-tag">{area}</span>
                ))}
              </div>
            </div>
            
            <div className="stats-section">
              <div className="stat-card">
                <div className="stat-number">{researcher.publications.length}</div>
                <div className="stat-label">Publicações</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{researcher.projects.length}</div>
                <div className="stat-label">Projetos</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'publicacoes' && (
          <div className="tab-content">
            {researcher.publications.length === 0 ? (
              <p className="empty-message">Nenhuma publicação encontrada.</p>
            ) : (
              <div className="publications-list">
                {researcher.publications.map((pub, index) => (
                  <div key={index} className="publication-item">
                    <h4>{pub.title}</h4>
                    <p className="authors">{pub.authors.map(a => a.name).join(', ')}</p>
                    <div className="publication-meta">
                      <span className="pub-type">{pub.type}</span>
                      <span className="pub-year">{pub.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'projetos' && (
          <div className="tab-content">
            {researcher.projects.length === 0 ? (
              <p className="empty-message">Nenhum projeto encontrado.</p>
            ) : (
              <div className="projects-list">
                {researcher.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h4>{project.name}</h4>
                    <p>{project.description}</p>
                    <div className="project-meta">
                      📅 {project.startYear} - {project.endYear}
                      {project.funding && <span>💰 {project.funding}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pesquisador;
