
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Publicações({ publications, setPublications }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredPublications = publications
    .filter(pub => {
      if (filter === 'all') return true;
      return pub.type === filter;
    })
    .filter(pub => {
      if (!searchQuery) return true;
      return (
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pub.year.toString().includes(searchQuery)
      );
    });

  const publicationTypes = [...new Set(publications.map(pub => pub.type))];

  return (
    <div className="publicacoes-container">
      <div className="page-header">
        <h1>Minhas Publicações</h1>
        <button className="btn btn-primary">
          ➕ Nova Publicação
        </button>
      </div>
      
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar publicações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-section">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas as publicações</option>
            {publicationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="publications-grid">
        {filteredPublications.map((pub, index) => (
          <div key={index} className="publication-card">
            <div className="publication-header">
              <span className="publication-icon">📄</span>
              <div className="publication-content">
                <h3>{pub.title}</h3>
                <p className="authors">{pub.authors.map(a => a.name).join(', ')}</p>
                <div className="publication-tags">
                  <span className="tag tag-type">{pub.type}</span>
                  <span className="tag tag-year">{pub.year}</span>
                </div>
                <div className="publication-actions">
                  <Link to={`/publication/${index}`} className="action-link">
                    Ver detalhes
                  </Link>
                  <Link to={`/editar-publicacao/${index}`} className="action-button">
                    ✏️ Editar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPublications.length === 0 && (
        <div className="empty-state">
          <p>Nenhuma publicação encontrada.</p>
        </div>
      )}
    </div>
  );
}

export default Publicações;
