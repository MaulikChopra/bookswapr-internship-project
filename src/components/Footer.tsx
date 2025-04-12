
'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BookSwapr. All rights reserved.
        </p>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="/terms" className="text-muted-foreground hover:text-accent">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="text-muted-foreground hover:text-accent">
                Privacy Policy
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
