import React, { useState, useEffect } from 'react';
import { learningAPI } from '../api/learning';
import type { LearningItem } from '../types';

interface LearningFormProps {
  onSuccess: () => void;
  learningItem?: LearningItem;
}

const LearningForm: React.FC<LearningFormProps> = ({ onSuccess, learningItem }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'In Progress' | 'Completed'>('In Progress');
  const [dateStarted, setDateStarted] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (learningItem) {
      setTitle(learningItem.title);
      setDescription(learningItem.description);
      setStatus(learningItem.status);
      setDateStarted(learningItem.dateStarted.split('T')[0]); // Format for date input
      setLink(learningItem.link || '');
    }
  }, [learningItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const learningData = { title, description, status, dateStarted, link };

    try {
      if (learningItem) {
        await learningAPI.update(learningItem._id, learningData);
      } else {
        await learningAPI.create(learningData);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save learning item', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'In Progress' | 'Completed')}
        className="w-full p-2 rounded bg-gray-700 text-white"
      >
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        value={dateStarted}
        onChange={(e) => setDateStarted(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="url"
        placeholder="Link to resource"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
      />
      <button type="submit" className="w-full p-2 rounded bg-teal-600 hover:bg-teal-700 text-white">
        {learningItem ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default LearningForm;