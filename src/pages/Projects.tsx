import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI, handleAPIError } from '../api/services';
import { useAuthStore } from '../store/authStore';
import ProjectCard from '../components/ProjectCard';
import type { Project, ApiError } from '../types';
import NoDataFound from '../components/NoDataFound';
import { FaFolderOpen } from 'react-icons/fa';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { canManageContent, user } = useAuthStore();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectAPI.getAll();
        setProjects(response.data || []);
      } catch (err: unknown) {
        console.error('Failed to fetch projects:', err);
        const errorMessage = handleAPIError(err as ApiError);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-teal-400 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="max-w-md px-6 py-4 mx-auto text-red-300 border border-red-600 rounded-lg bg-red-900/50">
          <h3 className="mb-2 font-semibold">Error Loading Projects</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 mt-4 text-white transition-colors bg-red-600 rounded hover:bg-red-700"
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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-teal-300">Portfolio Projects</h1>
          <p className="mt-2 text-gray-400">
            {projects.length > 0 
              ? `Showcasing ${projects.length} project${projects.length === 1 ? '' : 's'}`
              : 'No projects available yet'
            }
          </p>
        </div>
        
        {canManageContent() && (
          <Link 
            to="/dashboard"
            className="px-6 py-3 font-semibold text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-700"
          >
            Manage Projects
          </Link>
        )}
      </div>

      {projects.length === 0 ? (
        <NoDataFound
          icon={FaFolderOpen}
          title="No Projects Found"
          message={canManageContent()
            ? "Start building your portfolio by creating your first project!"
            : "The portfolio owner hasn't added any projects yet."
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {canManageContent() && user && (
        <div className="p-4 mt-12 bg-gray-800 border border-gray-700 rounded-lg">
          <h3 className="mb-2 text-lg font-semibold text-teal-300">Content Management</h3>
          <p className="text-gray-400">
            You have <strong>{user.role}</strong> access and can manage portfolio content.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Projects;