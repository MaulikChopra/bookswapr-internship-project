'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@/components/UserContext';

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
  ownerId: number;
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
  onDelete,
  ownerId
}) => {
  const { toast } = useToast();
  const { user } = useUser();
console.log(user)
  const handleMarkAsRented = async () => {
      if (!user || user.id !== ownerId) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: 'You are not authorized to mark this book as rented.',
        });
        return;
      }
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
     if (!user || user.id !== ownerId) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: 'You are not authorized to delete this book.',
        });
        return;
      }
    onDelete(id);
  };

  const isOwner = user && user.id === ownerId;
  console.log(isOwner)

  return (
    <Card className="w-full md:w-80">
      <CardHeader>
        {coverImage && (
          <img
            src={coverImage}
            alt={`${title} Cover`}
            className="w-full h-48 object-cover rounded-md mb-4"
            onError={(e: any) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "https://picsum.photos/200/300"; // Fallback image
            }}
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
         {isOwner && (
          <>
            {isRented ? (
              <Button disabled variant="destructive">
                Rented
              </Button>
            ) : (
              <Button onClick={handleMarkAsRented}>
                Mark as Rented
              </Button>
            )}
            <Button variant="outline" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
