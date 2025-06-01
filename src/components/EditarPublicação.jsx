
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarPublicação({ publications, setPublications }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publication, setPublication] = useState(null);

  useEffect(() => {
    const foundPub = publications[parseInt(id)];
    if (foundPub) {
      setPublication({ ...foundPub });
    }
  }, [id, publications]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuthorChange = (index, field, value) => {
    setPublication(prev => {
      const newAuthors = [...prev.authors];
      newAuthors[index] = { ...newAuthors[index], [field]: value };
      return { ...prev, authors: newAuthors };
    });
  };

  const addAuthor = () => {
    setPublication(prev => ({
      ...prev,
      authors: [...prev.authors, { name: '', orcidId: '' }]
    }));
  };

  const removeAuthor = (index) => {
    setPublication(prev => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const updatedPublications = [...publications];
    updatedPublications[parseInt(id)] = publication;
    setPublications(updatedPublications);
    alert('Publicação salva com sucesso!');
    navigate('/publicacoes');
  };

  if (!publication) {
    return (
      <div className="editar-publicacao-container">
        <div className="error-message">
          <h2>Publicação não encontrada</h2>
          <button onClick={() => navigate('/publicacoes')} className="btn btn-primary">
            Voltar para Publicações
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-publicacao-container">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="btn btn-outline">
          ← Voltar
        </button>
        <h1>Editar Publicação</h1>
      </div>

      <div className="publication-form">
        <div className="form-group">
          <label>Título</label>
          <input 
            type="text"
            name="title" 
            value={publication.title} 
            onChange={handleInputChange} 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Autores</label>
          <div className="authors-list">
            {publication.authors.map((author, index) => (
              <div key={index} className="author-row">
                <input 
                  type="text"
                  placeholder="Nome"
                  value={author.name}
                  onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                  className="form-input"
                />
                <input 
                  type="text"
                  placeholder="ORCID ID"
                  value={author.orcidId}
                  onChange={(e) => handleAuthorChange(index, 'orcidId', e.target.value)}
                  className="form-input"
                />
                <button 
                  type="button"
                  onClick={() => removeAuthor(index)}
                  className="btn btn-danger"
                  disabled={publication.authors.length <= 1}
                >
                  🗑️
                </button>
              </div>
            ))}
            <button 
              type="button"
              onClick={addAuthor} 
              className="btn btn-secondary"
            >
              ➕ Adicionar autor
            </button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ano</label>
            <input 
              type="number"
              name="year" 
              value={publication.year} 
              onChange={handleInputChange} 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <select
              name="type" 
              value={publication.type} 
              onChange={handleInputChange} 
              className="form-select"
            >
              <option value="Journal Article">Journal Article</option>
              <option value="Conference Paper">Conference Paper</option>
              <option value="Book Chapter">Book Chapter</option>
              <option value="Book">Book</option>
              <option value="Report">Report</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Fonte</label>
          <input 
            type="text"
            name="source" 
            value={publication.source} 
            onChange={handleInputChange} 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Resumo</label>
          <textarea 
            name="abstract" 
            value={publication.abstract} 
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

export default EditarPublicação;
