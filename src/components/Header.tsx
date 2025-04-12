
'use client';

import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-secondary py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          BookSwapr
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/login" className="hover:text-primary">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-primary">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
