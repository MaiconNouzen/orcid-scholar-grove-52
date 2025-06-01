
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Buscar({ searchResults, setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResearchers = searchResults.filter(researcher => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      researcher.name.toLowerCase().includes(query) ||
      researcher.institution.toLowerCase().includes(query) ||
      researcher.researchAreas.some(area => area.toLowerCase().includes(query))
    );
  });

  return (
    <div className="buscar-container">
      <h1>Buscar Pesquisadores</h1>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar por nome, instituição, área de pesquisa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input-large"
        />
      </div>
      
      <div className="researchers-list">
        {filteredResearchers.map(researcher => (
          <div key={researcher.orcidId} className="researcher-card">
            <div className="researcher-avatar">
              {researcher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            
            <div className="researcher-info">
              <h2>{researcher.name}</h2>
              
              <div className="researcher-details">
                <div className="detail-item">
                  🏛️ {researcher.institution}
                </div>
                
                {researcher.department && (
                  <div className="detail-item">
                    📚 {researcher.department}
                  </div>
                )}
                
                <div className="detail-item">
                  📄 {researcher.publications.length} publicações
                </div>
                
                <div className="detail-item">
                  💼 {researcher.projects.length} projetos
                </div>
              </div>
              
              <div className="research-areas">
                {researcher.researchAreas.slice(0, 3).map((area, index) => (
                  <span key={index} className="research-tag">{area}</span>
                ))}
                {researcher.researchAreas.length > 3 && (
                  <span className="research-tag">+{researcher.researchAreas.length - 3}</span>
                )}
              </div>
              
              <div className="researcher-actions">
                <Link to={`/pesquisador/${researcher.orcidId}`} className="btn btn-outline">
                  Ver perfil completo
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {filteredResearchers.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <h3>Nenhum pesquisador encontrado</h3>
            <p>Tente utilizar termos de busca diferentes.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Buscar;
