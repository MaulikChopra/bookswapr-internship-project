'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Welcome to BookSwapr
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Find your next favorite book or share your beloved reads with others.
        </p>
      </div>
      <div className="space-x-4">
        <Link href="/login">
          <Button variant="default">Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline">Signup</Button>
        </Link>
      </div>
      <footer className="mt-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BookSwapr. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
