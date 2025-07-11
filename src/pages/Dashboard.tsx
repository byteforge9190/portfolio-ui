// src/pages/Dashboard.tsx

import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import ProjectForm from '../components/ProjectForm';
import ManageProjects from '../components/ManageProjects';
import ManageSkills from '../components/ManageSkills'; 
import ManageExperience from '../components/ManageExperience'; 

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experience'>('projects');
  
  // Why: State to force re-fetches after creation, update, or deletion.
  const [refreshKey, setRefreshKey] = useState(0); 
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  if (!user) {
    return <div className="text-center text-gray-400">Loading user data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-teal-300 mb-4 text-center">
        Admin Dashboard
      </h1>
      <p className="text-center text-gray-400 mb-10 text-xl">Welcome, {user.email}!</p>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 p-2 rounded-xl flex space-x-2 shadow-inner">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeTab === 'projects' ? 'bg-teal-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeTab === 'skills' ? 'bg-teal-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeTab === 'experience' ? 'bg-teal-600 text-white shadow-lg' : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            Experience
          </button>
        </div>
      </div>

      <section className="bg-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-bold text-gray-200 mb-6 border-b-2 border-gray-700 pb-3">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
        </h2>
        {activeTab === 'projects' && (
          <div className="space-y-10">
            <ProjectForm onSuccess={handleRefresh} />
            <ManageProjects key={`projects-${refreshKey}`} />
          </div>
        )}
        {activeTab === 'skills' && (
          <div className="space-y-10">
            <ManageSkills key={`skills-${refreshKey}`} />
          </div>
        )}
        {activeTab === 'experience' && (
          <div className="space-y-10">
            <ManageExperience key={`experience-${refreshKey}`} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;