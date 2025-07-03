// src/App.tsx

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './pages/Projects'; // Import the new Projects component

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center text-teal-300">My Portfolio Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Why: Render the Projects component, which handles data fetching and display. */}
          <Projects />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;