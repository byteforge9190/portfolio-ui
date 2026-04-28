import React, { useState } from 'react';
import { authAPI, handleAPIError } from '../api/services';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authStore';
import type { ApiError } from '../types';

interface PasswordUpdateFormProps {
  onSuccess?: () => void;
}

const PasswordUpdateForm: React.FC<PasswordUpdateFormProps> = ({ onSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuthStore(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.updatePassword(currentPassword, newPassword);
      
      login(response.token, response.user); 

      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      const message = handleAPIError(err as ApiError);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      <h3 className="mb-4 text-2xl font-bold text-teal-300">Change Password</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-400">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-400">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-400">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdateForm;