// src/components/Header.tsx
// Why: This header component provides navigation and shows authentication status with role information

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, isOwner } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      owner: 'bg-purple-600 text-purple-100',
      admin: 'bg-blue-600 text-blue-100',
      viewer: 'bg-green-600 text-green-100'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${roleColors[role as keyof typeof roleColors] || 'bg-gray-600 text-gray-100'}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 shadow-md border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo/Title */}
        <Link to="/" className="text-2xl font-bold text-teal-300 hover:text-teal-200 transition-colors">
          Portfolio
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/projects" className="text-gray-300 hover:text-teal-300 transition-colors">
            Projects
          </Link>
          <Link to="/skills" className="text-gray-300 hover:text-teal-300 transition-colors">
            Skills
          </Link>
          <Link to="/experience" className="text-gray-300 hover:text-teal-300 transition-colors">
            Experience
          </Link>
          <Link to="/profile" className="text-gray-300 hover:text-teal-300 transition-colors">
            Profile
          </Link>
          <Link to="/learning" className="text-gray-300 hover:text-teal-300 transition-colors">
            Learning
          </Link>
          {/* Show dashboard link only for users who can manage content */}
          {isOwner() && (
            <Link to="/dashboard" className="text-gray-300 hover:text-teal-300 transition-colors">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-300 text-2xl focus:outline-none">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Authentication Section (Mobile - shown next to hamburger) */}
        <div className="md:hidden flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 text-xs truncate">{user?.email}</span>
              {user?.role && getRoleBadge(user.role)}
            </div>
          ) : (
            <div className="flex space-x-1">
              <Link
                to="/login"
                className="bg-teal-600 text-white px-3 py-1 rounded-lg text-xs"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-600 text-white px-3 py-1 rounded-lg text-xs"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Authentication Section (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              {/* User Information */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">{user?.email}</span>
                {user?.role && getRoleBadge(user.role)}
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu (Toggled) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 px-4 py-2">
          <div className="flex flex-col space-y-2">
            <Link to="/projects" className="text-gray-300 hover:text-teal-300 transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </Link>
            <Link to="/skills" className="text-gray-300 hover:text-teal-300 transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
              Skills
            </Link>
            <Link to="/experience" className="text-gray-300 hover:text-teal-300 transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
              Experience
            </Link>
            <Link to="/profile" className="text-gray-300 hover:text-teal-300 transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
              Profile
            </Link>
            <Link to="/learning" className="text-gray-300 hover:text-teal-300 transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
              Learning
            </Link>
            {isOwner() && (
              <Link to="/dashboard" className="text-gray-300 hover:text-teal-300 transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            {/* Mobile Auth Buttons (full width) */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm w-full text-left mt-2"
              >
                Logout ({user?.email})
              </button>
            ) : (
              <div className="flex flex-col space-y-2 mt-2">
                <Link
                  to="/login"
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm w-full text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm w-full text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;