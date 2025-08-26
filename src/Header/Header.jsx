import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/img/logo.jpeg";
import profile from "../assets/img/profile-img.jpg";
import { useNavigate } from "react-router-dom";
import Bell from "lucide-react/dist/esm/icons/bell";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [organization, setOrganization] = useState("");
  const router = useNavigate();
  const dropdownRef = useRef(null);
  const fetchWithAuth = async (url, options = {}) => {
    let token = localStorage.getItem("token");
    let refreshToken = localStorage.getItem("refreshToken");

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    let response = await fetch(url, options);
    if (response.status === 401 && refreshToken) {
      console.log("⚠️ Access token expired. Trying refresh...");
      const refreshRes = await fetch("http://localhost:5000/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (refreshRes.ok) {
        const { accessToken } = await refreshRes.json();
        localStorage.setItem("token", accessToken);
        options.headers.Authorization = `Bearer ${accessToken}`;
        response = await fetch(url, options);
      } else {
        console.error("❌ Refresh token failed");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return response;
  };

  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const tenantId = user?.TenantId;

      if (!tenantId) {
        throw new Error("TenantId not found in localStorage");
      }

      const res = await fetchWithAuth(
        `http://localhost:5000/api/notifications/${tenantId}`,
        { method: "GET" }
      );

      const data = await res.json();

      if (res.ok) {
        setNotifications(data || []);
      } else {
        console.error("Backend error:", data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error fetching notifications:", err.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name || "");
      setRole(user.role || "");
      setOrganization(user.organization || "");
      setId(user.id || "");
    }
    fetchNotifications();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSignOut = () => {
    localStorage.clear();
    router("/");
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <header className="h-12 fixed top-0 left-0 w-full flex items-center shadow-md z-10">
        <div className="flex items-center justify-between w-full px-4 lg:px-8">
          <a className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8" />
            <span className="hidden lg:block ml-2 font-bold text-lg">
              System
            </span>
          </a>
        </div>
        <div className="flex items-center mr-20 space-x-4">
          <div className="relative mr-3" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 border rounded shadow-lg z-50 bg-white dark:bg-gray-800">
                <div className="p-2 border-b font-semibold">Notifications</div>
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <li
                        key={n.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="text-sm">{n.message}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(n.createdAt).toLocaleString()}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-gray-500">
                      No notifications
                    </li>
                  )}
                </ul>
                <div className="p-2 border-t text-center text-blue-600 cursor-pointer hover:bg-gray-100">
                  View All
                </div>
              </div>
            )}
          </div>
          <nav className="ml-auto">
            <ul className="flex items-center space-x-4">
              <li className="relative mr-2">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center text-gray-500 focus:outline-none"
                >
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden md:block ml-4 mr-10 font-medium">
                    {name}
                  </span>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 shadow-md rounded-md w-48 bg-white dark:bg-gray-800">
                    <div className="p-4 border-b text-center">
                      <h6 className="font-bold">{name}</h6>
                      <span className="text-sm text-gray-500">{role}</span>
                    </div>
                    <div className="p-4">
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
                      >
                        <i className="bi bi-box-arrow-right text-gray-500"></i>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
