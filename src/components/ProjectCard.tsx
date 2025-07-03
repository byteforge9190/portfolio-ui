// src/components/ProjectCard.tsx
// Why: This component displays a single project's details in a card format.

import React from 'react';

// Why: Define the expected structure of a project object.
// This is a key benefit of using TypeScript.
interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  user: { email: string };
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105 duration-300">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-teal-300 mb-2">{project.title}</h2>
        {/* Why: Display the user's email from the populated 'user' field. */}
        <p className="text-sm text-gray-500 mb-4">By: {project.user?.email || 'N/A'}</p>
        <p className="text-gray-300 mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{project.description}</p>
        
        {/* Why: Map over the technologies array to display them as badges. */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-gray-700 text-teal-400 text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Why: Conditional rendering for links. */}
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-200 transition-colors font-medium"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-200 transition-colors font-medium"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;