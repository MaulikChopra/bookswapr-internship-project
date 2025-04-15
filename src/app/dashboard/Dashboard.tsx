"use client";

import React, { useState, useEffect } from "react";
import BookForm from "@/components/BookForm";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import { Book } from "@/types/Book"; // Assuming you have a Book interface
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  cardVariants,
  listVariants,
  filterVariants,
  formVariants,
} from "@/lib/animations";

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { user } = useUser();
  useEffect(() => {
    console.log(user);

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch books");
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
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      // Optimistically update the UI
      setBooks((prevBooks) =>
        prevBooks.filter((book) => String(book.id) !== id)
      );
    } catch (err: any) {}
  };

  const handleMarkAsRented = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRented: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark book as rented");
      }

      // Update book state to reflect being rented
      setBooks((prevBooks) => {
        return prevBooks.map((book) => {
          if (String(book.id) === id) {
            return { ...book, isRented: true }; // Optimistically update
          }
          return book;
        });
      });
    } catch (err: any) {}
  };

  const handleBookAdded = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
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
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }
    if (selectedLocation) {
      filtered = filtered.filter((book) => book.city === selectedLocation);
    }
    return filtered;
  }, [books, selectedGenre, selectedLocation]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <div className="container mx-auto p-4">
        {user?.role === "owner" && (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
            <h2 className="text-xl font-bold mb-4">Add new book Listing</h2>
            <BookForm onSuccess={handleBookAdded} />
          </motion.div>
        )}

        <motion.div
          variants={filterVariants}
          initial="hidden"
          animate="visible"
          className="my-4"
        >
          <div className="border-b border my-2"></div>
          <h1 className="text-2xl font-bold my-4">Browse Books</h1>

          <FilterBar
            onFilterChange={handleFilterChange}
            genres={books ? [...new Set(books.map((book) => book.genre))] : []}
            locations={
              books ? [...new Set(books.map((book) => book.city))] : []
            }
          />
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-center p-4"
          >
            Error: {error}
          </motion.div>
        ) : (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListingCard
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Dashboard;
