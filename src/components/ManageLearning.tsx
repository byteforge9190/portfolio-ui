import React, { useState, useEffect, useCallback } from 'react';
import { learningAPI } from '../api/learning';
import type { LearningItem } from '../types';
import LearningForm from './LearningForm';

const ManageLearning: React.FC = () => {
  const [learningItems, setLearningItems] = useState<LearningItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<LearningItem | undefined>(undefined);

  const fetchLearningItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await learningAPI.getAll();
      setLearningItems(response.data || []);
    } catch (error) {
      console.error('Error fetching learning items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLearningItems();
  }, [fetchLearningItems]);

  const handleSuccess = () => {
    fetchLearningItems();
    setEditingItem(undefined);
  };

  const handleDelete = async (id: string) => {
    try {
      await learningAPI.delete(id);
      fetchLearningItems();
    } catch (error) {
      console.error('Error deleting learning item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Manage Learning Items</h3>
      <LearningForm onSuccess={handleSuccess} learningItem={editingItem} />
      <div className="mt-8">
        {learningItems.map(item => (
          <div key={item._id} className="mb-4 p-4 border rounded-lg bg-gray-800">
            <h4 className="text-xl font-semibold text-teal-400">{item.title}</h4>
            <p className="text-gray-400 mt-2">{item.description}</p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <span className="font-bold text-gray-400">Status: </span>
              <span className={`ml-2 font-medium ${item.status === 'In Progress' ? 'text-yellow-500' : 'text-green-500'}`}>{item.status}</span>
            </div>
            <div className="mt-4 flex gap-4">
              <button onClick={() => setEditingItem(item)} className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="p-2 rounded bg-red-600 hover:bg-red-700 text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageLearning;