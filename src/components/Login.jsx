
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const handleOrcidLogin = () => {
    // window.location.href = 'https://orcid.org/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&scope=/authenticate&redirect_uri=YOUR_REDIRECT_URI';
    alert('Redirecionando para login ORCID...');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-large">
            🔬
          </div>
          <h1>ORCID++</h1>
          <p>Entre com sua conta ORCID</p>
        </div>

        <div className="login-content">
          <h2>Fazer Login</h2>
          <p>Acesse sua conta usando seu ORCID iD</p>
          
          <button 
            onClick={handleOrcidLogin}
            className="orcid-login-btn"
          >
            <div className="orcid-icon">🆔</div>
            Entrar com ORCID iD
            <span className="external-icon">↗️</span>
          </button>

          <div className="login-info">
            <h4>O que é ORCID?</h4>
            <p>
              ORCID é um identificador único e persistente para pesquisadores. 
              Conecta você com suas atividades de pesquisa e garante que seu trabalho seja devidamente creditado.
            </p>
          </div>

          <div className="login-footer">
            <p>
              Não tem um ORCID iD?{' '}
              <a href="https://orcid.org/register" target="_blank" rel="noopener noreferrer">
                Criar conta
              </a>
            </p>
          </div>
        </div>

        <div className="terms">
          <p>
            Ao continuar, você concorda com nossos{' '}
            <a href="/terms">Termos de Uso</a>{' '}
            e{' '}
            <a href="/privacy">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
