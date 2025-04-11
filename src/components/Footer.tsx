'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-4 text-center">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} BookSwapr. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
