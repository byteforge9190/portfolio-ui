// src/pages/Dashboard.tsx
// Why: This is the private admin dashboard where users can manage their content.

import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import ProjectForm from '../components/ProjectForm'; // Import the new reusable form
import ManageProjects from '../components/ManageProjects'; // Import the list component
import DebugInfo from '../components/DebugInfo'; // Debug component

// Why: We'll create components for each CRUD form.
// For now, let's just create a basic Dashboard UI.
// We will build these components in the next steps.
const CreateSkillForm = () => <div className="p-4 bg-gray-700 rounded-lg">Create Skill Form Placeholder</div>;
const ManageSkills = () => <div className="p-4 bg-gray-700 rounded-lg">Manage Skills List Placeholder</div>;
const CreateExperienceForm = () => <div className="p-4 bg-gray-700 rounded-lg">Create Experience Form Placeholder</div>;
const ManageExperience = () => <div className="p-4 bg-gray-700 rounded-lg">Manage Experience List Placeholder</div>;

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experience'>('projects');

  // Why: We need to re-fetch projects after a successful create operation.
  const [refreshKey, setRefreshKey] = useState(0);
  const handleCreateSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1); // Increment key to force re-render/re-fetch
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

      {/* Why: Tabs for different content sections. */}
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

      {/* Debug Information */}
      <DebugInfo />
      
      {/* Why: Conditionally render content based on the active tab. */}
      <section className="bg-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-bold text-gray-200 mb-6 border-b-2 border-gray-700 pb-3">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
        </h2>
        {activeTab === 'projects' && (
          <div className="space-y-10">
            {/* Why: Use the reusable form for creation. Pass a callback to refresh the list. */}
            <ProjectForm onSuccess={handleCreateSuccess} />
            {/* Why: Render the list of projects and pass the refresh key. */}
            <ManageProjects key={refreshKey} />
          </div>
        )}
        {activeTab === 'skills' && (
          <div className="space-y-10">
            <CreateSkillForm />
            <ManageSkills />
          </div>
        )}
        {activeTab === 'experience' && (
          <div className="space-y-10">
            <CreateExperienceForm />
            <ManageExperience />
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;


