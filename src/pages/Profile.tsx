import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { profileAPI, handleAPIError } from '../api/services';
import type { Profile, ApiError } from '../types';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaLinkedin, FaGithub, FaFileDownload, FaUser } from 'react-icons/fa';
import NoDataFound from '../components/NoDataFound';
import AvatarShowcase from "../components/AvatarShowcase";
import AnimatedGradientText from "../components/AnimatedGradientText";
import PasswordUpdateForm from '../components/PasswordUpdateForm';
import { useAuthStore } from '../store/authStore';


const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => { 
      try {
        setLoading(true);
        const response = await profileAPI.getAll();
        if (response.data && response.data.length > 0) {
          setProfile(response.data[0]);
        } else {
          setProfile(null);
        }
        setError(null);
      } catch (err: unknown) {
        const errorMessage = handleAPIError(err as ApiError);
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
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-teal-300 rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md p-6 mx-auto border border-red-700 rounded-lg bg-red-900/20">
          <h2 className="mb-2 text-xl font-semibold text-red-400">Error Loading Profile</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <NoDataFound
        icon={FaUser}
        title="No Profile Found"
        message="The portfolio owner hasn&apos;t set up their profile yet, or there was an issue fetching it."
      />
    );
  }

  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="max-w-5xl px-4 mx-auto mt-8 sm:px-6 lg:px-8 md:mt-12"
>

  <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 overflow-hidden">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
      <div className="relative px-6 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] items-center gap-10">
          <AvatarShowcase
            src={profile.profileImageUrl || "/default-profile.png"}
            alt={`${profile.fullName} headshot`}
            size="lg"
            interactive
            float
            calm  
          />

          <div className="text-center md:text-left">
            <div><AnimatedGradientText className="mb-2 text-5xl font-extrabold tracking-tight md:text-6xl">
              {profile.fullName}
            </AnimatedGradientText></div>
            <div><AnimatedGradientText className="mb-6 text-xl font-semibold md:text-2xl opacity-90">
              {profile.title}
            </AnimatedGradientText></div>
            <AnimatedGradientText className="max-w-2xl mx-auto mt-5 text-base leading-relaxed md:text-lg md:pr-4 md:mx-0">
              {profile.summary}
            </AnimatedGradientText>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
        <div className="px-8 py-6 border-b border-gray-700 bg-gray-750">
          <h2 className="mb-4 text-2xl font-bold text-blue-400">Contact Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {profile.location && (
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-blue-400" />
                <span>{profile.phone}</span>
              </div>
            )}
            <div className="flex items-center space-x-3 text-gray-300">
              <FaEnvelope className="text-blue-400" />
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-teal-300">
                {profile.email}
              </a>
            </div>
            {profile.website && (
              <div className="flex items-center space-x-3 text-gray-300">
                <FaGlobe className="text-blue-400" />
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-teal-300"
                >
                  {profile.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {(profile.linkedinUrl || profile.githubUrl || profile.resumeUrl) && (
          <div className="px-8 py-6 bg-gray-800 border-b border-gray-700">
            <h2 className="mb-4 text-2xl font-bold text-blue-400">Links</h2>
            <div className="flex flex-wrap gap-4">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 space-x-2 transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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
                  className="flex items-center px-4 py-2 space-x-2 transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
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
                  className="flex items-center px-4 py-2 space-x-2 transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <FaFileDownload />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </div>
        )}

        <div className="px-8 py-6">
          <h2 className="mb-4 text-2xl font-bold text-blue-400">About Me</h2>
      <AnimatedGradientText className="text-base leading-relaxed whitespace-pre-line md:text-lg">
  I&apos;m Darun Mustafa, a full-stack developer based in Stockholm.
  I build production systems in React, Node.js, TypeScript, and Docker
  — with a consistent focus on auth security, API contract design, and
  real-time data. Six years coordinating complex operations under pressure
  taught me to design for failure before I design for features — I bring
  the same precision regulators required in documentation to every
  codebase I touch. I&apos;ve shipped 5+ projects including a real-time
  IoT control system, an AI-powered quiz platform, and a portfolio
  management system — all live and on GitHub.
</AnimatedGradientText>
        </div>

        {isAuthenticated && (
          <div className="px-8 py-6">
            <PasswordUpdateForm />
          </div>
        )}

        <div className="px-8 py-4 text-sm text-gray-500 border-t border-gray-700 bg-gray-750">
          <p>Profile created: {new Date(profile.createdAt).toLocaleDateString()}</p>
          {profile.updatedAt !== profile.createdAt && (
            <p>Last updated: {new Date(profile.updatedAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
