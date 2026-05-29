import { BookCard } from './BookCard';

export const BookList = ({ books, onFavorite }) => {
  if (!books || books.length === 0) return null;

  return (
    <div className="results-grid">
      {books.map((book, index) => (
        <BookCard 
          key={index} 
          book={book} 
          onFavorite={onFavorite} 
        />
      ))}
    </div>
  );
};