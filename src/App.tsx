// src/App.tsx
// Why: This is our main application component with routing logic.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    // Why: The Router component enables client-side routing.
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto p-8 flex-grow">
          <Routes>
            {/* Why: Define our routes. The 'element' prop renders the component. */}
            <Route path="/" element={<Projects />} /> {/* Default route */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/login" element={<Login />} />
            {/* Why: A catch-all route for 404 Not Found. */}
            <Route path="*" element={<h1 className="text-4xl text-center text-red-500">404 - Page Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;