# TransitOps - Smart Transport Operations Platform

TransitOps is a centralized logistics and fleet management system built to digitize vehicle registry, driver scheduling, trip dispatches, maintenance logs, and fuel tracking.

## Project Structure

```
TransitOps/
├── client/          # Frontend React (Vite + TypeScript)
├── server/          # Backend Express API & Prisma ORM
├── docs/            # Specifications (PRD, Tech Stack, Design, API, DB)
└── README.md        # Getting Started Guide
```

## Quick Start

### 1. Backend Server Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/transitops?schema=public"
   PORT=5000
   ```
4. Run migrations:
   ```bash
   npm run db:migrate
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

### 2. Client Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Specifications
Refer to the `docs/` folder for detailed plans:
*   [PRD.md](file:///d:/Odoo%20Hackathon%202026/TransitOPs/docs/PRD.md)
*   [Tech_Stack.md](file:///d:/Odoo%20Hackathon%202026/TransitOPs/docs/Tech_Stack.md)
*   [Design.md](file:///d:/Odoo%20Hackathon%202026/TransitOPs/docs/Design.md)
*   [API.md](file:///d:/Odoo%20Hackathon%202026/TransitOPs/docs/API.md)
*   [Database.md](file:///d:/Odoo%20Hackathon%202026/TransitOPs/docs/Database.md)
