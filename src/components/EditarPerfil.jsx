
import React, { useState } from 'react';

function EditarPerfil({ userData, setUserData }) {
  const [formData, setFormData] = useState({ ...userData });
  const [newArea, setNewArea] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addResearchArea = () => {
    if (!newArea.trim()) return;
    setFormData(prev => ({
      ...prev,
      researchAreas: [...prev.researchAreas, newArea]
    }));
    setNewArea('');
  };

  const removeResearchArea = (index) => {
    setFormData(prev => ({
      ...prev,
      researchAreas: prev.researchAreas.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserData(formData);
    alert('Perfil salvo com sucesso!');
  };

  return (
    <div className="editar-perfil-container">
      <h1>Editar Perfil</h1>
      
      <form onSubmit={handleSave} className="profile-form">
        <div className="form-section">
          <h2>Informações Básicas</h2>
          
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>ORCID ID</label>
            <input
              type="text"
              name="orcidId"
              value={formData.orcidId}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Instituição</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Departamento</label>
            <input
              type="text"
              name="department"
              value={formData.department || ''}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Biografia</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="form-textarea"
              rows="4"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h2>Áreas de Pesquisa</h2>
          
          <div className="research-areas-manager">
            <div className="current-areas">
              {formData.researchAreas.map((area, index) => (
                <div key={index} className="area-tag">
                  <span>{area}</span>
                  <button 
                    type="button" 
                    onClick={() => removeResearchArea(index)}
                    className="remove-btn"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
            
            <div className="add-area">
              <input
                type="text"
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                placeholder="Adicionar área de pesquisa"
                className="form-input"
              />
              <button 
                type="button" 
                onClick={addResearchArea}
                className="btn btn-secondary"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Links Externos</h2>
          
          <div className="form-group">
            <label>Página Institucional</label>
            <input
              type="url"
              name="institutionalPage"
              value={formData.institutionalPage}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            💾 Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarPerfil;
