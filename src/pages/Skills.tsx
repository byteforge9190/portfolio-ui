// src/pages/Skills.tsx
// Why: This component fetches and displays the user's skills.

import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import type { Skill } from '../types';
import NoDataFound from '../components/NoDataFound';
import { FaTools } from 'react-icons/fa';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Why: Fetch skills from the API. We can use our advanced query features here!
        const response = await api.get('/skills?sort=category,name&limit=1000'); // Sort by category then by name
        setSkills(response.data.data);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
        setError('Failed to load skills.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-400">Loading skills...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900/50 border border-red-600 text-red-300 px-6 py-4 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Skills</h2>
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

  if (skills.length === 0) {
    return (
      <NoDataFound
        icon={FaTools}
        title="No Skills Found"
        message="The portfolio owner hasn't added any skills yet."
      />
    );
  }

  // Why: Group skills by category for a cleaner display.
  const skillsByCategory = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-300">My Skills</h1>
      {/* Why: Map over the grouped categories. */}
      {Object.entries(skillsByCategory).map(([category, skillsInCat]) => (
        <section key={category} className="mb-8">
          <h2 className="text-3xl font-bold text-teal-300 border-b-2 border-gray-700 pb-2 mb-4">
            {category}
          </h2>
          <div className="flex flex-wrap gap-4">
            {/* Why: Map over the skills within each category. */}
            {skillsInCat.map((skill) => (
              <div
                key={skill._id}
                className="bg-gray-800 p-4 rounded-lg shadow-xl text-center transition-transform hover:scale-105 duration-200"
              >
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{skill.proficiency}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </motion.div>
  );
};

export default Skills;