import React, { useState } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { authAPI, handleAPIError } from '../api/services';
import { toast } from 'react-toastify';
import type { ApiError } from '../types';

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (email: string) => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await authAPI.forgotPassword(email);
      setMessage(response.data || 'Password reset email sent. Check your inbox.');
      toast.success(response.data || 'Password reset email sent. Check your inbox.');
    } catch (err: unknown) {
      const errorMessage = handleAPIError(err as ApiError);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-lg shadow-xl bg-gray-800 border border-gray-700 mt-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-teal-300">Forgot Password</h1>
      <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />
      {message && <div className="bg-green-900/50 border border-green-600 text-green-300 px-4 py-3 rounded mt-4">{message}</div>}
      {error && <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded mt-4">{error}</div>}
    </div>
  );
};

export default ForgotPassword;