// src/components/ManageExperience.tsx
// Why: Lists all experience items and provides edit/delete functionality.

import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import ExperienceForm from './ExperienceForm';

interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

interface ManageExperienceProps {
  onSuccess: () => void;
}

const ManageExperience: React.FC<ManageExperienceProps> = ({ onSuccess }) => {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false); // New state for creation form

  const fetchExperience = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/experience?sort=-from');
      setExperience(response.data.data);
    } catch (err) {
      console.error('Failed to fetch experience:', err);
      setError('Failed to load experience for management.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience item?')) {
      try {
        await api.delete(`/experience/${id}`);
        toast.success('Experience item deleted successfully!');
        fetchExperience();
      } catch (err) {
        console.error('Error deleting experience:', err);
        toast.error('Failed to delete experience.');
      }
    }
  }, [fetchExperience]);

  const handleEdit = useCallback((item: ExperienceItem) => {
    setIsCreating(false); // Close create form if open
    setEditingExperience(item);
  }, []);

  const handleSuccess = () => { // Renamed from handleEditSuccess to be more general
    setEditingExperience(null);
    setIsCreating(false); // Close create form
    fetchExperience();
    onSuccess();
  };

  const handleCancel = () => { // New cancel handler
    setEditingExperience(null);
    setIsCreating(false);
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading experience...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  const isFormOpen = isCreating || editingExperience !== null; // Determine if any form is open

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center"> {/* New div for header and button */}
        <h2 className="text-3xl font-bold text-white">Manage Experience</h2>
        {!isFormOpen && ( // Only show button if no form is open
          <button
            onClick={() => setIsCreating(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Add New Experience
          </button>
        )}
      </div>

      {isFormOpen && ( // Conditionally render the form
        <ExperienceForm
          experience={editingExperience || undefined}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      {experience.length === 0 && !isFormOpen ? ( // Adjust message if no items and no form open
        <p className="text-center text-gray-400 mt-8">No experience items found. Click "Add New Experience" to get started.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {experience.map((item) => (
            <div key={item._id} className="bg-gray-700 p-6 rounded-lg shadow-inner flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white">{item.title} at {item.company}</h3>
                <p className="text-gray-400 text-sm mt-1">{new Date(item.from).toLocaleDateString()} - {item.current ? 'Present' : item.to ? new Date(item.to).toLocaleDateString() : 'N/A'}</p>
                {item.location && <p className="text-gray-500 text-xs mt-1 italic">{item.location}</p>}
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEdit(item)}
                  disabled={isFormOpen} // Disable buttons when form is open
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
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

export default ManageExperience;