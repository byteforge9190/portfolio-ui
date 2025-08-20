import React from 'react';
import { LearningItem } from '../types';

const learningItems: LearningItem[] = [
  {
    _id: "1",
    title: "Advanced TypeScript",
    description: "Deep dive into complex types, generics, and decorators.",
    status: "In Progress",
    dateStarted: "2025-08-01",
    link: "https://www.typescriptlang.org/docs/handbook/advanced-types.html"
  },
  {
    _id: "2",
    title: "Tailwind CSS Customization",
    description: "Learning to extend and configure Tailwind for a unique design system.",
    status: "In Progress",
    dateStarted: "2025-07-20",
    link: "https://tailwindcss.com/docs/customizing-colors"
  },
  // Add more learning items as needed
];

const LearningProgress: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-gray-300">My Learning Journey</h3>
      {learningItems.map(item => (
        <div key={item._id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h4 className="text-xl font-semibold text-teal-400">{item.title}</h4>
          <p className="text-gray-400 mt-2">{item.description}</p>
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <span className="font-bold text-gray-400">Status: </span>
            <span className={`ml-2 font-medium ${item.status === 'In Progress' ? 'text-yellow-500' : 'text-green-500'}`}>{item.status}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <span className="font-bold text-gray-400">Date Started: </span>
            <span className="ml-2">{item.dateStarted}</span>
          </div>
          {item.link && (
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-bold text-gray-400">Resource: </span>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-400 hover:underline">Link</a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningProgress;