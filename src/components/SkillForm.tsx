// src/components/SkillForm.tsx
// Why: Reusable form for creating and updating a skill.

import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';

interface Skill {
  _id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';
}

interface SkillFormProps {
  skill?: Skill;
  onSuccess: () => void;
  onCancel?: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skill, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    proficiency: 'Intermediate',
    category: 'Frontend',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        proficiency: skill.proficiency,
        category: skill.category,
      });
    }
  }, [skill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value as Skill[keyof Skill] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (skill) {
        await api.put(`/skills/${skill._id}`, formData);
        toast.success('Skill updated successfully!');
      } else {
        await api.post('/skills', formData);
        toast.success('Skill created successfully!');
      }
      onSuccess();
      if (!skill) {
        setFormData({ name: '', proficiency: 'Intermediate', category: 'Frontend' });
      }
    } catch (err) {
      console.error('Error submitting skill form:', err);
      toast.error(`Failed to ${skill ? 'update' : 'create'} skill.`);
    } finally {
      setLoading(false);
    }
  };

  const formTitle = skill ? 'Update Skill' : 'Create a New Skill';
  const buttonText = skill ? (loading ? 'Updating...' : 'Update Skill') : (loading ? 'Creating...' : 'Create Skill');

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
      <h3 className="text-3xl font-bold text-gray-200 mb-6">{formTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Proficiency</label>
          <select
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>DevOps & Automation</option>
            <option>Developer Tools</option>
            <option>Cloud & Hosting</option>
            <option>Testing & Quality</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-600"
          >
            {buttonText}
          </button>
          {skill && onCancel && (
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

export default SkillForm;