
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Perfil from './components/Perfil';
import Publicações from './components/Publicações';
import Projetos from './components/Projetos';
import Buscar from './components/Buscar';
import EditarPerfil from './components/EditarPerfil';
import Login from './components/Login';
import EditarPublicação from './components/EditarPublicação';
import EditarProjeto from './components/EditarProjeto';
import Pesquisador from './components/Pesquisador';
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    name: "Dr. João Silva",
    orcidId: "0000-0000-0000-0000",
    institution: "Universidade Federal do Brasil",
    department: "Departamento de Ciência da Computação",
    bio: "Pesquisador especializado em inteligência artificial e aprendizado de máquina.",
    researchAreas: ["Inteligência Artificial", "Aprendizado de Máquina", "Processamento de Linguagem Natural"],
    email: "joao.silva@ufb.edu.br",
    institutionalPage: "https://www.ufb.edu.br/joao-silva"
  });

  const [publications, setPublications] = useState([
    {
      title: "Machine Learning Applications in Healthcare",
      authors: [{ name: "João Silva", orcidId: "0000-0000-0000-0000" }],
      year: 2023,
      type: "Journal Article",
      source: "Journal of Medical AI",
      abstract: "Este artigo explora aplicações de aprendizado de máquina na área da saúde...",
      identifier: { type: "DOI", value: "10.1000/xyz123" }
    },
    {
      title: "Deep Learning for Natural Language Processing",
      authors: [{ name: "João Silva", orcidId: "0000-0000-0000-0000" }],
      year: 2022,
      type: "Conference Paper",
      source: "International Conference on AI",
      abstract: "Uma análise abrangente das técnicas de deep learning para NLP...",
      identifier: { type: "DOI", value: "10.1000/abc456" }
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Projeto de IA para Diagnóstico Médico",
      description: "Desenvolvimento de sistema de inteligência artificial para auxiliar no diagnóstico médico precoce.",
      startYear: 2022,
      endYear: 2024,
      funding: "CNPq",
      role: "Coordenador"
    },
    {
      id: "2", 
      name: "Processamento de Linguagem Natural",
      description: "Pesquisa em técnicas avançadas de processamento de linguagem natural para português brasileiro.",
      startYear: 2021,
      endYear: "Atual",
      funding: "FAPESP",
      role: "Pesquisador Principal"
    }
  ]);

  const [searchResults, setSearchResults] = useState([
    {
      name: "Dr. Maria Santos",
      orcidId: "0000-0000-0000-0001",
      institution: "Universidade de São Paulo",
      department: "Instituto de Matemática",
      researchAreas: ["Estatística", "Ciência de Dados"],
      publications: [],
      projects: []
    },
    {
      name: "Dr. Pedro Costa",
      orcidId: "0000-0000-0000-0002", 
      institution: "UNICAMP",
      department: "Faculdade de Engenharia",
      researchAreas: ["Robótica", "Automação"],
      publications: [],
      projects: []
    }
  ]);

  // useEffect(() => {
  //   // Buscar dados do ORCID
  //   const fetchOrcidData = async () => {
  //     try {
  //       const response = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/record`);
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error('Erro ao buscar dados do ORCID:', error);
  //     }
  //   };
  //   fetchOrcidData();
  // }, []);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Perfil userData={userData} publications={publications} projects={projects} />} />
            <Route path="/publicacoes" element={<Publicações publications={publications} setPublications={setPublications} />} />
            <Route path="/projetos" element={<Projetos projects={projects} setProjects={setProjects} />} />
            <Route path="/buscar" element={<Buscar searchResults={searchResults} setSearchResults={setSearchResults} />} />
            <Route path="/editar-perfil" element={<EditarPerfil userData={userData} setUserData={setUserData} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editar-publicacao/:id" element={<EditarPublicação publications={publications} setPublications={setPublications} />} />
            <Route path="/editar-projeto/:id" element={<EditarProjeto projects={projects} setProjects={setProjects} />} />
            <Route path="/pesquisador/:id" element={<Pesquisador searchResults={searchResults} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
