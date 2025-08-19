# Portfolio UI - Frontend

A modern, responsive portfolio frontend built with React, TypeScript, and Tailwind CSS. This application integrates seamlessly with the [my-portfolio-os backend](https://github.com/darunbjork/my-portfolio-os) to provide a complete portfolio management solution.

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based access control** (Owner, Admin, Viewer)
- **JWT token authentication**
- **Automatic role assignment** (first user becomes owner)
- **Protected routes** and components

### 📱 Modern UI/UX
- **Responsive design** optimized for all devices with fluid layouts and adaptive components
- **Subtle and smooth animations** for enhanced user experience
- **Dark theme** with modern styling
- **Interactive components** with smooth animations
- **Toast notifications** for user feedback

### 🛠️ Content Management
- **Dynamic project showcase** with CRUD operations
- **Skills management** with proficiency levels
- **Experience timeline** with company details
- **Real-time updates** from backend API

### 🚀 Developer Experience
- **TypeScript** for type safety
- **Zustand** for state management
- **React Router** for navigation
- **Axios** for API communication
- **Tailwind CSS** for styling

## 🏗️ Architecture

```
src/
├── api/           # API services and configuration
├── components/    # Reusable UI components
├── pages/         # Page components
├── store/         # Zustand state management
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Backend API running ([setup guide](https://github.com/darunbjork/my-portfolio-os))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your backend URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file:

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000/api/v1

# For production
# VITE_API_URL=https://your-backend-domain.com/api/v1
```

### Backend Integration

This frontend is designed to work with the backend API that provides:

- **User authentication** with role-based access
- **Portfolio content APIs** (projects, skills, experience)
- **User management** for owners
- **Security middleware** for protected routes

See [Backend Integration Guide](./docs/BACKEND_INTEGRATION.md) for detailed setup instructions.

## 👥 User Roles

### 🔑 Owner
- **First registered user** automatically becomes owner
- **Full administrative access** to all features
- **User management** capabilities
- **Content creation and modification**

### 👨‍💼 Admin
- **Content management** access
- **Project, skills, and experience** CRUD operations
- **Cannot manage user roles**

### 👀 Viewer
- **Read-only access** to portfolio content
- **Default role** for new registrations
- **Public portfolio viewing**

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Framer Motion** - Animations

## 🎨 UI Components

### Core Components
- **Header** - Navigation with role-based features
- **ProjectCard** - Project showcase component
- **ProtectedRoute** - Role-based route protection
- **Forms** - Project, skill, and experience management
- **AnimatedGradientText** - Text with vibrant, animated gradient
- **MarqueeWords** - Continuous scrolling list of technologies
- **AvatarShowcase** - Modern, animated avatar display

### Pages
- **Projects** - Portfolio project showcase
- **Skills** - Technical skills display
- **Experience** - Professional experience timeline
- **Dashboard** - Content management interface
- **Auth** - Login and registration

## 🔌 API Integration

### Authentication Flow
```typescript
// Register new user
const response = await authAPI.register(email, password)

// Login user
const response = await authAPI.login(email, password)

// Store user data
login(response.token, response.user)
```

### Content Management
```typescript
// Fetch projects
const projects = await projectAPI.getAll()

// Create project (requires owner/admin role)
const newProject = await projectAPI.create(projectData)

// Update project (requires owner/admin role)
await projectAPI.update(id, updatedData)
```

## 🚀 Deployment

### Frontend Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to hosting platform**
   - Vercel, Netlify, or similar
   - Configure environment variables
   - Update API URL for production

3. **Configure domain and SSL**

### Backend Requirements

Ensure your backend has:
- ✅ CORS configured for your frontend domain
- ✅ Environment variables properly set
- ✅ Database connection established
- ✅ JWT authentication configured

## 🐛 Troubleshooting

### Common Issues

**API Connection Failed**
- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check browser console for CORS errors

**Authentication Not Working**
- Clear browser localStorage: `localStorage.clear()`
- Check network tab for failed requests
- Verify JWT token format

**Role-Based Features Missing**
- Refresh the page after login
- Check user role in browser dev tools
- Verify API response structure

### TypeScript Issues

If you encounter TypeScript or JSX errors:

1. **Update dependencies**
   ```bash
   npm install -D @types/react @types/react-dom
   ```

2. **Check tsconfig.json**
   ```json
   {
     "compilerOptions": {
       "jsx": "react-jsx",
       "moduleResolution": "node"
     }
   }
   ```

## 📚 Documentation

- [Backend Integration Guide](./docs/BACKEND_INTEGRATION.md)
- [API Reference](./docs/BACKEND_INTEGRATION.md#api-endpoints-reference)
- [Component Documentation](./src/components/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built to integrate with [my-portfolio-os backend](https://github.com/darunbjork/my-portfolio-os)
- Uses modern React and TypeScript best practices
- Designed with security and scalability in mind

---

**Ready to showcase your portfolio?** Start by setting up the backend, then follow this guide to get your frontend running! 🚀
