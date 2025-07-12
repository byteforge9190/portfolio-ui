// src/pages/Profile.tsx
// Why: Public profile page that displays the portfolio owner's information

import React, { useState, useEffect } from 'react';
import { profileAPI, handleAPIError } from '../api/services';
import type { Profile } from '../types';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaLinkedin, FaGithub, FaFileDownload, FaUser } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null); // Changed to single Profile object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => { 
      try {
        setLoading(true);
        const response = await profileAPI.getAll();
        if (response.data && response.data.length > 0) {
          setProfile(response.data[0]); // Take the first profile from the array
        } else {
          setProfile(null);
        }
        setError(null);
      } catch (err) {
        const errorMessage = handleAPIError(err);
        setError(errorMessage);
        toast.error(`Failed to load profile: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-300 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Profile</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) { // Check for single profile object
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6 max-w-md mx-auto">
          <FaUser className="text-4xl text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">No Profile Found</h2>
          <p className="text-gray-300">The portfolio owner hasn't set up their profile yet, or there was an issue fetching it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 px-8 py-12 text-center">
          <div className="mb-6">
            {profile.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt={profile.fullName}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg bg-gray-600 flex items-center justify-center">
                <FaUser className="text-4xl text-gray-300" />
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{profile.fullName}</h1>
          <p className="text-xl text-teal-100 mb-4">{profile.title}</p>
          <p className="text-teal-100 max-w-2xl mx-auto leading-relaxed">{profile.summary}</p>
        </div>

        {/* Contact Information */}
        <div className="px-8 py-6 bg-gray-750 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-teal-300 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.location && (
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-teal-400" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-teal-400" />
                <span>{profile.phone}</span>
              </div>
            )}
            <div className="flex items-center space-x-3 text-gray-300">
              <FaEnvelope className="text-teal-400" />
              <a href={`mailto:${profile.email}`} className="hover:text-teal-300 transition-colors">
                {profile.email}
              </a>
            </div>
            {profile.website && (
              <div className="flex items-center space-x-3 text-gray-300">
                <FaGlobe className="text-teal-400" />
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-300 transition-colors"
                >
                  {profile.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {(profile.linkedinUrl || profile.githubUrl || profile.resumeUrl) && (
          <div className="px-8 py-6 bg-gray-800 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Links</h2>
            <div className="flex flex-wrap gap-4">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <FaFileDownload />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Bio/About Section */}
        {profile.bio && (
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-teal-300 mb-4">About Me</h2>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {profile.bio}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="px-8 py-4 bg-gray-750 text-sm text-gray-500 border-t border-gray-700">
          <p>Profile created: {new Date(profile.createdAt).toLocaleDateString()}</p>
          {profile.updatedAt !== profile.createdAt && (
            <p>Last updated: {new Date(profile.updatedAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;