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
        <Route path="/" element={<Login />} />
        <Route
          path="/superadmindashboard"
          element={
            <MainLayout
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
        >
          <Route index element={<SuperAdmin />} />
          <Route path="tenant" element={<Tenant />} />
          <Route path="tenant/add" element={<TenantAdd />} />
        </Route>
        <Route
          path="/admindashboard/*"
          element={
            <MainLayout
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
        >
          <Route index element={<Admin />} />
          <Route path="notification/add" element={<NotificationAdd />} />
        </Route>
        <Route
          path="/managerdashboard/*"
          element={
            <MainLayout
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
        >
          <Route index element={<Manager />} />
        </Route>
        <Route
          path="/user/*"
          element={
            <MainLayout
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Calling_all_item;
