// src/pages/Experience.tsx
// Why: This component fetches and displays the user's professional experience.

import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import type { ExperienceItem } from '../types';
import NoDataFound from '../components/NoDataFound';
import { FaBriefcase } from 'react-icons/fa';

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
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-400">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900/50 border border-red-600 text-red-300 px-6 py-4 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Experience</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (experience.length === 0) {
    return (
      <NoDataFound
        icon={FaBriefcase}
        title="No Experience Found"
        message="The portfolio owner hasn't added any experience yet."
      />
    );
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