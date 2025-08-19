// src/pages/Projects.tsx
// Why: This component fetches and displays the list of projects from the API with role-based features.

import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI, handleAPIError } from '../api/services';
import { useAuthStore } from '../store/authStore';
import ProjectCard from '../components/ProjectCard';
import type { Project, ApiError } from '../types';

const Projects: React.FC = () => {
  // Why: Use state to store the fetched projects and loading/error status.
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Why: Get authentication state to show role-based features
  const { canManageContent, user } = useAuthStore();

  // Why: useEffect runs side effects like data fetching when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Why: Use our new API service to fetch projects
        const response = await projectAPI.getAll();
        
        // Why: Update the state with the fetched data
        setProjects(response.data || []);
      } catch (err: unknown) {
        // Why: Handle API errors using our centralized error handler
        console.error('Failed to fetch projects:', err);
        const errorMessage = handleAPIError(err as ApiError);
        setError(errorMessage);
      } finally {
        // Why: Set loading to false once the request is complete
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Why: Conditional rendering based on the component's state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="bg-red-900/50 border border-red-600 text-red-300 px-6 py-4 rounded-lg max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Error Loading Projects</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-teal-300">Portfolio Projects</h1>
          <p className="text-gray-400 mt-2">
            {projects.length > 0 
              ? `Showcasing ${projects.length} project${projects.length === 1 ? '' : 's'}`
              : 'No projects available yet'
            }
          </p>
        </div>
        
        {/* Why: Show create project button only for users who can manage content */}
        {canManageContent() && (
          <Link 
            to="/dashboard"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
          >
            Manage Projects
          </Link>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl text-gray-600 mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Projects Found</h3>
            <p className="text-gray-400 mb-6">
              {canManageContent() 
                ? "Start building your portfolio by creating your first project!"
                : "The portfolio owner hasn't added any projects yet."
              }
            </p>
            {canManageContent() && (
              <Link 
                to="/dashboard"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors inline-block font-semibold"
              >
                Create First Project
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Why: Map over the projects array and render a ProjectCard for each one */}
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {/* Why: Show user info for content managers */}
      {canManageContent() && user && (
        <div className="mt-12 p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-teal-300 mb-2">Content Management</h3>
          <p className="text-gray-400">
            You have <strong>{user.role}</strong> access and can manage portfolio content.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Projects;