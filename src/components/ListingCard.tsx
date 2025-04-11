'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ListingCardProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  location: string;
  coverImage?: string;
  isRented?: boolean;
  onMarkAsRented: () => void;
  onDelete: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  title,
  author,
  genre,
  location,
  coverImage,
  isRented,
  onMarkAsRented,
  onDelete
}) => {
  const { toast } = useToast();

  const handleMarkAsRented = async () => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark book as rented');
      }

      toast({
        title: 'Success!',
        description: 'Book marked as rented successfully.',
      });
      onMarkAsRented();

    } catch (error: any) {
      console.error('Error marking book as rented:', error);
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: error.message || 'An error occurred while marking the book as rented.',
      });
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Card className="w-full md:w-80">
      <CardHeader>
        {coverImage && (
          <img
            src={coverImage}
            alt={`${title} Cover`}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">by {author}</p>
        <p className="mt-2">Genre: {genre}</p>
        <p>Location: {location}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isRented ? (
          <Button disabled variant="destructive">
            Rented
          </Button>
        ) : (
          <Button onClick={handleMarkAsRented}>Mark as Rented</Button>
        )}
        <Button variant="outline" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
