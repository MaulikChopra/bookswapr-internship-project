'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [router]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-secondary py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-foreground">
            BookSwapr
          </Link>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link href="/#features" className="hover:text-accent">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-accent">
                  Reviews
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li>
                    <Link href="/login" className="hover:text-accent">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup">
                      <Button variant="outline">Sign Up</Button>
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li>
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('role');
                      setIsLoggedIn(false);
                      router.push('/login');
                    }}
                  >
                    Logout
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-soft-blue">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Join our community of book lovers and find your next adventure.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="default">Browse Books</Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary">List Your Books</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Extensive Book Collection
              </h3>
              <p className="text-muted-foreground">
                Browse through thousands of books from various genres and
                authors.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Easy Book Listing
              </h3>
              <p className="text-muted-foreground">
                List your own books for others to discover and enjoy.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Secure Exchanges
              </h3>
              <p className="text-muted-foreground">
                Connect with other users and arrange secure book exchanges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-soft-blue">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Review Card 1 */}
            <div className="p-6 bg-card rounded-lg shadow-md">
              <p className="text-muted-foreground italic mb-4">
                "BookSwapr has been a game-changer for me! I've discovered so
                many new authors and made some great connections."
              </p>
              <p className="font-semibold text-foreground">- Jane Doe</p>
            </div>
            {/* Review Card 2 */}
            <div className="p-6 bg-card rounded-lg shadow-md">
              <p className="text-muted-foreground italic mb-4">
                "I love how easy it is to list my books and find new homes for
                them. It's a win-win for everyone!"
              </p>
              <p className="font-semibold text-foreground">- John Smith</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BookSwapr. All rights reserved.
          </p>
          <nav className="mt-4">
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-accent mx-2"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-accent mx-2"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
