import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import SuperAdmin from "../pages/SuperAdmin";
import Admin from "../pages/Admin";
import Manager from "../pages/Manager";
import Tenant from "../pages/Tenant";
import TenantAdd from "../pages/TenantAdd";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import NotificationAdd from "../pages/NotificationAdd";

const Calling_all_item = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* SuperAdmin dashboard */}
         <Route
        path="/superadmindashboard"
        element={<MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
    >
        {/* The 'index' route renders at the parent's path: /superadmindashboard */}
        <Route index element={<SuperAdmin />} />

        {/* These paths are now relative to /superadmindashboard */}
        <Route path="tenant" element={<Tenant />} /> {/* Renders at /superadmindashboard/tenant */}
        <Route path="tenant/add" element={<TenantAdd />} /> {/* Renders at /superadmindashboard/tenant/add */}
        <Route path="profile" element={<Profile />} /> {/* Renders at /superadmindashboard/profile */}
        <Route path="settings" element={<Settings />} /> {/* Renders at /superadmindashboard/settings */}
    </Route>

        {/* Admin dashboard */}
        <Route
          path="/admindashboard/*"
          element={<MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
        >
          <Route index element={<Admin />} />
           <Route path="notification/add" element={<NotificationAdd />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Manager dashboard */}
        <Route
          path="/managerdashboard/*"
          element={<MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
        >
          <Route index element={<Manager />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* User page */}
        <Route
          path="/user/*"
          element={<MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Calling_all_item;
