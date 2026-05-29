import { useState } from 'react';
import { searchBooks, saveFavorite } from './services/api';
import { SearchForm } from './components/SearchForm';
import { BookList } from './components/BookList';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (payload) => {
    setError('');
    setBooks([]);
    setLoading(true);

    try {
      const results = await searchBooks(payload);
      setBooks(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (book) => {
    try {
      const rawKey = book.title + book.author;
      const bookKey = rawKey.replace(/[^a-zA-Z0-9]/g, '').substring(0, 30); 
      
      await saveFavorite(bookKey);
      alert("¡Libro guardado en favoritos!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="container">
      <h1>📚 Smart Book Finder</h1>
      
      {/* Componente del formulario */}
      <SearchForm onSearch={handleSearch} loading={loading} />

      {/* Manejo de errores */}
      {error && <div className="error-message">⚠️ {error}</div>}

      {/* Componente de la lista de resultados */}
      <BookList books={books} onFavorite={handleFavorite} />
    </div>
  );
}

export default App;