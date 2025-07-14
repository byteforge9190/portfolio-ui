// src/components/ManageProfiles.tsx
// Why: Component for managing profiles in the dashboard with CRUD operations

import React, { useState, useEffect } from 'react';
import { profileAPI, handleAPIError } from '../api/services';
import type { Profile, ApiError } from '../types';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaUser, FaEye, FaLink } from 'react-icons/fa';
import ProfileForm from './ProfileForm';

interface ManageProfilesProps {
  onSuccess: () => void;
}

const ManageProfiles: React.FC<ManageProfilesProps> = ({ onSuccess }) => {
  const [profile, setProfile] = useState<Profile | null>(null); // Changed to single Profile object
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => { // Renamed to fetchProfile
    try {
      setLoading(true);
      const response = await profileAPI.getAll(); // Still fetches all, but we'll take the first
      if (response.data && response.data.length > 0) {
        setProfile(response.data[0]);
      } else {
        setProfile(null);
      }
      setError(null);
    } catch (err: unknown) {
      const errorMessage = handleAPIError(err as ApiError);
      setError(errorMessage);
      toast.error(`Failed to fetch profile: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCreateOrEdit = () => {
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!profile || !window.confirm(`Are you sure you want to delete your profile?`)) {
      return;
    }

    try {
      await profileAPI.delete(profile._id);
      toast.success('Profile deleted successfully!');
      setProfile(null); // Clear profile from state
      setShowForm(false); // Hide form after deletion
    } catch (error: unknown) {
      const errorMessage = handleAPIError(error as ApiError);
      toast.error(`Failed to delete profile: ${errorMessage}`);
    }
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    await fetchProfile(); // Re-fetch to get updated/new profile
    onSuccess();
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-300 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <ProfileForm
        existingProfile={profile || undefined}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-teal-300 flex items-center">
          <FaUser className="mr-3" />
          Profile Management
        </h3>
        {!profile ? (
          <button
            onClick={handleCreateOrEdit}
            className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <FaPlus />
            <span>Create Profile</span>
          </button>
        ) : (
          <button
            onClick={handleCreateOrEdit}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaEdit />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Display Profile or Empty State */}
      {!profile ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <FaUser className="text-4xl text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Profile Found</h3>
          <p className="text-gray-500 mb-4">Create your first profile to get started.</p>
          <button
            onClick={handleCreateOrEdit}
            className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors mx-auto"
          >
            <FaPlus />
            <span>Create Profile</span>
          </button>
        </div>
      ) : (
        <div
          key={profile._id}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors"
        >
          <div className="flex items-start justify-between">
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <img
                  src={profile.profileImageUrl || '/default-profile.png'}
                  alt={profile.fullName}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-600"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/default-profile.png';
                  }}
                />
                <div>
                  <h4 className="text-xl font-semibold text-white">{profile.fullName}</h4>
                  <p className="text-teal-300">{profile.title}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-3">{truncateText(profile.summary)}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span>📧 {profile.email}</span>
                {profile.location && <span>📍 {profile.location}</span>}
                {profile.phone && <span>📞 {profile.phone}</span>}
              </div>

              {/* Social Links */}
              {(profile.website || profile.linkedinUrl || profile.githubUrl) && (
                <div className="flex space-x-2 mt-3">
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300"
                      title="Website"
                    >
                      <FaLink />
                    </a>
                  )}
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                      title="LinkedIn"
                    >
                      <FaLink />
                    </a>
                  )}
                  {profile.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300"
                      title="GitHub"
                    >
                      <FaLink />
                    </a>
                  )}
                </div>
              )}

              <div className="mt-4 text-xs text-gray-500">
                <p>Created: {formatDate(profile.createdAt)}</p>
                {profile.updatedAt !== profile.createdAt && (
                  <p>Updated: {formatDate(profile.updatedAt)}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => window.open('/profile', '_blank')}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                title="View Profile"
              >
                <FaEye />
              </button>
              <button
                onClick={handleCreateOrEdit}
                className="p-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                title="Edit Profile"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                title="Delete Profile"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfiles;