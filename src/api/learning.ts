// src/api/learning.ts
// Why: This file creates a reusable Axios instance with a base URL and
// interceptors for authentication and error handling

import api from './axios';
import type { ApiResponse, LearningItem } from '../types';


// =============================================================================
// Learning Services
// =============================================================================

export const learningAPI = {
  // Get all learning items (public)
  getAll: async (queryParams?: string): Promise<ApiResponse<LearningItem[]>> => {
    const url = queryParams ? `/learning?${queryParams}` : '/learning';
    const response = await api.get(url);
    return response.data;
  },

  // Get single learning item by ID (public)
  getById: async (id: string): Promise<ApiResponse<LearningItem>> => {
    const response = await api.get(`/learning/${id}`);
    return response.data;
  },

  // Create new learning item (Owner/Admin only)
  create: async (learningData: Omit<LearningItem, '_id'>): Promise<ApiResponse<LearningItem>> => {
    const response = await api.post('/learning', learningData);
    return response.data;
  },

  // Update learning item (Owner/Admin only)
  update: async (id: string, learningData: Partial<Omit<LearningItem, '_id'>>): Promise<ApiResponse<LearningItem>> => {
    const response = await api.put(`/learning/${id}`, learningData);
    return response.data;
  },

  // Delete learning item (Owner/Admin only)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/learning/${id}`);
  },
};