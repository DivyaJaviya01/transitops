# Design Specification - TransitOps

## 1. Visual Theme & Aesthetics
TransitOps features a premium, state-of-the-art interface tailored for high readability and professional utility. The theme leverages **Glassmorphism**, smooth CSS transitions, and deep dark/light mode contrasts.

### Typography
*   **Primary Font**: `Outfit` (sans-serif) via Google Fonts (for clean headings and metrics).
*   **Secondary/Body Font**: `Inter` (sans-serif) (for density, forms, and data tables).
*   **Monospace Font**: `JetBrains Mono` (for registration plates, IDs, and odometer numbers).

### Color Palette (HSL System)
We use HSL to allow clean, programmatic light/dark variations and opacity adjustments.

| Token | Light Mode Value | Dark Mode Value | Purpose |
|---|---|---|---|
| `--bg-primary` | `hsl(210, 20%, 98%)` | `hsl(222, 47%, 6%)` | Main application background |
| `--bg-secondary` | `hsl(0, 0%, 100%)` | `hsl(223, 47%, 11%)` | Card / Sidebar / Component background |
| `--border-color` | `hsl(214, 32%, 91%)` | `hsl(223, 47%, 18%)` | Dividers, card borders, form fields |
| `--text-primary` | `hsl(222, 47%, 12%)` | `hsl(210, 20%, 98%)` | Primary text, titles |
| `--text-secondary` | `hsl(215, 16%, 47%)` | `hsl(215, 20%, 65%)` | Secondary metadata and labels |
| `--accent-brand` | `hsl(256, 100%, 60%)` | `hsl(256, 100%, 67%)` | Interactive elements, active state, Odoo purple |
| `--accent-success` | `hsl(142, 70%, 45%)` | `hsl(142, 76%, 36%)` | Available status, positive growth |
| `--accent-warning` | `hsl(38, 92%, 50%)` | `hsl(38, 92%, 44%)` | Suspended status, In Shop, pending |
| `--accent-danger` | `hsl(350, 89%, 60%)` | `hsl(350, 89%, 55%)` | Retired, cancelled status |

### Glassmorphism & Depth
*   **Card Styling**:
    ```css
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
    backdrop-filter: blur(8px);
    ```

---

## 2. Global Layout Structure
The application layout uses a responsive two-column grid:

```
+-------------------------------------------------------------+
|  [Logo] TransitOps         [Header: Current User | Role]    |
+-------------------------------------------------------------+
|  Sidebar         |  Main Content Pane                       |
|  - Dashboard     |  +------------------------------------+  |
|  - Vehicles      |  | Dashboard / Grid / Tab Content     |  |
|  - Drivers       |  +------------------------------------+  |
|  - Trips         |  |                                    |  |
|  - Maintenance   |  |                                    |  |
|  - Reports       |  |                                    |  |
+------------------+-------------------------------------------+
```

*   **Sidebar**: Collapsible on mobile, anchored on the left side on desktop.
*   **Header**: Displays name, role tag, and dark/light mode toggle.
*   **Main Content**: Centered, max-width constraints (`1400px`) to prevent visual stretching on widescreen monitors.

---

## 3. UI Component Details

### 3.1 KPI Cards (Dashboard)
*   **Design**: Large bold metrics with HSL-accented icon containers.
*   **Micro-interaction**: Hover triggers a subtle scale lift (`scale(1.02)`) and background color shift.
*   ```css
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s;
    ```

### 3.2 Data Tables (Vehicles & Drivers)
*   **Density**: Balanced spacing (`padding: 12px 16px`).
*   **Interactivity**: Row hover colors shift dynamically. Badge components are colored using corresponding semantic accent categories (`--accent-success`, `--accent-warning`, etc.).
*   **Status Badges**:
    *   `Available`: Green pill background (`opacity 15%`), green text.
    *   `On Trip`: Blue pill background, blue text.
    *   `In Shop` / `Suspended`: Amber pill background, amber text.
    *   `Retired` / `Cancelled`: Red pill background, red text.

### 3.3 Dynamic Form Inputs
*   **Focus State**: Input borders glow with brand accent color using CSS `box-shadow`:
    ```css
    border-color: var(--accent-brand);
    box-shadow: 0 0 0 4px hsla(256, 100%, 60%, 0.15);
    ```
*   **Validation Alerts**: Live feedback indicators beneath inputs for cargo weight constraints (e.g. showing "Overweight by X kg" dynamically in real time).

---

## 4. Key Transition States & Micro-Animations

### Page Navigation
*   Content shifts upwards slightly and fades in using CSS Keyframes:
    ```css
    @keyframes fadeInSlideUp {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    ```

### Buttons & Interactive Badges
*   Clicks utilize a scale transform click effect (`active: scale(0.97)`).
*   Buttons loading status represented by a smooth spinner rotation.
