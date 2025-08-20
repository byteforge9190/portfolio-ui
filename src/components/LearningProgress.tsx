import React, { useState, useEffect } from 'react';
import { learningAPI } from '../api/learning';
import type { LearningItem } from '../types';

const LearningProgress: React.FC = () => {
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
    return <div>Loading learning items...</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-gray-300">My Learning Journey</h3>
      {learningItems.map(item => (
        <div key={item._id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h4 className="text-xl font-semibold text-teal-400">{item.title}</h4>
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
  );
};

export default LearningProgress;