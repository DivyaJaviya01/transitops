# Git Workflow - TransitOps

## Branch Structure

```
main
│
└── develop
     ├── feature/backend-core
     ├── feature/backend-business
     ├── feature/frontend-ui
     └── feature/frontend-integration
```

---

# Important Rules

✅ Never push directly to `main`

✅ Never push directly to `develop`

✅ Everyone works only on their own branch.

---

# First Time Setup

Clone the repository

```bash
git clone <repo-url>

cd TransitOps
```

Fetch all branches

```bash
git fetch --all
```

Switch to your assigned branch

Example (UI Member)

```bash
git checkout feature/frontend-ui
```

---

# Before Starting Work Every Time

Always get the latest code.

```bash
git checkout develop
git pull origin develop
```

Go back to your branch

```bash
git checkout feature/frontend-ui
```

Merge latest changes

```bash
git merge develop
```

Now start coding.

---

# Save Your Work

Check changed files

```bash
git status
```

Add files

```bash
git add .
```

Commit

```bash
git commit -m "feat: add dashboard page"
```

Push

```bash
git push origin feature/frontend-ui
```

---

# After Pushing

Create a Pull Request

```
feature/frontend-ui
        ↓
     develop
```

Wait for Team Lead to review and merge.

---

# If Team Lead Merges Someone Else's Work

Update your local project before continuing.

```bash
git checkout develop

git pull origin develop

git checkout feature/frontend-ui

git merge develop
```

Continue working.

---

# If You Get Merge Conflicts

❌ Do NOT force push.

❌ Do NOT delete files.

Immediately inform the Team Lead.

---

# Branch Assignments

## Team Lead

```
feature/backend-core
```

Responsible for:

- Database
- Authentication
- Prisma
- API Structure
- Code Review
- Merge PRs

---

## Backend Developer

```
feature/backend-business
```

Responsible for:

- Vehicles
- Drivers
- Trips
- Maintenance
- Expenses
- Reports

---

## UI Developer

```
feature/frontend-ui
```

Responsible for:

- Pages
- Components
- Dashboard
- Tables
- Responsive Design

---

## Frontend Integration

```
feature/frontend-integration
```

Responsible for:

- API Calls
- TanStack Query
- Forms
- Authentication
- Protected Routes
- Toasts

---

# Daily Workflow

```
1. Pull latest develop

↓

2. Switch to your branch

↓

3. Merge develop into your branch

↓

4. Code

↓

5. Commit

↓

6. Push your branch

↓

7. Create Pull Request

↓

8. Team Lead merges into develop

↓

9. Everyone pulls latest develop
```

---

# Golden Rules

- Work only on your assigned branch.
- Commit frequently.
- Push your branch, **not** `develop` or `main`.
- Pull the latest `develop` before starting new work.
- Ask the Team Lead before resolving merge conflicts.
