Week 2, Day 3 Summary

Today, we built a fully functional multi-page single-page application. We implemented React Router for seamless navigation and created dedicated pages for displaying skills and experience, leveraging the advanced querying features of our backend API. The public-facing part of your portfolio is now complete!

Week 2, Day 3 — Routing and More Pages

🎯 Feature or Topic
What did I build today?
I implemented client-side routing with React Router, allowing navigation between different portfolio sections. I created dedicated pages for Skills and Experience that fetch and display data from the backend, following the same pattern as the Projects page.

💡 Design Decisions
Why did I do it this way? What tradeoffs did I consider?

React Router: Used the industry standard for routing in React. It's robust, well-documented, and supports nested routes and dynamic URLs.

Component-Based Pages: Continued to design each page as a self-contained component responsible for its own data fetching and rendering. This keeps components loosely coupled and easy to test.

Leveraging Advanced API Features: Used query parameters like ?sort=... in our frontend API calls to leverage the sorting functionality we built on the backend. This shows a direct benefit of our API's advanced features.

State and UI: Used useState and useEffect to manage loading, error, and data states, ensuring a good user experience with clear feedback.

Link over <a>: Used React Router's Link component to enable smooth, single-page application navigation without triggering a full page refresh.

✅ Functionality
What behavior or feature is working now?

I can navigate between the Projects, Skills, and Experience pages using the navigation links in the header.

Each page fetches its specific data from the backend API.

The Skills page groups skills by category and displays them.

The Experience page sorts entries by date and displays them.

The UI updates dynamically without full page reloads.

🔒 Security
What vulnerabilities did I mitigate?

No New Vulnerabilities: This day's work was focused on frontend UI and routing, not introducing new security features. However, we're still using our secure backend API.

🧪 Testing
What did I test and how?

Navigation: Clicked on all navigation links and verified the URL and content changed as expected.

Data Fetching: Checked the Network tab in the browser's developer tools to confirm GET requests were made to /api/v1/skills and /api/v1/experience.

Rendering: Verified that the fetched data was correctly rendered into the UI, including categories for skills and date formatting for experience.

🗂️ Git Commit Summary
Bash
git add frontend/
git commit -m "feat: Add routing and pages for skills and experience"
🐳 Docker & Deployment Status
Did it build/run successfully? Any CI issues?

All Docker containers and the frontend dev server continue to run successfully together.

The application is now a fully functional single-page app.

📈 What I Want to Improve Tomorrow
Code, tests, infra, docs, UX?

Build the user authentication forms: Login and Register.

Implement state management with Zustand to store the user's authentication state (token and user data).

Add logic to protect our admin routes on the frontend, hiding CRUD forms from public users.
