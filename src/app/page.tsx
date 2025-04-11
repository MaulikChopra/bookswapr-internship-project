
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-soft-blue">
      <h1 className="text-4xl font-bold mb-4">Welcome to BookSwapr</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Find your next favorite book or share your beloved reads with others.
      </p>
      <div className="space-x-4">
        <Link href="/login">
          <Button variant="default">Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline">Signup</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
