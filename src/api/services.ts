// src/api/services.ts
// Why: Centralized API service functions for all backend endpoints

import api from './axios';
import type {
  User,
  AuthResponse,
  ApiResponse,
  Project,
  Skill,
  ExperienceItem,
  Profile,
  CreateProjectRequest,
  CreateSkillRequest,
  CreateExperienceRequest,
  CreateProfileRequest,
  ApiError,
} from '../types';

// =============================================================================
// Authentication Services
// =============================================================================

export const authAPI = {
  // Register new user
  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },

  // Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Get current user profile
  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Get all users (Owner only)
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get('/auth/users');
    return response.data;
  },

  // Update user role (Owner only)
  updateUserRole: async (userId: string, role: string): Promise<ApiResponse<User>> => {
    const response = await api.put(`/auth/users/${userId}/role`, { role });
    return response.data;
  },
};

// =============================================================================
// Project Services
// =============================================================================

export const projectAPI = {
  // Get all projects (public)
  getAll: async (queryParams?: string): Promise<ApiResponse<Project[]>> => {
    const url = queryParams ? `/projects?${queryParams}` : '/projects';
    const response = await api.get(url);
    return response.data;
  },

  // Get single project by ID (public)
  getById: async (id: string): Promise<ApiResponse<Project>> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create new project (Owner/Admin only)
  create: async (projectData: CreateProjectRequest): Promise<ApiResponse<Project>> => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update project (Owner/Admin only)
  update: async (id: string, projectData: Partial<CreateProjectRequest>): Promise<ApiResponse<Project>> => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project (Owner/Admin only)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

// =============================================================================
// Skills Services
// =============================================================================

export const skillAPI = {
  // Get all skills (public)
  getAll: async (queryParams?: string): Promise<ApiResponse<Skill[]>> => {
    const url = queryParams ? `/skills?${queryParams}` : '/skills';
    const response = await api.get(url);
    return response.data;
  },

  // Create new skill (Owner/Admin only)
  create: async (skillData: CreateSkillRequest): Promise<ApiResponse<Skill>> => {
    const response = await api.post('/skills', skillData);
    return response.data;
  },

  // Update skill (Owner/Admin only)
  update: async (id: string, skillData: Partial<CreateSkillRequest>): Promise<ApiResponse<Skill>> => {
    const response = await api.put(`/skills/${id}`, skillData);
    return response.data;
  },

  // Delete skill (Owner/Admin only)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/skills/${id}`);
  },
};

// =============================================================================
// Experience Services
// =============================================================================

export const experienceAPI = {
  // Get all experience items (public)
  getAll: async (queryParams?: string): Promise<ApiResponse<ExperienceItem[]>> => {
    const url = queryParams ? `/experience?${queryParams}` : '/experience';
    const response = await api.get(url);
    return response.data;
  },

  // Create new experience (Owner/Admin only)
  create: async (experienceData: CreateExperienceRequest): Promise<ApiResponse<ExperienceItem>> => {
    const response = await api.post('/experience', experienceData);
    return response.data;
  },

  // Update experience (Owner/Admin only)
  update: async (id: string, experienceData: Partial<CreateExperienceRequest>): Promise<ApiResponse<ExperienceItem>> => {
    const response = await api.put(`/experience/${id}`, experienceData);
    return response.data;
  },

  // Delete experience (Owner/Admin only)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/experience/${id}`);
  },
};

// =============================================================================
// Profile Services
// =============================================================================

export const profileAPI = {
  // Get all profiles (public)
  getAll: async (queryParams?: string): Promise<ApiResponse<Profile[]>> => {
    const url = queryParams ? `/profile?${queryParams}` : '/profile';
    const response = await api.get(url);
    return response.data;
  },

  // Get single profile by ID (public)
  getById: async (id: string): Promise<ApiResponse<Profile>> => {
    const response = await api.get(`/profile/${id}`);
    return response.data;
  },

  // Create new profile (Owner/Admin only)
  create: async (profileData: CreateProfileRequest): Promise<ApiResponse<Profile>> => {
    const response = await api.post('/profile', profileData);
    return response.data;
  },

  // Update profile (Owner/Admin only)
  update: async (profileData: Partial<CreateProfileRequest>): Promise<ApiResponse<Profile>> => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },

  // Delete profile (Owner/Admin only)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/profile/${id}`);
  },

  // Upload profile image
  uploadImage: async (file: File): Promise<{ url: string; public_id: string }> => {
    const formData = new FormData();
    formData.append('profileImage', file);
    const response = await api.post('/upload/profile-image', formData);
    return response.data.data;
  },
};

// =============================================================================
// Utility Functions
// =============================================================================

// Why: Helper function to build query strings for filtering, sorting, etc.
export const buildQueryString = (params: Record<string, string | number | boolean | string[]>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  return searchParams.toString();
};

// Why: Helper function to handle API errors consistently
export const handleAPIError = (error: ApiError): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};