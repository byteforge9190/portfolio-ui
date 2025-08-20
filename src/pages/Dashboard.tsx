// src/pages/Dashboard.tsx

import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import ManageProjects from '../components/ManageProjects';
import ManageSkills from '../components/ManageSkills'; 
import ManageExperience from '../components/ManageExperience';
import ManageProfiles from '../components/ManageProfiles';
import LearningProgress from '../components/LearningProgress';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experience' | 'profile' | 'learning'>('projects');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  if (!user) {
    return <div className="text-center text-gray-400">Loading user data...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 py-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-300 mb-4 text-center">
        Admin Dashboard
      </h1>
      <p className="text-center text-gray-400 mb-10 text-xl">Welcome, {user.email}!</p>

      <div className="flex justify-center mb-6 px-1">
        <div className="bg-gray-800 p-2 rounded-xl flex flex-wrap gap-2 shadow-inner">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-lg font-bold transition-all ${
              activeTab === 'projects' ? 'bg-teal-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-lg font-bold transition-all ${
              activeTab === 'skills' ? 'bg-teal-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-lg font-bold transition-all ${
              activeTab === 'experience' ? 'bg-teal-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-lg font-bold transition-all ${
              activeTab === 'profile' ? 'bg-teal-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-lg font-bold transition-all ${
              activeTab === 'learning' ? 'bg-teal-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            Learning
          </button>
        </div>
      </div>

      <section className="bg-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-bold text-gray-200 mb-6 border-b-2 border-gray-700 pb-3">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
        </h2>
        {activeTab === 'projects' && (
          <div className="space-y-10">
            <ManageProjects key={`projects-${refreshKey}`} onSuccess={handleSuccess} />
          </div>
        )}
        {activeTab === 'skills' && (
          <div className="space-y-10">
            <ManageSkills key={`skills-${refreshKey}`} onSuccess={handleSuccess} />
          </div>
        )}
        {activeTab === 'experience' && (
          <div className="space-y-10">
            <ManageExperience key={`experience-${refreshKey}`} onSuccess={handleSuccess} />
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="space-y-10">
            <ManageProfiles key={`profile-${refreshKey}`} onSuccess={handleSuccess} />
          </div>
        )}
        {activeTab === 'learning' && (
          <div className="space-y-10">
            <ManageLearning />
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;