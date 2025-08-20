import React, { useState, useEffect } from 'react';
import { learningAPI } from '../api/learning';
import type { LearningItem } from '../types';

const ManageLearning: React.FC = () => {
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
    <div>
      <h3 className="text-2xl font-bold mb-4">Manage Learning Items</h3>
      <ul>
        {learningItems.map(item => (
          <li key={item._id} className="mb-2 p-2 border rounded">
            <p className="font-semibold">{item.title}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLearning;