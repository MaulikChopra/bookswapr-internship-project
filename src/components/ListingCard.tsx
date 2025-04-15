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
import { motion } from "framer-motion";
import Image from "next/image";

interface ListingCardProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  location: string;
  coverImage: string;
  isRented: boolean;
  onMarkAsRented: () => void;
  onDelete: (id: string) => void;
  ownerId: number;
}

export const ListingCard = ({
  id,
  title,
  author,
  genre,
  location,
  coverImage,
  isRented,
  onMarkAsRented,
  onDelete,
  ownerId,
}: ListingCardProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const isOwner = user?.id === ownerId;

  const handleMarkAsRented = async () => {
    try {
      onMarkAsRented();
      toast({
        title: "Success",
        description: "Book marked as rented successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark book as rented",
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  //make sure the user is the owner of the book
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
    <motion.div
      className="group relative overflow-hidden rounded-lg bg-card shadow-lg mx-4 my-4"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-auto w-auto overflow-hidden  rounded-lg">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="relative h-full w-full"
        >
          {coverImage && (
            // <Image
            //   src={coverImage}
            //   width={500}
            //   height={500}
            //   alt={`${title} Cover`}
            //   className="w-full h-48 object-cover rounded-md"
            //   onError={(e: any) => {
            //     e.target.onerror = null; // Prevent infinite loop
            //     e.target.src =
            //       "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=3090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            //   }}
            //   // src={
            //   //   coverImage
            //   //     ? coverImage
            //   //     : "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=3090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            //   // }
            //   // alt={title}
            //   // fill
            //   // className="object-cover"
            // />
            <img
              src={coverImage}
              alt={`${title} Cover`}
              className="w-full h-full object-cover rounded-md"
              onError={(e: any) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src =
                  "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=3090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
              }}
            />
          )}
        </motion.div>
        {isRented && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
          >
            Rented
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-red-500/100  via-red-500/70 to-transparent pt-24 rounded-lg"
      >
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
        /> */}
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-300 mb-2">{author}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
            {genre}
          </span>
          <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full">
            {location}
          </span>
        </div>
        <p className="text-sm italic">
          Owned by: {ownerId === user?.id ? "You" : bookOwner?.name}
        </p>
        <p className="text-sm italic">Contact: {bookOwner?.phone}</p>

        <div className="flex gap-2">
          {!isRented && !isOwner && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                size="sm"
                onClick={handleMarkAsRented}
                className="w-full"
              >
                Rent Now
              </Button>
            </motion.div>
          )}
          {isOwner && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="w-full"
              >
                Delete
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ListingCard;
