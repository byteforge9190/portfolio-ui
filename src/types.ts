// src/types.ts
// Why: Centralized type definitions to avoid duplication and ensure consistency.

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  user: { email: string };
}

export interface Skill {
  _id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';
}

export interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  location?: string;
  from: string; // Dates are strings from the API
  to?: string;
  current: boolean;
  description?: string;
}