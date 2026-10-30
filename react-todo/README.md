# React Todo App

A simple and responsive Todo List web application built with **React 19** and **Vite**.

---

## 🚀 Features

- **Add Tasks**: Quickly input and add new tasks to your list.
- **Toggle Completion**: Mark tasks as complete or incomplete with a checkbox and strikethrough styling.
- **Delete Tasks**: Remove individual tasks with a single click.
- **Modern UI**: Clean, centered, and mobile-responsive card design.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler / Dev Server**: [Vite](https://vitejs.dev/)
- **Linter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- **Styling**: Vanilla CSS

---

## 📁 Project Structure

```text
react-todo/
├── public/              # Static assets
├── src/
│   ├── assets/          # Icons and images
│   ├── App.css          # Main styles
│   ├── App.jsx          # Todo application logic and UI
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

---

## 🏁 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### Installation

1. Clone or navigate to the project root directory:
   ```bash
   cd react-todo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:

```bash
npm run dev
```

Open your browser and visit the URL displayed in the terminal (typically `http://localhost:5173`).

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and bundles the application for production |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs Oxlint to check for code quality and errors |

