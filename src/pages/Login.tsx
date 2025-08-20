// src/pages/Login.tsx
// Why: This component provides a login form for existing users with role-based authentication.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authAPI, handleAPIError } from '../api/services';
import { toast } from 'react-toastify';
import type { ApiError } from '../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login, setLoading: setAuthLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setAuthLoading(true);

    try {
      // Why: Call our backend's login endpoint using the new API service
      const response = await authAPI.login(email, password);
      
      // Why: Use the login function from our Zustand store to save the token and user
      login(response.token, response.user);

      // Why: Show success message with role information
      toast.success(`Welcome back! Logged in as ${response.user.role}.`);

      // Why: Redirect based on user role
      if (response.user.role === 'owner' || response.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/projects');
      }
    } catch (err: unknown) {
      const message = handleAPIError(err as ApiError);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-lg shadow-xl bg-gray-800 border border-gray-700 mt-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-teal-300">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your password"
          />
        </div>
        {error && (
          <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-teal-400 hover:text-teal-300 underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;