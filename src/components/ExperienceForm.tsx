// src/components/ExperienceForm.tsx
// Why: Reusable form for creating and updating an experience item.

import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';

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

interface ExperienceFormProps {
  experience?: ExperienceItem;
  onSuccess: () => void;
  onCancel?: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title,
        company: experience.company,
        location: experience.location || '',
        // Why: Format dates for the input[type=date].
        from: experience.from ? new Date(experience.from).toISOString().split('T')[0] : '',
        to: experience.to ? new Date(experience.to).toISOString().split('T')[0] : '',
        current: experience.current,
        description: experience.description || '',
      });
    }
  }, [experience]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, to: formData.current ? undefined : formData.to };
      if (experience) {
        await api.put(`/experience/${experience._id}`, payload);
        toast.success('Experience updated successfully!');
      } else {
        await api.post('/experience', payload);
        toast.success('Experience created successfully!');
      }
      onSuccess();
      if (!experience) {
        setFormData({ title: '', company: '', location: '', from: '', to: '', current: false, description: '' });
      }
    } catch (err) {
      console.error('Error submitting experience form:', err);
      toast.error(`Failed to ${experience ? 'update' : 'create'} experience.`);
    } finally {
      setLoading(false);
    }
  };

  const formTitle = experience ? 'Update Experience' : 'Create a New Experience Item';
  const buttonText = experience ? (loading ? 'Updating...' : 'Update Experience') : (loading ? 'Creating...' : 'Create Experience');

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
      <h3 className="text-3xl font-bold text-gray-200 mb-6">{formTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Company</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-400 mb-2">From Date</label>
            <input type="date" name="from" value={formData.from} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="flex-1">
            <label className="block text-gray-400 mb-2">To Date</label>
            <input type="date" name="to" value={formData.to} onChange={handleChange} disabled={formData.current} className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50" />
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="current" checked={formData.current} onChange={handleChange} className="w-5 h-5 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
          <label className="ml-2 text-gray-400">This is my current role</label>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="flex-1 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-600">
            {buttonText}
          </button>
          {experience && onCancel && (
              <button type="button" onClick={onCancel} disabled={loading} className="flex-1 bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-500">
                  Cancel
              </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;