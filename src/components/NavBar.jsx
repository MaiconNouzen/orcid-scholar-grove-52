
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <div className="logo">
              <span className="logo-icon">🔬</span>
              <span className="logo-text">ORCID++</span>
            </div>
          </Link>
        </div>
        
        <div className="navbar-menu">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            Home
          </Link>
          <Link to="/perfil" className={location.pathname === '/perfil' ? 'nav-link active' : 'nav-link'}>
            Perfil
          </Link>
          <Link to="/publicacoes" className={location.pathname === '/publicacoes' ? 'nav-link active' : 'nav-link'}>
            Publicações
          </Link>
          <Link to="/projetos" className={location.pathname === '/projetos' ? 'nav-link active' : 'nav-link'}>
            Projetos
          </Link>
          <Link to="/buscar" className={location.pathname === '/buscar' ? 'nav-link active' : 'nav-link'}>
            Buscar
          </Link>
          <Link to="/editar-perfil" className={location.pathname === '/editar-perfil' ? 'nav-link active' : 'nav-link'}>
            Editar Perfil
          </Link>
          <Link to="/login" className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
