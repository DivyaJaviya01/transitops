# Technology Stack - TransitOps

## 1. Frontend Architecture
*   **Framework**: [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
    *   *Why*: Fast dev reload, component-driven, easy state management.
*   **Styling**: Vanilla CSS (Custom Properties / CSS Variables)
    *   *Why*: Premium bespoke aesthetics, no bloated CSS framework dependencies, complete control over modern UI/UX design.
*   **Icons**: [Lucide React](https://lucide.dev/)
    *   *Why*: Modern, clean, consistent vector icon pack.
*   **Routing**: [React Router DOM](https://reactrouter.com/) (SPA Routing)

---

## 2. Backend & Database Services
*   **Platform**: [Firebase](https://firebase.google.com/) (via `firebase-mcp-server` integration)
*   **Authentication**: Firebase Authentication
    *   *Why*: Built-in email/password auth and role metadata secure storage.
*   **Database**: Cloud Firestore (NoSQL Document Store)
    *   *Why*: Real-time updates for live trip tracking, document-based architecture aligning with vehicle, driver, and trip profiles.
*   **Hosting**: Firebase Hosting
    *   *Why*: Global CDN, simple deployment commands, secure HTTPS by default.

---

## 3. Database Schema Design (Cloud Firestore)

### `users` (Collection)
*   `uid` (Document ID): String
*   `email`: String
*   `role`: String (`"Fleet Manager"` | `"Driver"` | `"Safety Officer"` | `"Financial Analyst"`)
*   `name`: String

### `vehicles` (Collection)
*   `registrationNumber` (Document ID): String (Unique)
*   `name`: String
*   `type`: String (`"Truck"` | `"Van"` | `"Sedan"`)
*   `maxLoadCapacity`: Number (kg)
*   `odometer`: Number (km)
*   `acquisitionCost`: Number
*   `status`: String (`"Available"` | `"On Trip"` | `"In Shop"` | `"Retired"`)

### `drivers` (Collection)
*   `driverId` (Document ID): String
*   `name`: String
*   `licenseNumber`: String (Unique)
*   `licenseCategory`: String
*   `licenseExpiryDate`: Timestamp
*   `contactNumber`: String
*   `safetyScore`: Number (0-100)
*   `status`: String (`"Available"` | `"On Trip"` | `"Off Duty"` | `"Suspended"`)

### `trips` (Collection)
*   `tripId` (Document ID): String
*   `source`: String
*   `destination`: String
*   `vehicleId`: String (Ref: `vehicles`)
*   `driverId`: String (Ref: `drivers`)
*   `cargoWeight`: Number (kg)
*   `plannedDistance`: Number (km)
*   `actualDistance`: Number (km, populated on completion)
*   `fuelConsumed`: Number (Liters, populated on completion)
*   `status`: String (`"Draft"` | `"Dispatched"` | `"Completed"` | `"Cancelled"`)
*   `timestamps`: Map
    *   `created`: Timestamp
    *   `dispatched`: Timestamp
    *   `completed`: Timestamp

### `maintenance_logs` (Collection)
*   `logId` (Document ID): String
*   `vehicleId`: String (Ref: `vehicles`)
*   `type`: String
*   `cost`: Number
*   `startDate`: Timestamp
*   `estimatedCompletionDate`: Timestamp
*   `actualCompletionDate`: Timestamp
*   `status`: String (`"Active"` | `"Closed"`)

### `fuel_logs` (Collection)
*   `logId` (Document ID): String
*   `vehicleId`: String (Ref: `vehicles`)
*   `liters`: Number
*   `cost`: Number
*   `date`: Timestamp

### `expenses` (Collection)
*   `expenseId` (Document ID): String
*   `vehicleId`: String (Ref: `vehicles`)
*   `amount`: Number
*   `date`: Timestamp
*   `category`: String (`"Tolls"` | `"Parking"` | `"Permits"` | `"Other"`)
*   `description`: String

---

## 4. Prototyping & Development Tools
*   **Prototyping**: StitchMCP (for rapid screen layout generation and iteration)
*   **Environment**: Node.js & npm
*   **Linter/Formatter**: ESLint & Prettier
