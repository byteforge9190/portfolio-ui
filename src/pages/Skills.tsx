// src/pages/Skills.tsx
// Why: This component fetches and displays the user's skills.

import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import type { Skill } from '../types';

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
    return <p className="text-center text-lg text-gray-400">Loading skills...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-400">{error}</p>;
  }

  if (skills.length === 0) {
    return <p className="text-center text-lg text-gray-400">No skills found.</p>;
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