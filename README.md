# TransitOps - Fleet Management System

A modern, full-stack fleet management application built with React, TypeScript, Node.js, and Prisma.

## 📁 Project Structure

```
hackathon/
├── TransitOps/
│   ├── client/              # React + TypeScript frontend (Vite)
│   ├── server/              # Node.js backend (Express)
│   ├── docs/                # Documentation
│   └── README.md
├── package.json             # Root package configuration
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Client Setup

```bash
cd TransitOps/client
npm install
npm run dev
```

The client will be available at `http://localhost:5173`

### Server Setup (Coming Soon)

```bash
cd TransitOps/server
npm install
npm run dev
```

## 📋 Features

### Dashboard
- **KPI Cards** - Real-time fleet metrics
  - Active Vehicles
  - Available Vehicles
  - In Maintenance
  - Active Trips
  - Pending Trips
  - Drivers On Duty
  - Fleet Utilization

- **Recent Trips** - Table view of recent trips with status
- **Recent Activity** - Activity log and notifications

### Navigation
- **Sidebar** - Professional navigation menu with sections:
  - Main Menu (Dashboard, Vehicles, Drivers, Trips, Expenses, Maintenance, Reports)
  - Settings (Settings, Logout)
  
- **Navbar** - Top navigation with:
  - Search functionality
  - Notifications (3 pending)
  - User profile dropdown

## 🛠️ Tech Stack

### Frontend
- React 18.2
- TypeScript 5.2
- Vite 5.0
- React Router 7.18
- React Icons 5.7
- CSS3 (with responsive design)

### Backend (Planned)
- Node.js/Express
- Prisma ORM
- PostgreSQL/MySQL

## 📦 Available Scripts

### Client

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎨 Styling

The application uses:
- **Global Styles** - CSS Reset and typography
- **Layout Styles** - Sidebar, Navbar, and responsive design
- **Dashboard Styles** - Component-specific styling
- **Color Scheme**:
  - Primary: #3b82f6 (Blue)
  - Secondary: #ef4444 (Red)
  - Background: #f5f7fb (Light Gray)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## 📄 Documentation

See [TransitOps/docs](./TransitOps/docs) for:
- [API Documentation](./TransitOps/docs/API.md)
- [Database Schema](./TransitOps/docs/Database.md)
- [Design System](./TransitOps/docs/Design.md)
- [Product Requirements](./TransitOps/docs/PRD.md)
- [Tech Stack Details](./TransitOps/docs/Tech_Stack.md)

## 🔧 Development

### Adding New Components

1. Create component file in appropriate feature/component folder
2. Add TypeScript interfaces for props
3. Include styling in corresponding CSS file
4. Export from index file (if using barrel exports)

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Commit changes
git commit -m "feat: add feature description"

# Push and create PR
git push origin feature/feature-name
```

## 📝 Commit Message Format

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build, dependencies, etc.

## 🚀 Deployment

(Deployment instructions coming soon)

## 📧 Support

For issues or questions, please refer to the project documentation or create an issue.

## 📄 License

All rights reserved - TransitOps Fleet Management System
