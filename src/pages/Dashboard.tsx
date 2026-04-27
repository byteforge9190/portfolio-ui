import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import ManageProjects from '../components/ManageProjects';
import ManageSkills from '../components/ManageSkills'; 
import ManageExperience from '../components/ManageExperience';
import ManageProfiles from '../components/ManageProfiles';
import ManageLearning from '../components/ManageLearning';

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
    <div className="w-full max-w-screen-xl px-4 py-6 mx-auto sm:px-6">
      <h1 className="mb-4 text-3xl font-extrabold text-center text-teal-300 sm:text-4xl md:text-5xl">
        Admin Dashboard
      </h1>
      <p className="mb-10 text-xl text-center text-gray-400">Welcome, {user.email}!</p>

      <div className="flex justify-center px-1 mb-6">
        <div className="flex flex-wrap gap-2 p-2 bg-gray-800 shadow-inner rounded-xl">
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

      <section className="p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl">
        <h2 className="pb-3 mb-6 text-4xl font-bold text-gray-200 border-b-2 border-gray-700">
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