// src/components/DebugInfo.tsx
// Debug component to help troubleshoot API and auth issues

import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';

const DebugInfo: React.FC = () => {
  const { token, user, isAuthenticated } = useAuthStore();
  const [apiTest, setApiTest] = useState<string>('Not tested');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    try {
      const response = await api.get('/projects');
      setApiTest(`✅ Success: ${response.data.data?.length || 0} projects found`);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const apiError = err as { response?: { status?: number; data?: { message?: string } } };
        setApiTest(`❌ Error: ${apiError.response?.status} - ${apiError.response?.data?.message || JSON.stringify(apiError.response?.data)}`);
      } else {
        setApiTest(`❌ Network Error: ${err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-6">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">🔧 Debug Information</h3>
      
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-gray-400">Authentication Status:</span>
          <span className={`ml-2 font-bold ${isAuthenticated ? 'text-green-400' : 'text-red-400'}`}>
            {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">Token:</span>
          <span className="ml-2 text-white font-mono text-xs">
            {token ? `${token.substring(0, 20)}...` : 'No token'}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">User:</span>
          <span className="ml-2 text-white">
            {user?.email || 'No user data'}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">API Base URL:</span>
          <span className="ml-2 text-white font-mono text-xs">
            {import.meta.env.VITE_API_URL}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">API Test:</span>
          <span className="ml-2 text-white">
            {apiTest}
          </span>
        </div>
        
        <button
          onClick={testApiConnection}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600"
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>
      </div>
    </div>
  );
};

export default DebugInfo;