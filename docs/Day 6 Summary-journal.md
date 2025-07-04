Week 2, Day 6 — Admin Dashboard CRUD

🎯 Feature or Topic

What did I build today?
Completed full CRUD functionality for Projects in the admin dashboard:

Refactored CreateProjectForm → reusable ProjectForm (handles create/edit)
Built dynamic ManageProjects list with real-time updates
Resolved Node.js/Vite compatibility issue by switching to Node v20

💡 Design Decisions

Key Technical Choices:

Component Reusability
Single form for create/edit (DRY principle)
Used key prop to force re-renders after mutations
Version Alignment
Fixed EBADENGINE warning by:
nvm install 20 && nvm use 20 # Matched Vite's Node.js requirements

Optimized Data Flow
useCallback for efficient data fetching
Toast notifications for user feedback

✅ Functionality

What's Working:
✔️ Full project lifecycle management (create/read/update/delete)
✔️ Instant UI updates after CRUD operations
✔️ Public portfolio reflects admin changes
✔️ Stable dev environment post-Node.js version fix

🔒 Security

All routes protected via ProtectedRoute
JWT validation for every mutative API call
Ownership checks on backend for all operations

🧪 Testing

CRUD Cycle: Verified all operations persist to DB
Error Cases: Tested invalid form submissions
Compatibility: Confirmed npm install works on Node v20

🗂️ Git Commit Summary
git add portfolio-ui/
git commit -m "feat: Implement full CRUD for projects + Node.js version fix"

🐳 Deployment Status

Backend containers stable
Frontend runs smoothly on Node v20
No CI pipeline issues

📈 Tomorrow's Goals

Extend CRUD to Skills/Experience sections
Refactor shared logic into custom hooks
Document Node.js version requirement in README
