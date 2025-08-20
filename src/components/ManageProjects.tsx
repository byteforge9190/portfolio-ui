// src/components/ManageProjects.tsx
// Why: This component lists all projects and provides edit/delete functionality.

import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import ProjectForm from './ProjectForm'; // Import our new reusable form
import type { Project } from '../types';

interface ManageProjectsProps {
  onSuccess: () => void;
}

const ManageProjects: React.FC<ManageProjectsProps> = ({ onSuccess }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false); // New state for creation form

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

  const handleDelete = useCallback(async (id: string) => {
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
  }, [fetchProjects]);

  const handleEdit = useCallback((project: Project) => {
    setIsCreating(false); // Close create form if open
    setEditingProject(project);
  }, []);

  const handleSuccess = () => { // Renamed from handleEditSuccess to be more general
    setEditingProject(null); // Close the form
    setIsCreating(false); // Close create form
    fetchProjects(); // Refresh the list
    onSuccess();
  };

  const handleCancel = () => { // New cancel handler
    setEditingProject(null);
    setIsCreating(false);
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  const isFormOpen = isCreating || editingProject !== null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center"> {/* New div for header and button */}
        <h2 className="text-3xl font-bold text-white">Manage Projects</h2>
        {!isFormOpen && ( // Only show button if no form is open
          <button
            onClick={() => setIsCreating(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Add New Project
          </button>
        )}
      </div>

      {isFormOpen && (
        <ProjectForm
          project={editingProject || undefined}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      {projects.length === 0 && !isFormOpen ? (
        <p className="text-center text-gray-400 mt-8">No projects to manage. Click &quot;Add New Project&quot; to get started.</p>
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
                  disabled={isFormOpen} // Disable buttons when form is open
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  disabled={isFormOpen} // Disable buttons when form is open
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
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