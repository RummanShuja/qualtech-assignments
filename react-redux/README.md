# React + Redux Toolkit Counter App

A simple counter application built with **React**, **Vite**, and **Redux Toolkit** (`@reduxjs/toolkit`).

## Purpose

The main purpose of this project was to practice global state management using:
- **Redux Store**: Setting up a centralized store using Redux Toolkit's `configureStore`.
- **Redux Slice**: Managing state and action reducers cleanly with `createSlice`.
- **React-Redux Hooks**: Connecting components to the store using `useSelector` and `useDispatch`.

---

## Components

The application is composed of 3 simple components:

1. **`App` (`src/App.jsx`)**
   - The root container component that structures the application layout and renders the child components.
2. **`CounterDisplay` (`src/components/CounterDisplay.jsx`)**
   - Reads the current counter value from the Redux store using the `useSelector` hook (`state.counter.value`) and displays it.
3. **`CounterButtons` (`src/components/CounterButtons.jsx`)**
   - Renders the "Increase" and "Decrease" buttons.
   - Dispatches the `increment` and `decrement` actions to the store using the `useDispatch` hook.

---

## Redux Architecture

- **Store (`src/app/store.js`)**: Configured with `configureStore`, combining the `counter` reducer into the global state.
- **Slice (`src/features/counterSlice.js`)**: Defines the `counter` slice with `initialState: { value: 0 }` and reducers for `increment` and `decrement`.
- **Provider (`src/main.jsx`)**: Uses `<Provider store={store}>` to provide access to the Redux store throughout the entire component tree.

---

## Project Structure

```text
src/
├── app/
│   └── store.js             # Redux store configuration
├── components/
│   ├── CounterButtons.jsx   # Increase and Decrease buttons
│   └── CounterDisplay.jsx   # Displays count value from Redux
├── features/
│   └── counterSlice.js      # Redux slice with state & actions
├── App.jsx                  # Main application component
├── index.css                # Styling
└── main.jsx                 # App entry point with Redux Provider
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## Tech Stack

- **React 19**
- **Redux Toolkit** (`@reduxjs/toolkit`)
- **React-Redux**
- **Vite**

