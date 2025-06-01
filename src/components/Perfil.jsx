
import React from 'react';
import { Link } from 'react-router-dom';

function Perfil({ userData, publications, projects }) {
  return (
    <div className="perfil-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {userData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
        <div className="profile-info">
          <h1>{userData.name}</h1>
          <p className="institution">{userData.institution}</p>
          {userData.department && <p className="department">{userData.department}</p>}
          <div className="orcid-badge">
            <span>ORCID: </span>
            <a href={`https://orcid.org/${userData.orcidId}`} target="_blank" rel="noopener noreferrer">
              {userData.orcidId}
            </a>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-main">
          <div className="bio-section">
            <h2>Biografia</h2>
            <p>{userData.bio}</p>
            <div className="research-areas">
              {userData.researchAreas.map((area, index) => (
                <span key={index} className="research-tag">{area}</span>
              ))}
            </div>
          </div>

          <div className="publications-section">
            <div className="section-header">
              <h2>Publicações Acadêmicas</h2>
              <Link to="/publicacoes" className="btn btn-outline">Ver todas</Link>
            </div>
            <div className="publications-list">
              {publications.slice(0, 3).map((pub, index) => (
                <div key={index} className="publication-item">
                  <h3>{pub.title}</h3>
                  <p className="authors">{pub.authors.map(a => a.name).join(', ')}</p>
                  <div className="publication-meta">
                    <span className="pub-type">{pub.type}</span>
                    <span className="pub-year">{pub.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="projects-section">
            <div className="section-header">
              <h2>Projetos de Pesquisa</h2>
              <Link to="/projetos" className="btn btn-outline">Ver todos</Link>
            </div>
            <div className="projects-list">
              {projects.slice(0, 2).map((project) => (
                <div key={project.id} className="project-item">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-meta">
                    <span>📅 {project.startYear} - {project.endYear}</span>
                    {project.funding && <span>💰 {project.funding}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="profile-sidebar">
          <div className="links-section">
            <h3>Links Acadêmicos</h3>
            <ul className="links-list">
              <li>
                <a href={userData.institutionalPage} target="_blank" rel="noopener noreferrer">
                  🔗 Página Institucional
                </a>
              </li>
              <li>
                <a href={`https://orcid.org/${userData.orcidId}`} target="_blank" rel="noopener noreferrer">
                  🔗 Perfil ORCID
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
