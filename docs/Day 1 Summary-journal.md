Week 2, Day 1 Summary

Today, we successfully integrated a modern React application into our existing monorepo. We used Vite for a fast setup, configured Tailwind CSS for styling, and set up a reusable Axios instance for API communication. The project is now structured to have a clear separation of concerns between the backend and frontend.

Week 2, Day 1 — Frontend Setup

🎯 Feature or Topic

What did I build today?
I set up the frontend of our application using React with TypeScript and Vite. I configured Tailwind CSS for styling and created a custom Axios instance to manage API calls, all within our monorepo structure.

💡 Design Decisions
Why did I do it this way? What tradeoffs did I consider?

Vite over Create React App (CRA): Chose Vite for its superior speed in development. Its dev server is significantly faster than CRA's Webpack-based one, providing a better developer experience.

TypeScript: Decided to use TypeScript for type safety. While it adds a small learning curve, it prevents many common bugs, especially in larger applications, and improves code readability and maintainability.

Monorepo: Continued to build within a monorepo. This keeps related code (backend and frontend) together, simplifying development, shared configuration, and versioning. The tradeoff is a slightly more complex initial setup.

Tailwind CSS: Chose a utility-first CSS framework for rapid UI development. It avoids the need for a complex CSS architecture and allows for fast iteration on styling.

Axios Instance: Created a dedicated Axios instance. This is a best practice that centralizes API configuration, making it easy to change the base URL or add authentication headers in the future.

✅ Functionality
What behavior or feature is working now?

I have a new frontend directory with a fully configured React project.

The React dev server can be started independently and runs on a different port (5173).

Tailwind CSS is set up and ready to use in our components.

The frontend is configured to use environment variables for API communication.

Both the backend and frontend can run simultaneously, confirming our monorepo setup works.

🔒 Security
What vulnerabilities did I mitigate?

Sensitive Info in Code: Ensured the backend API URL is stored in a Git-ignored .env file, not hard-coded into the source code.

🧪 Testing
What did I test and how?

Project Setup: Verified that the Vite project was created with the correct files and dependencies.

Dev Server: Ran npm run dev in the frontend directory and confirmed the server started and the page was viewable in the browser.

Simultaneous Operation: Ran docker compose up for the backend and npm run dev for the frontend in separate terminals to confirm they can coexist without port conflicts.

🗂️ Git Commit Summary
git add frontend/
git commit -m "feat: Setup React frontend with Vite, Tailwind, and Axios"
🐳 Docker & Deployment Status
Did it build/run successfully? Any CI issues?

The backend Docker containers continue to run perfectly.

The new frontend part of the monorepo does not yet have a Docker setup, but it runs successfully on the host machine.

📈 What I Want to Improve Tomorrow
Code, tests, infra, docs, UX?

Build the main layout of the portfolio (e.g., header, footer, navigation).

Create our first data-fetching component to retrieve the list of projects from our API.

Begin creating reusable UI components (e.g., buttons, cards).
