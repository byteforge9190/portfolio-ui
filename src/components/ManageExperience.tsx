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

const ManageExperience: React.FC = () => {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);

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

  const handleDelete = async (id: string) => {
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
  };

  const handleEdit = (item: ExperienceItem) => {
    setEditingExperience(item);
  };

  const handleEditSuccess = () => {
    setEditingExperience(null);
    fetchExperience();
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading experience...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {editingExperience && (
        <ExperienceForm experience={editingExperience} onSuccess={handleEditSuccess} onCancel={() => setEditingExperience(null)} />
      )}

      {experience.length === 0 ? (
        <p className="text-center text-gray-400">No experience items to manage.</p>
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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
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

export default ManageExperience;