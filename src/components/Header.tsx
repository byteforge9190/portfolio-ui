// src/components/Header.tsx
// Why: This component represents the navigation header of our portfolio.

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-400">
          My Portfolio OS
        </div>
        <div className="space-x-6 text-lg">
          {/* Why: Placeholder navigation links. We'll add routing later. */}
          <a href="#" className="hover:text-teal-400 transition-colors">Projects</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Skills</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Experience</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Login</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;