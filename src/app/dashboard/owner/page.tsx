
'use client';

import React, { useState, useEffect } from 'react';
import ProfileDropdown from '@/components/ProfileDropdown';
import BookForm from '@/components/BookForm';
import ListingCard from '@/components/ListingCard';
import FilterBar from '@/components/FilterBar';
import { Book } from '@/types/Book'; // Assuming you have a Book interface
import { Button } from "@/components/ui/button"
import { useUser } from '@/components/UserContext';

const OwnerDashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        if (user) {
          const ownerBooks = data.filter((book: Book) => book.ownerId === user.id);
          setBooks(ownerBooks);
        } else {
          setBooks([]);
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  const handleDeleteBook = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Optimistically update the UI
      setBooks(prevBooks => prevBooks.filter(book => String(book.id) !== id));
      alert('Book deleted successfully');
    } catch (err: any) {
      alert(`Error deleting book: ${err.message}`);
    }
  };

   const  handleMarkAsRented = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({isRented: true}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to mark book as rented');
      }
  
      // Update book state to reflect being rented
      setBooks(prevBooks => {
        return prevBooks.map(book => {
          if (String(book.id) === id) {
            return { ...book, isRented: true }; // Optimistically update
          }
          return book;
        });
      });
  
      alert('Book marked as rented successfully.');
    } catch (err: any) {
      alert(`Error marking book as rented: ${err.message}`);
    }
  };

  const handleBookAdded = (newBook: Book) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  const handleFilterChange = ({
    genre,
    location,
  }: {
    genre: string | null;
    location: string | null;
  }) => {
    setSelectedGenre(genre);
    setSelectedLocation(location);
  };

  const filteredBooks = React.useMemo(() => {
    if (!books) return [];

    let filtered = [...books];
    if (selectedGenre) {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }
    if (selectedLocation) {
      filtered = filtered.filter(book => book.city === selectedLocation);
    }
    return filtered;
  }, [books, selectedGenre, selectedLocation]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <ProfileDropdown />
      </div>
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <h2 className='text-xl font-bold mb-4'>Add new book Listing</h2>
      <BookForm onSuccess={handleBookAdded} />

      <div className="my-4">
        <div className='border-b border my-2'></div>
      <h1 className="text-2xl font-bold my-4">Browse Books</h1>

        <FilterBar
          onFilterChange={handleFilterChange}
          genres={books ? [...new Set(books.map(book => book.genre))] : []}
          locations={books ? [...new Set(books.map(book => book.city))] : []}
        />
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <ListingCard
              key={book.id}
              id={String(book.id)}
              title={book.title}
              author={book.author}
              genre={book.genre}
              location={book.city}
              coverImage={book.coverImage}
              isRented={book.isRented}
              onMarkAsRented={() => handleMarkAsRented(String(book.id))}
              onDelete={handleDeleteBook}
              ownerId={book.ownerId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
