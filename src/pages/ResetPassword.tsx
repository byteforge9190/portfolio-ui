import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { authAPI, handleAPIError } from '../api/services';
import { toast } from 'react-toastify';
import type { ApiError } from '../types';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Password reset token is missing.');
      toast.error('Password reset token is missing.');
    }
  }, [token]);

  const handleSubmit = async (password: string) => {
    if (!token) {
      setError('Password reset token is missing.');
      toast.error('Password reset token is missing.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authAPI.resetPassword(token, password);
      toast.success('Your password has been reset successfully. Please login.');
      navigate('/login');
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
      <h1 className="text-4xl font-bold text-center mb-6 text-teal-300">Reset Password</h1>
      {error && (
        <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {!error && token && (
        <ResetPasswordForm onSubmit={handleSubmit} loading={loading} />
      )}
      {!token && (
        <p className="text-center text-red-400">Please check your email for a valid reset link.</p>
      )}
    </div>
  );
};

export default ResetPassword;