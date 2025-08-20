// src/types.ts
// Why: Centralized type definitions to match the backend API structure

export interface User {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'viewer';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  count?: number;
  pagination?: {
    page: number;
    limit: number;
    pages: number;
  };
  message?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  user: {
    _id: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Automation' | 'Developer Tools' | 'Cloud & Hosting' | 'Testing & Quality';
  user: {
    _id: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
  user: {
    _id: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  _id: string;
  fullName: string;
  title: string;
  summary: string;
  bio?: string;
  location?: string;
  phone?: string;
  email: string;
  website?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
  user: {
    _id: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface CreateSkillRequest {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Automation' | 'Developer Tools' | 'Cloud & Hosting' | 'Testing & Quality';
}

export interface CreateExperienceRequest {
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface CreateProfileRequest {
  fullName: string;
  title: string;
  summary: string;
  bio?: string;
  location?: string;
  phone?: string;
  email: string;
  website?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
}

export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

decalre module 'heic2any';
export interface LearningItem {
  _id: string;
  title: string;
  description: string;
  status: 'In Progress' | 'Completed';
  dateStarted: string;
  link?: string;
}
