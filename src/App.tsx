// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Login from './pages/Login'; // Import the Login component
import Register from './pages/Register'; // Import the Register component
import ComponentTest from './test/ComponentTest'; // Import the test component

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto p-8 flex-grow">
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            {/* Why: Add routes for authentication forms. */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test" element={<ComponentTest />} />
            <Route path="*" element={<h1 className="text-4xl text-center text-red-500">404 - Page Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;