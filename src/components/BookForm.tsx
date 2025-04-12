import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Book } from '@/types/Book';
import { useUser } from '@/components/UserContext';

const FormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  author: z.string().min(2, { message: 'Author must be at least 2 characters.' }),
  genre: z.string().min(2, { message: 'Genre must be at least 2 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  contact: z.string().min(5, { message: 'Contact information must be at least 5 characters.' }),
  coverImage: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

interface BookFormProps {
  onSuccess: (book: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
   const { user } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      city: '',
      contact: '',
      coverImage: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, ownerId: user?.id || 1}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add book');
      }

      const newBook = await response.json();

      toast({
        title: 'Book Added!',
        description: 'Your book has been added successfully.',
      });
      setIsOpen(true);
      onSuccess(newBook);

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error adding book!',
        description: error.message || 'An error occurred while adding the book.',
      });
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  return (
    <>
     <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Added Successfully</DialogTitle>
          <DialogDescription>Your book has been added.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input placeholder="Enter book genre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter city/location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email/Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter cover image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Book'}
        </Button>
      </form>
    </Form>
    </>
  );
};

export default BookForm;
