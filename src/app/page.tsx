'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Icons} from "@/components/icons";
import {useTheme} from "next-themes";
import Image from 'next/image';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const {setTheme, theme} = useTheme();

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
              <li>
                {theme === "light" ? (
                  <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
                    <Icons.dark className="h-4 w-4"/>
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
                    <Icons.light className="h-4 w-4"/>
                  </Button>
                )}
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
      <section className="py-20 bg-soft-blue relative">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Unlock a World of Stories
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Join our community of book lovers and discover your next favorite
            read. Share, exchange, and explore new literary adventures.
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
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Books Background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
            Explore the Endless Possibilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Discover Hidden Gems
              </h3>
              <p className="text-muted-foreground">
                Unearth a treasure trove of books from classic literature to
                contemporary bestsellers.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 1"
                width={500}
                height={300}
                className="rounded-md mt-4"
              />
            </div>
            {/* Feature Card 2 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Share Your Literary Treasures
              </h3>
              <p className="text-muted-foreground">
                List your cherished books and give them a new life with fellow
                book enthusiasts.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1485230895905-ec33b3f8bc63?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 2"
                width={500}
                height={300}
                className="rounded-md mt-4"
              />
            </div>
            {/* Feature Card 3 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Connect with Bookworms
              </h3>
              <p className="text-muted-foreground">
                Build meaningful connections with like-minded readers and
                expand your literary horizons.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1517842067814-9c0dca28b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 3"
                width={500}
                height={300}
                className="rounded-md mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-soft-blue">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
            From Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Review Card 1 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start mb-4">
                <Image
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  alt="Jane Doe"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="text-muted-foreground italic mb-2">
                    "BookSwapr has transformed my reading life! I've discovered
                    authors I never would have found otherwise."
                  </p>
                  <p className="font-semibold text-foreground">Jane Doe</p>
                </div>
              </div>
            </div>
            {/* Review Card 2 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start mb-4">
                <Image
                  src="https://randomuser.me/api/portraits/men/83.jpg"
                  alt="John Smith"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="text-muted-foreground italic mb-2">
                    "I love being able to exchange books with others and give my
                    old favorites a new home. It's a win-win!"
                  </p>
                  <p className="font-semibold text-foreground">John Smith</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Ready to Dive In?
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Join BookSwapr today and become part of a thriving community of
            book lovers. Start exploring, sharing, and connecting now!
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary">Sign Up</Button>
            </Link>
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
