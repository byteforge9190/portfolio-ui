// src/App.tsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Import the protected route
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Skills = lazy(() => import('./pages/Skills'));
const Experience = lazy(() => import('./pages/Experience'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Learning = lazy(() => import('./pages/Learning'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Header />
        <main className="container mx-auto w-full max-w-screen-xl px-4 sm:px-8 flex-grow">
          <Suspense fallback={<div className="text-center text-2xl mt-10">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/learning" element={<Learning />} />
              {/* Why: Protect the dashboard route with our new component. */}
              {/* If the user is not authenticated, they will be redirected. */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<h1 className="text-4xl text-center text-red-500">404 - Page Not Found</h1>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {/* Why: This is where notifications will be displayed. */}
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
};

export default App;
