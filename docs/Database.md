# Database Specification (MySQL)

TransitOps uses a MySQL database managed through Prisma ORM.

## Entity Relationship Summary

```mermaid
erDiagram
    User {
        string id PK
        string email UK
        string password
        string name
        string role
        datetime createdAt
    }
    Vehicle {
        string registrationNumber PK
        string name
        string type
        float maxLoadCapacity
        float odometer
        float acquisitionCost
        string status
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
        datetime dispatchedAt
        datetime completedAt
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
    }
    FuelLog {
        string id PK
        float liters
        float cost
        datetime date
        string vehicleId FK
    }
    Expense {
        string id PK
        float amount
        datetime date
        string category
        string description
        string vehicleId FK
    }

    Vehicle ||--o{ Trip : has
    Driver ||--o{ Trip : assigned
    Vehicle ||--o{ MaintenanceLog : logs
    Vehicle ||--o{ FuelLog : logs
    Vehicle ||--o{ Expense : has
```

## Relational Constraints

1.  **Vehicle Status Constraints**:
    *   Vehicles status = `In Shop` when an active `MaintenanceLog` is opened.
    *   Vehicles status = `On Trip` when assigned to a dispatched `Trip`.
2.  **Driver Status Constraints**:
    *   Drivers status = `On Trip` when assigned to a dispatched `Trip`.
    *   Drivers with `Suspended` status or expired `licenseExpiryDate` cannot be assigned to any `Trip`.
3.  **Cascade Behavior**:
    *   Foreign keys refer to unique constraints (e.g., `vehicleId` maps to `Vehicle.registrationNumber`).
    *   Deletes are restricted if dependent references exist (e.g., cannot delete a vehicle with active trips).
