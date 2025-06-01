
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">ORCID++</h1>
        <p className="hero-subtitle">Conectando pesquisadores, compartilhando conhecimento científico</p>
        <div className="hero-buttons">
          <Link to="/buscar" className="btn btn-primary">
            🔍 Buscar Pesquisadores
          </Link>
          <Link to="/publicacoes" className="btn btn-secondary">
            📚 Ver Publicações
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Conecte-se</h3>
          <p>Encontre pesquisadores com interesses similares e estabeleça novas colaborações acadêmicas.</p>
          <Link to="/buscar" className="feature-link">Explorar Pesquisadores</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📖</div>
          <h3>Publicações</h3>
          <p>Descubra as mais recentes pesquisas e publicações científicas da comunidade acadêmica.</p>
          <Link to="/publicacoes" className="feature-link">Ver Publicações</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">💼</div>
          <h3>Projetos</h3>
          <p>Conheça os projetos de pesquisa em andamento e oportunidades de colaboração.</p>
          <Link to="/projetos" className="feature-link">Explorar Projetos</Link>
        </div>
      </div>
      
      <div className="benefits-section">
        <h2>Benefícios do ORCID++</h2>
        <div className="benefits-grid">
          <div className="benefit-column">
            <h3>Para Pesquisadores</h3>
            <ul>
              <li>Aumente a visibilidade do seu trabalho acadêmico</li>
              <li>Encontre colaboradores para novos projetos</li>
              <li>Gerencie suas publicações e projetos em um só lugar</li>
              <li>Conecte-se com a comunidade científica global</li>
            </ul>
          </div>
          <div className="benefit-column">
            <h3>Para Instituições</h3>
            <ul>
              <li>Promova as pesquisas da sua instituição</li>
              <li>Descubra talentos e especialistas</li>
              <li>Acompanhe a produção científica dos seus pesquisadores</li>
              <li>Estabeleça parcerias interinstitucionais</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
