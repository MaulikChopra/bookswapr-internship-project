"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";

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
  ownerId,
  onMarkAsRented,
  onDelete,
}) => {
  const { toast } = useToast();
  const { user } = useUser();

  const handleMarkAsRented = async () => {
    if (!user || user.id !== ownerId) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "You are not authorized to mark this book as rented.",
      });
      return;
    }
    try {
      //   const response = await fetch(`/api/books/${id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ isRented: true }),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Failed to mark book as rented");
      //   }

      //   toast({
      //     title: "Success!",
      //     description: "Book marked as rented successfully.",
      //   });
      onMarkAsRented();
    } catch (error: any) {
      console.error("Error marking book as rented:", error);
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          error.message ||
          "An error occurred while marking the book as rented.",
      });
    }
  };

  const handleDelete = () => {
    if (!user || user.id !== ownerId) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "You are not authorized to delete this book.",
      });
      return;
    }
    onDelete(id);
  };

  //make sure the user is the owner of the book
  const isOwner = user && user.id === ownerId && user.role === "owner";
  const [bookOwner, setBookOwner] = useState<any>(null);
  // Fetch the book owner details
  useEffect(() => {
    const getOwnerDetails = async () => {
      try {
        const response = await fetch(`/api/user/${ownerId}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to get book ownerdata");
        }
        const data = await response.json();
        setBookOwner(data);
        console.log(bookOwner);
      } catch (err: any) {}
    };
    getOwnerDetails();
  }, [ownerId]);

  return (
    <Card className="w-full md:w-80">
      <CardHeader className="p-0">
        {coverImage && (
          <img
            src={coverImage}
            alt={`${title} Cover`}
            className="w-full h-48 object-cover rounded-md"
            onError={(e: any) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src =
                "https://www.shutterstock.com/image-vector/realistic-old-book-cover-antique-600nw-2353401503.jpg"; // Fallback image
            }}
          />
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">by {author}</p>
        <p className="mt-2">Genre: {genre}</p>
        <p>Location: {location}</p>
        <p className="mt-2 font-semibold">Owned by: {bookOwner?.name}</p>
        <p className="italic">
          {" "}
          {bookOwner?.phone}, {bookOwner?.username}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        {isOwner && (
          <>
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
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
