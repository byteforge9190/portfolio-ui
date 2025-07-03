// src/components/Footer.tsx
// Why: A simple footer for our portfolio.

import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-500 p-4 text-center text-sm mt-auto">
      <div className="container mx-auto">
        &copy; {currentYear} My Production Portfolio OS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;