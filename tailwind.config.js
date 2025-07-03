/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Why: This tells Tailwind to scan all React and TypeScript files
    // in the `src` directory for class names to generate CSS.
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}