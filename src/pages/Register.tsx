import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authAPI, handleAPIError } from '../api/services';
import { toast } from 'react-toastify';
import type { ApiError } from '../types';

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

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setAuthLoading(true);

    try {
      const response = await authAPI.register(email, password);
      login(response.token, response.user);
      if (response.user.role === 'owner' || response.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/projects');
      }
    } catch (error: unknown) {
      const message = handleAPIError(error as ApiError);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      <h1 className="mb-6 text-4xl font-bold text-center text-teal-300">Register</h1>
      <div className="p-3 mb-4 border border-blue-600 rounded bg-blue-900/50">
        <p className="text-sm text-blue-300">
          <strong>Note:</strong> The first user to register will become the portfolio owner with full administrative access.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="At least 6 characters"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Confirm your password"
          />
        </div>
        {error && (
          <div className="px-4 py-3 text-red-300 border border-red-600 rounded bg-red-900/50">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 font-bold text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-teal-400 underline hover:text-teal-300"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;