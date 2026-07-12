# TransitOps

Transportation operations management platform.

## Prerequisites

- **Node.js** v18+
- **MySQL** 8.0+
- **npm**

## Setup

### 1. Clone & install dependencies

```bash
git clone https://github.com/DivyaJaviya01/transitops.git
cd transitops

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Configure database

Create a MySQL database:

```sql
CREATE DATABASE transitops;
```

Update `server/.env` with your credentials:

```
DATABASE_URL="mysql://root:yourpassword@localhost:3306/transitops"
PORT=5000
JWT_SECRET="your-secret-key"
```

### 3. Run migrations

```bash
cd server
npx prisma migrate dev
```

### 4. Start the app

```bash
# Terminal 1 - Backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 - Frontend (http://localhost:5173)
cd client
npm run dev
```

## Default workflow

1. Open `http://localhost:5173`
2. **Sign Up** with a role (use **"Fleet Manager"** for full access)
3. **Sign In** with your credentials
4. Start managing vehicles, drivers, trips, etc.

## Roles & permissions

| Role | Can create vehicles/drivers/trips |
|------|-----------------------------------|
| Fleet Manager | Yes (full access) |
| Safety Officer | Can create drivers only |
| Driver | View only, complete trips |
| Financial Analyst | View reports & analytics |
