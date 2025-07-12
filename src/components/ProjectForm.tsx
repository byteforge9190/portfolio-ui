// src/components/ProjectForm.tsx
// Why: This component is a reusable form for creating AND updating a project.

import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import type { Project } from '../types';
import { projectAPI } from '../api/services'; // Import projectAPI

interface ProjectFormProps {
  project?: Project; // Optional prop for updating an existing project
  onSuccess: () => void; // Callback to refresh the list after a successful operation
  onCancel?: () => void; // Optional callback to cancel an update
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '', // Add imageUrl to formData
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // State for the selected image file
  const [loading, setLoading] = useState(false);

  // Why: Populate the form with project data if we are in 'update' mode.
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '), // Join array back to string
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        imageUrl: project.imageUrl || '', // Populate imageUrl if exists
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.imageUrl; // Use existing imageUrl by default

      if (imageFile) {
        try {
          const uploadResponse = await projectAPI.uploadProjectImage(imageFile);
          imageUrl = uploadResponse.url; // Get the URL from the upload response
          toast.success('Image uploaded successfully!');
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast.error('Failed to upload image. Please try again.');
          setLoading(false);
          return; // Stop submission if image upload fails
        }
      }

      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map((tech) => tech.trim()).filter(tech => tech), // Split and clean
        imageUrl: imageUrl, // Include the imageUrl in the payload
      };
      
      if (project) {
        // UPDATE logic
        await api.put(`/projects/${project._id}`, payload);
        toast.success('Project updated successfully!');
      } else {
        // CREATE logic
        await api.post('/projects', payload);
        toast.success('Project created successfully!');
      }
      onSuccess(); // Call the callback to refresh the list or close the form
      if (!project) { // Clear form only on creation
        setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' });
        setImageFile(null);
      }
    } catch (err: unknown) {
      console.error('Error submitting project form:', err);
      
      // Extract specific error message from API response
      let errorMessage = `Failed to ${project ? 'update' : 'create'} project.`;
      
      if (err && typeof err === 'object' && 'response' in err) {
        const apiError = err as { response?: { data?: { message?: string; error?: string }; status?: number } };
        
        if (apiError.response?.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.';
        } else if (apiError.response?.status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        } else if (apiError.response?.status === 404) {
          errorMessage = 'Project not found. It may have been deleted.';
        } else if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        } else if (apiError.response?.data?.error) {
          errorMessage = apiError.response.data.error;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formTitle = project ? 'Update Project' : 'Create a New Project';
  const buttonText = project ? (loading ? 'Updating...' : 'Update Project') : (loading ? 'Creating...' : 'Create Project');

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
      <h3 className="text-3xl font-bold text-gray-200 mb-6">{formTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... (all the form fields from CreateProjectForm) ... */}
        <div>
          <label className="block text-gray-400 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Technologies (comma-separated)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, MongoDB"
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Live Demo URL</label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Project Image</label>
          <input
            type="file"
            name="projectImage"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleImageChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
          {formData.imageUrl && (
            <div className="mt-4">
              <p className="block text-gray-400 mb-2">Current Image:</p>
              <img src={formData.imageUrl} alt="Project Thumbnail" className="max-w-xs h-auto rounded-lg shadow-md" />
            </div>
          )}
        </div>
        <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-600"
            >
              {buttonText}
            </button>
            {project && onCancel && (
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1 bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-500"
                >
                    Cancel
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;