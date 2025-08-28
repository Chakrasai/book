
/**
 * App Component
 * -------------
 * The root component of the Book Finder application.
 * - Handles routing between the landing page and the main book search page.
 * - Manages global state for book search query, results, loading, and error.
 * - Delegates UI to LandingPage, BookFinderMain, and Card components.
 *
 * Functionality:
 *   - Shows a welcoming landing page for Alex.
 *   - On clicking start, transitions to the main book search page.
 *   - Allows searching for books by title using the Open Library API.
 *   - Displays results in styled cards with cover, title, author, and year.
 *   - Handles loading and error states gracefully.
 */

import { useState } from 'react';
import LandingPage from './LandingPage';
import BookFinderMain from './BookFinderMain';
import Card from './Card';
import './App.css';


function App() {
  const [showMain, setShowMain] = useState(false);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchBooks = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBooks([]);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`);
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch books. Please try again.');
    }
    setLoading(false);
  };

  if (!showMain) {
    return <LandingPage onStart={() => setShowMain(true)} />;
  }

  return (
    <BookFinderMain>
      <h1 className="text-4xl font-bold text-center mt-8 mb-2 text-blue-700">Book Finder</h1>
      <p className="subtitle text-center text-gray-600 mb-6">Hi Alex! Search for your favorite books below.</p>
      <form
        onSubmit={searchBooks}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Search by book title..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="search-input px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-72"
        />
        <button
          type="submit"
          className="search-btn px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading || !query.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && (
        <div className="error text-center text-red-600 mb-4">{error}</div>
      )}
      <div className="books-list max-w-5xl mx-auto">
        {books.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Results</h2>
            <div className="book-cards-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.slice(0, 20).map(book => (
                <Card key={book.key} className="book-card bg-white rounded-lg shadow p-4 flex flex-col">
                  <div className="cover flex justify-center mb-3">
                    {book.cover_i ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                        alt={book.title}
                        className="h-40 w-auto object-cover rounded"
                      />
                    ) : (
                      <div className="no-cover flex items-center justify-center h-40 w-28 bg-gray-200 text-gray-500 rounded">
                        No Cover
                      </div>
                    )}
                  </div>
                  <div className="book-info flex-1 flex flex-col">
                    <strong className="text-lg mb-1">{book.title}</strong>
                    <div className="text-gray-700 mb-1">
                      by {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                    </div>
                    <div className="year text-sm text-gray-500 mt-auto">
                      First published: {book.first_publish_year || 'N/A'}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </BookFinderMain>
  );
}

export default App;
