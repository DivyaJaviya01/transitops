<p align="center">
  <samp>
    <big><strong>TransitOps</strong></big><br>
    <sub>Smart Transport Operations Platform</sub>
  </samp>
</p>

<p align="center">
  <b>Odoo Hackathon 2026 — Team Runtime Terrors</b><br>
  <i>Enterprise fleet management, trip planning, and operational analytics</i>
</p>

<p align="center">
  <code>Node.js 18+</code>
  <code>React 18</code>
  <code>TypeScript</code>
  <code>Express 4</code>
  <code>Prisma 6</code>
  <code>MySQL 8</code>
  <code>Tailwind CSS 3</code>
  <code>Vite 5</code>
  <code>JWT</code>
</p>

---

## Team

| | Member | Role | GitHub |
|---|--------|------|--------|
| <img src="https://github.com/DivyaJaviya01.png?size=40" width="32" height="32" style="border-radius:50%"> | **Divya Javiya** | Full Stack Developer | [@DivyaJaviya01](https://github.com/DivyaJaviya01) |
| <img src="https://github.com/krisha-akbari8326.png?size=40" width="32" height="32" style="border-radius:50%"> | **Krisha Akbari** | Frontend Developer | [@krisha-akbari8326](https://github.com/krisha-akbari8326) |
| <img src="https://github.com/khushop03.png?size=40" width="32" height="32" style="border-radius:50%"> | **Khush Dobariya** | Backend Developer | [@khushop03](https://github.com/khushop03) |
| <img src="https://github.com/RJV-44.png?size=40" width="32" height="32" style="border-radius:50%"> | **Rajvi Lunagariya** | UI/UX Designer | [@RJV-44](https://github.com/RJV-44) |

---

## Overview

TransitOps is a **full-stack fleet management platform** built for the **Odoo Hackathon 2026**. It enables organizations to:

- **Manage vehicles** — Track fleet inventory, status, and maintenance
- **Manage drivers** — Licenses, safety scores, availability
- **Plan & dispatch trips** — End-to-end trip lifecycle (Draft → Dispatched → Completed)
- **Track expenses** — Fuel logs, tolls, parking, permits
- **Schedule maintenance** — Active/closed work orders with cost tracking
- **Generate reports** — KPIs, vehicle analytics, CSV export
- **Notifications** — Role-aware alerts for fleet events

---

## Architecture

```mermaid
graph TB
    subgraph Frontend["Frontend (React + Vite + TypeScript)"]
        direction TB
        UI[React UI Components]
        RC[React Query Cache]
        AC[Auth Context<br/>JWT in localStorage]
        RT[React Router<br/>7 Pages + Auth]
        RC --- UI
        AC --- UI
        RT --- UI
    end

    subgraph API["API Layer (Axios → localhost:5000)"]
        AX[API Client<br/>src/services/api.ts]
    end

    subgraph Backend["Backend (Express + Node.js ESM)"]
        direction TB
        MW[Auth Middleware<br/>JWT Verify + Role Guard]
        RC2[Route Controllers]
        PM[Prisma ORM]
        MW --> RC2
        RC2 --> PM
    end

    subgraph Database["Database (MySQL 8.0)"]
        DB[(transitops)]
        UV[Users]
        VH[Vehicles]
        DR[Drivers]
        TP[Trips]
        MT[Maintenance Logs]
        FL[Fuel Logs]
        EX[Expenses]
        NT[Notifications]
    end

    UI --> AX
    AX --> MW
    PM --> DB
    DB --- UV
    DB --- VH
    DB --- DR
    DB --- TP
    DB --- MT
    DB --- FL
    DB --- EX
    DB --- NT

    style Frontend fill:#1a1f2e,stroke:#3b82f6,stroke-width:2px
    style Backend fill:#1a1f2e,stroke:#8a3cff,stroke-width:2px
    style Database fill:#1a1f2e,stroke:#10b981,stroke-width:2px
```

---

## Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | v18+ |
| **MySQL** | 8.0+ |
| **npm** | 9+ |

### 1. Clone & Install

```bash
git clone https://github.com/DivyaJaviya01/transitops.git
cd transitops

# Backend dependencies
cd server && npm install

# Frontend dependencies
cd ../client && npm install
```

### 2. Configure Database

```sql
CREATE DATABASE transitops;
```

Edit **`server/.env`**:

```env
DATABASE_URL="mysql://root:your_password@localhost:3306/transitops"
PORT=5000
JWT_SECRET="transitops-secret-key-12345"
```

### 3. Migrate & Seed

```bash
cd server
npx prisma migrate dev
npm run db:seed
```

### 4. Start

```bash
# Terminal 1 — Backend (port 5000)
cd server && npm run dev

# Terminal 2 — Frontend (port 5173)
cd client && npm run dev
```

---

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| **Fleet Manager** | `manager@transitops.com` | `divya123` |
| **Safety Officer** | `safety@transitops.com` | `divya123` |
| **Financial Analyst** | `finance@transitops.com` | `divya123` |
| **Driver** | `driver@transitops.com` | `divya123` |

> All accounts share password `divya123`. Register new users at `/register`.

---

## Database Schema

```mermaid
erDiagram
    User ||--o{ Notification : creates
    Vehicle ||--o{ Trip : assigned
    Vehicle ||--o{ MaintenanceLog : scheduled
    Vehicle ||--o{ FuelLog : consumes
    Vehicle ||--o{ Expense : incurs
    Driver ||--o{ Trip : drives

    User {
        string id PK
        string email UK
        string password
        string name
        string role
        datetime createdAt
        datetime updatedAt
    }

    Vehicle {
        string registrationNumber PK
        string name
        string type
        float maxLoadCapacity
        float odometer
        float acquisitionCost
        string status
        datetime createdAt
        datetime updatedAt
    }

    Driver {
        string id PK
        string name
        string licenseNumber UK
        string licenseCategory
        datetime licenseExpiryDate
        string contactNumber
        float safetyScore
        string status
        datetime createdAt
        datetime updatedAt
    }

    Trip {
        string id PK
        string source
        string destination
        float cargoWeight
        float plannedDistance
        float actualDistance
        float fuelConsumed
        string status
        string vehicleId FK
        string driverId FK
        datetime createdAt
        datetime updatedAt
    }

    MaintenanceLog {
        string id PK
        string type
        float cost
        datetime startDate
        datetime estimatedCompletionDate
        datetime actualCompletionDate
        string status
        string vehicleId FK
        datetime createdAt
        datetime updatedAt
    }

    FuelLog {
        string id PK
        float liters
        float cost
        datetime date
        string vehicleId FK
        datetime createdAt
    }

    Expense {
        string id PK
        float amount
        datetime date
        string category
        string description
        string vehicleId FK
        datetime createdAt
    }

    Notification {
        string id PK
        string title
        string message
        string type
        boolean isRead
        string link
        datetime createdAt
    }
```

---

## Role-Based Access Control

| Capability | Fleet Manager | Safety Officer | Financial Analyst | Driver |
|------------|:---:|:---:|:---:|:---:|
| **View all data** | Y | Y | Y | Y |
| **Create vehicles** | Y | - | - | - |
| **Delete vehicles** | Y | - | - | - |
| **Create drivers** | Y | Y | - | - |
| **Delete drivers** | Y | - | - | - |
| **Create/dispatch trips** | Y | - | - | - |
| **Complete trips** | Y | - | - | Y |
| **Cancel trips** | Y | - | - | - |
| **Create maintenance** | Y | - | - | - |
| **Log fuel** | Y | - | - | Y |
| **Log other expenses** | Y | - | - | - |
| **Vehicle analytics** | Y | - | Y | - |
| **CSV export** | Y | - | Y | - |
| **Dashboard KPIs** | Y | Y | Y | Y |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| <img src="https://img.shields.io/badge/--181717?logo=react" width="0"> **Frontend** | **React 18** + **TypeScript** | UI components |
| | **Vite 5** | Build tool |
| | **Tailwind CSS 3** | Styling |
| | **React Router 7** | Client-side routing |
| | **React Query 5** | Server state & caching |
| | **Recharts** | Data visualization (area graphs) |
| | **React Hook Form** + **Zod** | Form validation |
| | **Axios** | HTTP client |
| | **Sonner** | Toast notifications |
| | **React Icons** | Icon library |
| <img src="https://img.shields.io/badge/-181717?logo=node.js" width="0"> **Backend** | **Node.js** + **Express 4** | REST API server |
| | **Prisma 6** | ORM & migrations |
| | **JWT** | Authentication |
| | **bcryptjs** | Password hashing |
| | **dotenv** | Environment config |
| | **cors** | Cross-origin requests |
| <img src="https://img.shields.io/badge/-181717?logo=mysql" width="0"> **Database** | **MySQL 8.0** | Relational database |

---

## Features

### Core Modules

| Module | Description | Key Capabilities |
|--------|-------------|------------------|
| **Dashboard** | Real-time fleet overview | KPIs, active trips graph, recent activity feed |
| **Vehicles** | Fleet asset management | CRUD, status tracking, type/load capacity management |
| **Drivers** | Driver profile management | License tracking, safety scoring, availability |
| **Trips** | Trip lifecycle management | Draft → Dispatch → Complete pipeline, business rule validation (capacity, license expiry) |
| **Expenses** | Cost tracking | Fuel logs, tolls/parking/permits, per-vehicle costing |
| **Maintenance** | Work order management | Active/closed status, auto-vehicle status sync, expense auto-generation |
| **Reports** | Analytics & exports | Fleet KPIs, vehicle ROI analytics, CSV export |

### Business Rules Enforced

- `[x]` **Vehicle capacity check** before dispatching trips
- `[x] **Driver license expiry validation** before dispatch
- `[x] **Vehicle/driver availability** — auto-set when trip dispatched/completed/cancelled
- `[x]` **Maintenance ↔ vehicle sync** — vehicle set to `In Shop` on maintenance create, reverted on close
- `[x] **Fuel log auto-creation** on trip completion
- `[x] **Expense auto-generation** on maintenance close
- `[x] **Cascading cache invalidation** — trip/expense/maintenance mutations refresh all related queries

### UI Features

- `[x] **Dark/Light theme** — System preference + manual toggle (persisted in localStorage)
- `[x] **Responsive design** — Desktop-first with mobile breakpoints
- `[x] **List/Grid views** on Drivers and Vehicles pages
- `[x] **CSV export** on all data pages
- `[x] **Notification system** — Unread badge, mark-as-read
- `[x] **Optimistic UI** with React Query cache invalidation

---

## Odoo Hackathon 2026

We built TransitOps in **6 hours**. 

It was chaos. Four screens, one shared MySQL database, and a lot of caffeine. Divya was juggling Prisma migrations while Krisha was hot-reloading the frontend for the 50th time. Khush kept muttering "just one more endpoint" while Rajvi was frantically adjusting padding because "it doesn't look right on 1440px." At some point we realized none of us had committed in two hours and the merge conflicts were going to be biblical.

But we shipped it. 

Eight database models, thirty API endpoints, a React frontend with dark mode, role-based access control, and enough business rules to make an ERP blush. All in a single weekend.

Same energy. Same team. Same Runtime Terrors energy.

### What we packed in

| Metric | Number |
|--------|--------|
| Database models | 8 |
| REST API endpoints | ~30 |
| Frontend pages | 7 + auth |
| Business rules enforced | 11+ |
| Vehicles seeded | 20 |
| Drivers seeded | 15 |
| Trips seeded | 17 |
| Hours to build | ~6 |
| Cups of coffee | yes |

---

<p align="center">
  <sub>Built for <b>Odoo Hackathon 2026</b> by Team Runtime Terrors — Divya, Krisha, Khush, and Rajvi</sub><br>
  <sub>2026 Runtime Terrors. All rights reserved.</sub>
</p>
