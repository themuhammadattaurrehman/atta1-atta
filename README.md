# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Atta1-Atta React Dashboard

A multi-role dashboard application built with React, Vite, and Tailwind CSS.  
Supports SuperAdmin, Admin, Manager, and User roles with authentication, tenant management, notifications, and a dark/light theme toggle.

---

## Features

- 🔒 **Authentication** (Login/Register)
- 🏢 **Tenant Management** (CRUD for SuperAdmin)
- 👤 **Role-based Dashboards** (SuperAdmin, Admin, Manager, User)
- 📨 **Notification System** (Admin can add notifications)
- 🌗 **Theme Toggle** (Dark/Light mode, persists in localStorage)
- ⚡ **Fast Development** with Vite
- 🎨 **Styled with Tailwind CSS**

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/atta1-atta.git
cd atta1-atta
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
src/
  components/         # Reusable UI components
  pages/              # Page components (Login, SuperAdmin, Tenant, etc.)
  Sidebar/            # Sidebar navigation
  App.jsx             # Main app with theme toggle
  main.jsx            # Entry point
```

---

## Theme Toggle

- Click the button at the top-right to switch between light and dark mode.
- The theme preference is saved in `localStorage`.

---

## Backend

- The app expects a backend API running at `http://localhost:5000/api`.
- Update API URLs in the code if your backend runs elsewhere.

---

## Customization

- Update Tailwind config in `tailwind.config.js` as needed.
- Add or modify roles, pages, and components in the `src/` directory.

---

## License