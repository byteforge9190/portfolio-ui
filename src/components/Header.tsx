// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-400 hover:text-teal-200 transition-colors">
          My Portfolio OS
        </Link>
        <div className="space-x-6 text-lg">
          {/* Why: Use Link component for client-side routing. */}
          <Link to="/projects" className="hover:text-teal-400 transition-colors">Projects</Link>
          <Link to="/skills" className="hover:text-teal-400 transition-colors">Skills</Link>
          <Link to="/experience" className="hover:text-teal-400 transition-colors">Experience</Link>
          <Link to="/login" className="hover:text-teal-400 transition-colors">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;