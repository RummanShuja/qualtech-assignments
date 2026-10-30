# Loan Application Form

A responsive React loan application interface built with **Formik** and **Yup**, featuring client-side schema validation, local storage persistence, and an application summary dashboard.

---

## 🚀 Features

- **Form Management with Formik**: Controlled form state with support for text, dropdowns, date pickers, and modal lookups.
- **Robust Schema Validation (Yup)**:
  - Required field validations (Branch, Product, Scheme, Loan Type, Application Date).
  - Number validation for Loan Tenure (positive integers) and Loan Amount (greater than zero).
  - Clear inline error messages and top-level validation alerts.
- **Relationship Manager Lookup**: Interactive dialog modal to select a relationship manager.
- **Application Number Generation**: Automatic unique application reference IDs (`LN-XXXXXXXX`).
- **Data Persistence**: Saves application details to `localStorage`.
- **Dashboard Summary View**:
  - Formatted currency display in Indian Rupees (INR).
  - Formatted dates (`DD-MM-YYYY`) and tenure (`X months`).
  - Quick action buttons to **Edit Application** or create a **New Loan**.
- **Dual Save Actions**:
  - **Save**: Persists changes while staying on the form.
  - **Save & Exit**: Persists changes and navigates directly to the dashboard.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Form Handling**: [Formik](https://formik.org/)
- **Validation**: [Yup](https://github.com/jquense/yup)
- **Build Tool**: [Vite](https://vite.dev/)
- **Linter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

---

## 📁 Project Structure

```text
formik_form/
├── public/              # Static assets & favicons
├── src/
│   ├── assets/          # Images and SVGs
│   ├── App.css          # Styling for form and dashboard
│   ├── App.jsx          # Main application component & form logic
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project metadata and dependencies
└── vite.config.js       # Vite configuration
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### Installation

1. Clone or open the project folder:
   ```bash
   cd formik_form
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the local server URL (typically `http://localhost:5173`).

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server |
| `npm run build` | Compiles and bundles the application for production |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs Oxlint to check code quality |

