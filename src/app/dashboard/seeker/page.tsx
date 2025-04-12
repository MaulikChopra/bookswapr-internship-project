
'use client';

import React, { useState, useEffect } from 'react';
import ProfileDropdown from '@/components/ProfileDropdown';
import ListingCard from '@/components/ListingCard';
import FilterBar from '@/components/FilterBar';
import { Book } from '@/types/Book';

const SeekerDashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
      <h1 className="text-2xl font-bold mb-4">Seeker Dashboard</h1>

      <div className="my-4">
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
              onMarkAsRented={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;
