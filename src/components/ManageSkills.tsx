// src/components/ManageSkills.tsx
// Why: Lists all skills and provides edit/delete functionality.

import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import SkillForm from './SkillForm';

interface Skill {
  _id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';
}

interface ManageSkillsProps {
  onSuccess: () => void;
}

const ManageSkills: React.FC<ManageSkillsProps> = ({ onSuccess }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/skills?sort=category,name&limit=1000');
      setSkills(response.data.data);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
      setError('Failed to load skills for management.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/skills/${id}`);
        toast.success('Skill deleted successfully!');
        fetchSkills();
      } catch (err) {
        console.error('Error deleting skill:', err);
        toast.error('Failed to delete skill.');
      }
    }
  }, [fetchSkills]);

  const handleEdit = useCallback((skill: Skill) => {
    setIsCreating(false); // Close create form if open
    setEditingSkill(skill);
  }, []);

  const handleSuccess = () => {
    setEditingSkill(null);
    setIsCreating(false);
    fetchSkills();
    onSuccess();
  };

  const handleCancel = () => {
    setEditingSkill(null);
    setIsCreating(false);
  }

  if (loading) {
    return <p className="text-center text-gray-400">Loading skills...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  const isFormOpen = isCreating || editingSkill !== null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Manage Skills</h2>
        {!isFormOpen && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Add New Skill
          </button>
        )}
      </div>

      {isFormOpen && (
        <SkillForm
          skill={editingSkill || undefined}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      {skills.length === 0 && !isFormOpen ? (
        <p className="text-center text-gray-400 mt-8">No skills found. Click &quot;Add New Skill&quot; to get started.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-gray-700 p-6 rounded-lg shadow-inner flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white">{skill.name}</h3>
                <p className="text-gray-400 text-sm mt-1">Proficiency: {skill.proficiency} | Category: {skill.category}</p>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEdit(skill)}
                  disabled={isFormOpen}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
                  disabled={isFormOpen}
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

export default ManageSkills;