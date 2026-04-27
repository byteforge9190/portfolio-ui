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
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-teal-400 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-400">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md px-6 py-4 mx-auto text-red-300 border border-red-600 rounded-lg bg-red-900/50">
          <h2 className="mb-2 text-xl font-semibold text-red-400">Error Loading Experience</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 mt-4 text-white transition-colors bg-red-600 rounded hover:bg-red-700"
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
      <h1 className="mb-8 text-4xl font-bold text-center text-teal-300">My Experience</h1>
      <div className="space-y-10">
        {experience.map((item) => (
        <div key={item._id} className="p-6 bg-gray-800 rounded-lg shadow-2xl">
          <div className="flex flex-col gap-2 mb-2 md:flex-row md:justify-between md:items-start">
            <div>
              <h3 className="text-2xl font-bold text-teal-300 break-words md:text-3xl">{item.title}</h3>
              <p className="text-xl text-gray-400">{item.company}</p>
            </div>
            <p className="font-mono text-sm text-gray-500">
              {new Date(item.from).toLocaleDateString()} -{' '}
              {item.current ? 'Present' : item.to ? new Date(item.to).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          {item.location && <p className="mb-4 text-sm italic text-gray-500">{item.location}</p>}
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