// src/components/ManageProjects.tsx
// Why: This component lists all projects and provides edit/delete functionality.

import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import ProjectForm from './ProjectForm'; // Import our new reusable form
import type { Project } from '../types';

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Why: A memoized function to fetch projects, preventing unnecessary re-creation.
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      // Why: Fetch projects using our authenticated API instance.
      const response = await api.get('/projects');
      setProjects(response.data.data);
    } catch (err: unknown) {
      console.error('Failed to fetch projects:', err);
      
      let errorMessage = 'Failed to load projects for management.';
      if (err && typeof err === 'object' && 'response' in err) {
        const apiError = err as { response?: { data?: { message?: string }; status?: number } };
        if (apiError.response?.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.';
        } else if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        // Why: Make the authenticated DELETE request.
        await api.delete(`/projects/${id}`);
        toast.success('Project deleted successfully!');
        fetchProjects(); // Refresh the list
      } catch (err: unknown) {
        console.error('Error deleting project:', err);
        
        let errorMessage = 'Failed to delete project.';
        if (err && typeof err === 'object' && 'response' in err) {
          const apiError = err as { response?: { data?: { message?: string }; status?: number } };
          if (apiError.response?.status === 401) {
            errorMessage = 'Authentication failed. Please log in again.';
          } else if (apiError.response?.status === 404) {
            errorMessage = 'Project not found. It may have already been deleted.';
          } else if (apiError.response?.data?.message) {
            errorMessage = apiError.response.data.message;
          }
        }
        
        toast.error(errorMessage);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleEditSuccess = () => {
    setEditingProject(null); // Close the form
    fetchProjects(); // Refresh the list
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {editingProject && (
        <ProjectForm project={editingProject} onSuccess={handleEditSuccess} onCancel={() => setEditingProject(null)} />
      )}

      {/* Why: Conditionally render the list or a message. */}
      {projects.length === 0 ? (
        <p className="text-center text-gray-400">No projects to manage.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-700 p-6 rounded-lg shadow-inner flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProjects;