// src/pages/Register.tsx
// Why: This component provides a registration form for new users with automatic role assignment.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authAPI, handleAPIError } from '../api/services';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login, setLoading: setAuthLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Why: Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Why: Basic password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setAuthLoading(true);

    try {
      // Why: Call our backend's registration endpoint using the new API service
      const response = await authAPI.register(email, password);
      
      // Why: If registration is successful, log the user in automatically
      login(response.token, response.user);

      // Why: Show success message with role information
      const roleMessage = response.user.role === 'owner' 
        ? 'Congratulations! You are now the portfolio owner.' 
        : `Registration successful! You have ${response.user.role} access.`;
      

      toast.success(roleMessage);

      // Why: If registration is successful, log the user in automatically.
      login(response.data.token, response.data.data);


      // Why: Redirect based on user role
      if (response.user.role === 'owner' || response.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/projects');
      }
    } catch (err: unknown) {
      // Why: Handle API errors using our centralized error handler
      const message = handleAPIError(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-lg shadow-xl bg-gray-800 border border-gray-700 mt-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-teal-300">Register</h1>
      <div className="mb-4 p-3 bg-blue-900/50 border border-blue-600 rounded">
        <p className="text-blue-300 text-sm">
          <strong>Note:</strong> The first user to register will become the portfolio owner with full administrative access.
        </p>
      </div>
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
            minLength={6}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="At least 6 characters"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Confirm your password"
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-teal-400 hover:text-teal-300 underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;