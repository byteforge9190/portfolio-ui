// src/pages/Register.tsx
// Why: This component provides a registration form for new users.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // Get the login function from the store

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Why: Call our backend's registration endpoint.
      const response = await api.post('/auth/register', { email, password });
      
      // Why: If registration is successful, log the user in automatically.
      login(response.data.token, response.data.data);

      // Why: Redirect to the projects page after successful registration.
      navigate('/projects');
    } catch (err: unknown) {
      // Why: Handle API errors and display a user-friendly message.
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-lg shadow-xl bg-gray-800 border border-gray-700 mt-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-teal-300">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-600"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;