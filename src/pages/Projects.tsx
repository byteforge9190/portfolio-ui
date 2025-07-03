// src/pages/Projects.tsx
// Why: This component fetches and displays the list of projects from the API.

import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';

// Why: Define the type for our project data.
interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  user: { email: string };
}

const Projects: React.FC = () => {
  // Why: Use state to store the fetched projects and loading/error status.
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Why: useEffect is a React Hook that runs side effects (like data fetching).
  // The empty dependency array `[]` ensures it runs only once on mount.
  useEffect(() => {
    // Why: Define an async function to fetch data.
    const fetchProjects = async () => {
      try {
        // Why: Use our pre-configured Axios instance to make the GET request.
        const response = await api.get('/projects');
        // Why: Update the state with the fetched data.
        setProjects(response.data.data);
      } catch (err) {
        // Why: Catch any errors from the API call.
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        // Why: Set loading to false once the request is complete (success or fail).
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Why: Conditional rendering based on the component's state.
  if (loading) {
    return <p className="text-center text-lg text-gray-400">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-400">{error}</p>;
  }

  if (projects.length === 0) {
    return <p className="text-center text-lg text-gray-400">No projects found. Create one from the admin panel!</p>;
  }

  return (
    <>
      {/* Why: Map over the projects array and render a ProjectCard for each one. */}
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </>
  );
};

export default Projects;