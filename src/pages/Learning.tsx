import React, { useState, useEffect } from 'react';
import { learningAPI } from '../api/learning';
import type { LearningItem } from '../types';

const Learning: React.FC = () => {
  const [learningItems, setLearningItems] = useState<LearningItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearningItems = async () => {
      try {
        const response = await learningAPI.getAll();
        setLearningItems(response.data || []);
      } catch (error) {
        console.error('Error fetching learning items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Currently Learning</h1>
      <div className="space-y-4">
        {learningItems.map(item => (
          <div key={item._id} className="p-4 border rounded-lg bg-gray-800">
            <h2 className="text-2xl font-semibold text-teal-400">{item.title}</h2>
            <p className="text-gray-400 mt-2">{item.description}</p>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <span className="font-bold text-gray-400">Status: </span>
              <span className={`ml-2 font-medium ${item.status === 'In Progress' ? 'text-yellow-500' : 'text-green-500'}`}>{item.status}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-bold text-gray-400">Date Started: </span>
              <span className="ml-2">{item.dateStarted}</span>
            </div>
            {item.link && (
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-bold text-gray-400">Resource: </span>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-400 hover:underline">Link</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;