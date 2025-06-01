
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarProjeto({ projects, setProjects }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id);
    if (foundProject) {
      setProject({ ...foundProject });
    }
  }, [id, projects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedProjects = projects.map(p => 
      p.id === id ? project : p
    );
    setProjects(updatedProjects);
    alert('Projeto salvo com sucesso!');
    navigate('/projetos');
  };

  if (!project) {
    return (
      <div className="editar-projeto-container">
        <div className="error-message">
          <h2>Projeto não encontrado</h2>
          <button onClick={() => navigate('/projetos')} className="btn btn-primary">
            Voltar para Projetos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-projeto-container">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="btn btn-outline">
          ← Voltar
        </button>
        <h1>Editar Projeto</h1>
      </div>

      <div className="project-form">
        <div className="form-group">
          <label>Nome do Projeto</label>
          <input 
            type="text"
            name="name" 
            value={project.name} 
            onChange={handleInputChange} 
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ano de Início</label>
            <input 
              type="number"
              name="startYear" 
              value={project.startYear} 
              onChange={handleInputChange} 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Ano de Término</label>
            <input 
              type="text"
              name="endYear" 
              value={project.endYear} 
              onChange={handleInputChange} 
              className="form-input"
              placeholder="Em andamento..."
            />
          </div>
        </div>

        <div className="form-group">
          <label>Financiamento</label>
          <input 
            type="text"
            name="funding" 
            value={project.funding || ''} 
            onChange={handleInputChange} 
            className="form-input"
            placeholder="Ex: FAPESP, CNPq, etc."
          />
        </div>

        <div className="form-group">
          <label>Seu Papel no Projeto</label>
          <input 
            type="text"
            name="role" 
            value={project.role || ''} 
            onChange={handleInputChange} 
            className="form-input"
            placeholder="Ex: Coordenador, Pesquisador, etc."
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea 
            name="description" 
            value={project.description} 
            onChange={handleInputChange} 
            rows="5"
            className="form-textarea"
          />
        </div>

        <div className="form-actions">
          <button onClick={handleSave} className="btn btn-primary">
            💾 Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarProjeto;
