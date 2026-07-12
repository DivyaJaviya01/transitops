# Product Requirement Document (PRD) - TransitOps

## 1. Project Overview
TransitOps is a centralized, end-to-end transport operations platform designed to digitize and streamline fleet management, driver management, trip dispatching, maintenance scheduling, and expense tracking. It replaces manual processes (spreadsheets, logbooks) with a web-based portal to prevent scheduling conflicts, ensure safety compliance, and provide financial insights.

---

## 2. Target Users & Roles
The system enforces Role-Based Access Control (RBAC) for the following roles:
*   **Fleet Manager**: Manages vehicle lifecycle, schedules maintenance, and monitors fleet utilization and operational efficiency.
*   **Driver**: Views assigned trips, creates trips, logs trip status updates, and updates vehicle odometers.
*   **Safety Officer**: Reviews driver compliance, validates driver licenses, and monitors safety scores.
*   **Financial Analyst**: Analyzes fuel costs, maintenance expenses, overall operational costs, and vehicle ROI.

---

## 3. Functional Requirements

### 3.1 Authentication & Authorization
*   Secure email/password authentication.
*   RBAC mapping permissions to Fleet Manager, Driver, Safety Officer, and Financial Analyst roles.
*   Protected routes requiring active session.

### 3.2 Dashboard & KPIs
*   **KPI Metrics**:
    *   Active Vehicles (currently on trip)
    *   Available Vehicles (ready for dispatch)
    *   Vehicles in Maintenance (status = "In Shop")
    *   Active Trips, Pending Trips
    *   Drivers On Duty
    *   Fleet Utilization (%) = (Active Vehicles / Total Registered Vehicles) * 100
*   **Filters**: Ability to filter dashboard views by vehicle type, status, and region.

### 3.3 Vehicle Registry (CRUD)
*   **Attributes**:
    *   Registration Number (unique string, e.g., license plate)
    *   Vehicle Name/Model
    *   Type (e.g., Truck, Van, Sedan)
    *   Maximum Load Capacity (in kg)
    *   Current Odometer Reading (in km)
    *   Acquisition Cost (currency)
    *   Status: `Available`, `On Trip`, `In Shop`, `Retired`
*   **Rules**: Status changes automatically based on trips and maintenance logs.

### 3.4 Driver Management (CRUD)
*   **Attributes**:
    *   Name
    *   License Number (unique)
    *   License Category (e.g., Heavy Duty, Light)
    *   License Expiry Date
    *   Contact Number
    *   Safety Score (0 - 100)
    *   Status: `Available`, `On Trip`, `Off Duty`, `Suspended`

### 3.5 Trip Management
*   **Create Trip**: Define Source, Destination, Driver, Vehicle, Cargo Weight (kg), and Planned Distance (km).
*   **Trip Lifecycle**: `Draft` -> `Dispatched` -> `Completed` -> `Cancelled`
*   **Workflow Actions**:
    *   **Dispatch**: Starts the trip.
    *   **Complete**: Ends the trip, prompting user for final odometer reading and fuel consumed.
    *   **Cancel**: Cancels the trip.

### 3.6 Maintenance Log
*   Create maintenance logs recording:
    *   Vehicle
    *   Maintenance Type (e.g., Oil Change, Engine Repair)
    *   Start Date
    *   Estimated Completion Date
    *   Actual Completion Date
    *   Cost
*   **Workflow**: Adding a vehicle to an active maintenance log automatically sets status to `In Shop`.

### 3.7 Fuel & Expense Tracking
*   **Fuel Logs**: Record date, vehicle, liters consumed, and total cost.
*   **Expenses**: Record generic expenses (e.g., tolls, parking, ad-hoc maintenance) per vehicle with date, amount, and category.
*   **Calculated Values**: Automatic calculation of cumulative operational cost per vehicle:
    `Total Operational Cost = Total Fuel Cost + Total Maintenance/Expense Cost`

### 3.8 Reports & Analytics
*   **Analytics metrics**:
    *   Fuel Efficiency = Total Distance (km) / Total Fuel Consumed (L)
    *   Fleet Utilization (%) over time
    *   Operational Cost per vehicle
    *   Vehicle ROI = (Revenue - (Maintenance + Fuel)) / Acquisition Cost
*   **Export**: CSV export support (PDF export optional).

---

## 4. Mandatory Business Rules & Validations

1.  **Registration Uniqueness**: Vehicle registration number and driver license number must be unique.
2.  **Dispatch Selection Constraints**:
    *   Retired or In Shop vehicles must not appear in dispatch selection pools.
    *   Drivers with expired licenses or "Suspended" status cannot be assigned to trips.
    *   Vehicles or Drivers currently "On Trip" cannot be assigned to new trips.
3.  **Cargo Limit**: Cargo weight of a trip must not exceed the maximum load capacity of the selected vehicle.
4.  **Automatic Status Transitions**:
    *   **Dispatching trip**: Automatically transitions selected Vehicle and Driver status to `On Trip`.
    *   **Completing trip**: Transitions Vehicle and Driver status back to `Available` (unless vehicle requires maintenance or driver license expired).
    *   **Cancelling trip**: Returns Vehicle and Driver status back to `Available`.
    *   **Creating maintenance log**: Sets Vehicle status to `In Shop`.
    *   **Closing maintenance log**: Restores Vehicle status to `Available` (unless marked `Retired`).

---

## 5. User Workflows

### 5.1 End-to-End Trip & Maintenance Workflow
1.  **Registry**: Fleet Manager registers vehicle `Van-05` (Max Capacity: 500kg, Status: `Available`).
2.  **Compliance**: Safety Officer registers driver `Alex` with valid license (Status: `Available`).
3.  **Scheduling**: Fleet Manager creates trip with Cargo Weight = 450 kg.
4.  **Validation**: System checks 450 kg <= 500 kg (Valid).
5.  **Dispatch**: Manager clicks "Dispatch". Driver and Vehicle status change to `On Trip`.
6.  **Trip Finish**: Driver completes the trip, entering final odometer and fuel consumed.
7.  **Status Release**: Driver and Vehicle status transition back to `Available`.
8.  **Maintenance**: Fleet Manager logs oil change for `Van-05`. Vehicle status changes to `In Shop`, hiding it from future dispatch selections.
9.  **Reporting**: Financial Analyst opens reports. Operational costs and fuel efficiency recalculate immediately.

---

## 6. Mockup & Layout Reference
Mockup designs are hosted at: [Excalidraw Board](https://link.excalidraw.com/l/65VNwvy7c4X/1FHGDNgD2td)
