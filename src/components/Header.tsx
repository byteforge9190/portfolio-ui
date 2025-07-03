// src/components/Header.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // Import our auth store

const Header: React.FC = () => {
  // Why: Get isAuthenticated status and logout function from the store.
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear state and localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-400 hover:text-teal-200 transition-colors">
          My Portfolio OS
        </Link>
        <div className="flex items-center space-x-6 text-lg">
          <Link to="/projects" className="hover:text-teal-400 transition-colors">Projects</Link>
          <Link to="/skills" className="hover:text-teal-400 transition-colors">Skills</Link>
          <Link to="/experience" className="hover:text-teal-400 transition-colors">Experience</Link>
          {/* Why: Conditionally render links based on authentication status. */}
          {isAuthenticated ? (
            <>
              {/* Display user's email as a profile link */}
              <Link to="/dashboard" className="hover:text-teal-400 transition-colors">
                <span className="font-semibold text-teal-200">{user?.email}</span>
              </Link>
              <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-teal-400 transition-colors">Login</Link>
              <Link to="/register" className="bg-teal-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;