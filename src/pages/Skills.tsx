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
        const response = await api.get('/skills?sort=category,name&limit=1000');
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
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-teal-400 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-400">Loading skills...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md px-6 py-4 mx-auto text-red-300 border border-red-600 rounded-lg bg-red-900/50">
          <h2 className="mb-2 text-xl font-semibold text-red-400">Error Loading Skills</h2>
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

  if (skills.length === 0) {
    return (
      <NoDataFound
        icon={FaTools}
        title="No Skills Found"
        message="The portfolio owner hasn't added any skills yet."
      />
    );
  }

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
      <h1 className="mb-8 text-4xl font-bold text-center text-teal-300">My Skills</h1>
      {Object.entries(skillsByCategory).map(([category, skillsInCat]) => (
        <section key={category} className="mb-8">
          <h2 className="pb-2 mb-4 text-3xl font-bold text-teal-300 border-b-2 border-gray-700">
            {category}
          </h2>
          <div className="flex flex-wrap gap-4">
            {skillsInCat.map((skill) => (
              <div
                key={skill._id}
                className="p-4 text-center transition-transform duration-200 bg-gray-800 rounded-lg shadow-xl hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{skill.proficiency}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </motion.div>
  );
};

export default Skills;