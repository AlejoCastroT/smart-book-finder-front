export const BookCard = ({ book, onFavorite }) => {
  return (
    <div className="book-card">
      {book.coverUrl ? (
        <img src={book.coverUrl} alt={`Portada de ${book.title}`} />
      ) : (
        <div className="no-cover">Sin Portada</div>
      )}
      <h3>{book.title}</h3>
      <p><strong>Autor:</strong> {book.author}</p>
      <p><strong>Año:</strong> {book.publishedYear}</p>
      <p><strong>Ediciones:</strong> {book.editions}</p>
      <button onClick={() => onFavorite(book)} className="fav-btn">
        ⭐ Favorito
      </button>
    </div>
  );
};