# Technology Stack - TransitOps

## 1. Frontend Architecture
*   **Framework**: React (Vite + TypeScript)
*   **Styling**: Tailwind CSS & shadcn/ui (Tailwind-based primitives)
*   **Routing**: React Router DOM (v6+)
*   **State & Data Fetching**: TanStack Query (React Query v5)
*   **Form Management**: React Hook Form
*   **Validation**: Zod
*   **HTTP Client**: Axios
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **Notifications**: Sonner

---

## 2. Backend Architecture
*   **Platform**: Node.js & Express (ES Modules)
*   **Authentication**: JSON Web Tokens (JWT) for session management, bcrypt for password hashing.
*   **ORM**: Prisma ORM
*   **Database**: MySQL
*   **Security & Helpers**: CORS, Dotenv

---

## 3. Database Schema Design (Prisma / MySQL)

Refer to [schema.prisma](file:///d:/Odoo%20Hackathon%202026/TransitOPs/server/prisma/schema.prisma) for exact database structures and relationships.
*   **Users Table**: Store roles, credentials, and profile info.
*   **Vehicles Table**: Store unique registration plates, types, odometer, capacities, status.
*   **Drivers Table**: Store compliance info, safety score, status, licenses.
*   **Trips Table**: Track dispatches, statuses (`Draft` -> `Dispatched` -> `Completed` -> `Cancelled`), source/destination, distances, and fuel.
*   **Maintenance Logs**: Log start, end, estimates, costs, and status.
*   **Fuel Logs & Expenses**: Store litrage, costs, toll categories, and descriptions.
