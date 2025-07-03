// src/pages/Login.tsx
// Why: A placeholder login page for future authentication functionality.

import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-teal-300">Login</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
        <p className="text-center text-gray-400 mb-6">
          Login functionality will be implemented in a future update.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              disabled
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-not-allowed"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              disabled
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-not-allowed"
              placeholder="••••••••"
            />
          </div>
          <button
            disabled
            className="w-full bg-gray-600 text-gray-400 py-2 px-4 rounded-md cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;