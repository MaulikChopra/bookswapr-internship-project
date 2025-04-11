'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ProfileDropdown from '@/components/ProfileDropdown';
import BookForm from '@/components/BookForm';
import ListingCard from '@/components/ListingCard';
import FilterBar from '@/components/FilterBar';
import { Book } from '@/types/Book'; // Assuming you have a Book interface
import { Button } from "@/components/ui/button"

const OwnerDashboard = () => {
  const queryClient = useQueryClient();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const { isLoading, error, data: books } = useQuery<Book[]>('books', async () => {
    const response = await fetch('/api/books');
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return response.json();
  });

  const deleteBookMutation = useMutation(
    async (id: string) => {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      return;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('books');
        alert('Book deleted successfully');
      },
      onError: (error: Error) => {
        alert(`Error deleting book: ${error.message}`);
      },
    }
  );

  const handleMarkAsRented = (id: string) => {
    // Assuming ListingCard handles the PUT request, just invalidate cache here
    queryClient.invalidateQueries('books');
  };

  const filteredBooks = React.useMemo(() => {
    if (!books) return [];

    let filtered = [...books];
    if (selectedGenre) {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }
    if (selectedLocation) {
      filtered = filtered.filter(book => book.location === selectedLocation);
    }
    return filtered;
  }, [books, selectedGenre, selectedLocation]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <ProfileDropdown />
      </div>
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>

      <BookForm onSuccess={() => queryClient.invalidateQueries('books')} />

      <div className="my-4">
        <FilterBar
          onGenreChange={setSelectedGenre}
          onLocationChange={setSelectedLocation}
          genres={books ? [...new Set(books.map(book => book.genre))] : []}
          locations={books ? [...new Set(books.map(book => book.city))] : []}
        />
      </div>

      {isLoading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
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
              onDelete={deleteBookMutation.mutate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
