// src/pages/Experience.tsx
// Why: This component fetches and displays the user's professional experience.

import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import type { ExperienceItem } from '../types';

const Experience: React.FC = () => {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        // Why: Fetch experience data, sorting by the 'from' date in descending order.
        const response = await api.get('/experience?sort=-from');
        setExperience(response.data.data);
      } catch (err) {
        console.error('Failed to fetch experience:', err);
        setError('Failed to load experience.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return <p className="text-center text-lg text-gray-400">Loading experience...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-400">{error}</p>;
  }

  if (experience.length === 0) {
    return <p className="text-center text-lg text-gray-400">No experience found.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-300">My Experience</h1>
      <div className="space-y-10">
        {experience.map((item) => (
        <div key={item._id} className="bg-gray-800 p-6 rounded-lg shadow-2xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-teal-300 break-words">{item.title}</h3>
              <p className="text-xl text-gray-400">{item.company}</p>
            </div>
            <p className="text-sm text-gray-500 font-mono">
              {/* Why: Format dates and handle 'current' status. */}
              {new Date(item.from).toLocaleDateString()} -{' '}
              {item.current ? 'Present' : item.to ? new Date(item.to).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          {item.location && <p className="text-sm text-gray-500 mb-4 italic">{item.location}</p>}
          {item.description && (
            <p className="text-gray-300">{item.description}</p>
          )}
        </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;