export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  city: string;
  contact: string;
  coverImage?: string;
  isRented: boolean;
  ownerId: number;
};
