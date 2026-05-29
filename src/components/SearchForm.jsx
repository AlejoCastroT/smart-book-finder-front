import { useState } from 'react';

export const SearchForm = ({ onSearch, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    language: '',
    publishedAfter: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = { ...formData };
    
    // Limpiar el idioma si está vacío para que el backend no falle
    if (!payload.language) {
      delete payload.language;
    }
    
    // Formatear el año
    payload.publishedAfter = formData.publishedAfter ? parseInt(formData.publishedAfter) : null;
    
    onSearch(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input type="text" name="title" placeholder="Título del libro" onChange={handleChange} />
      <input type="text" name="author" placeholder="Autor" onChange={handleChange} />
      
      <select name="language" onChange={handleChange}>
        <option value="">Cualquier idioma</option>
        <option value="espanol">Español</option>
        <option value="ingles">Inglés</option>
        <option value="portugues">Portugués</option>
        <option value="frances">Francés</option>
        <option value="aleman">Alemán</option>
      </select>

      <input type="number" name="publishedAfter" placeholder="Publicado después del año..." onChange={handleChange} />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar Libros'}
      </button>
    </form>
  );
};