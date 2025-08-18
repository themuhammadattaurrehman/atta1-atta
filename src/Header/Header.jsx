import React, { useState,useEffect,useRef } from "react";
import Logo from "../assets/img/logo.jpeg";
import profile from "../assets/img/profile-img.jpg";
import { useNavigate } from 'react-router-dom';
import { Bell } from "lucide-react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [id,setId]=useState('');
  const [organization, setOrganization] = useState('');
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    fetchNotifications();
     const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user.name) {
      setName(user.name); // Set the role in state
      setOrganization(user.organization); // Set the organization in state
    }
  }, []);
  // Example notifications
  // const notifications = [
  //   { id: 1, text: "New user registered", time: "2 min ago" },
  //   { id: 2, text: "Tenant approved", time: "10 min ago" },
  //   { id: 3, text: "System update available", time: "1 hr ago" },
  // ];
 
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const router = useNavigate();
  // const notificationDropdown = () => {
  //   setNotificationOpen(!notificationOpen);
  // };

  // const messageDropdown = () => {
  //   setMessagesOpen(!messagesOpen);
  // };
  const handleSignOut = () => {
    if (role === 'user') {
      handleLogActivity();
    }
    // Clear user data (e.g., remove token from local storage)
    localStorage.removeItem('token'); // Adjust based on your storage method
    localStorage.clear();
    // Redirect to the login page
    router('/'); // Adjust the path based on your routing setup
  };
  // const logUserActivity = async (userId, action, details) => {
  //   try {
  //     const response = await fetch('http://localhost:5000/Admin/activity/log', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ userId, action, details }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to log activity');
  //     }

  //     const data = await response.json();
  //     console.log(data.message); // Log success message
  //   } catch (error) {
  //     console.error('Error logging activity:', error.message);
  //   }
  // };

  const handleLogActivity = () => {
    const userId = id; // Replace with actual user ID
    const action = 'logout'; // Replace with the actual action
    const details = 'User logged out'; // Additional details

    logUserActivity(userId, action, details);
  };
const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT stored after login
      const res = await fetch("http://localhost:5000/api/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setNotifications(data || []);
        console.log("Fetched Notifications:", data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Fetch notifications on mount


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <header className="h-12 header fixed top-0 left-0 w-full flex items-center bg-white shadow-md z-10">
        <div className="flex items-center justify-between w-full px-4 lg:px-8">
          {/* Logo */}
          <a href="/dashboard" className="logo flex items-center">
            <img src={Logo} alt="Logo" className="h-8" />
            <span className="hidden lg:block ml-2 font-bold text-lg">
            System
            </span>
          </a>
          <button className="text-xl lg:hidden focus:outline-none">
            <i className="bi bi-list"></i>
          </button>
        </div>

        {/* Search Bar */}
        {/* <div className="hidden lg:flex ml-4 mr-4">
        <form className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            name="query"
            placeholder="Search"
            className="bg-transparent focus:outline-none flex-1 text-sm"
          />
          <button type="submit" className="text-gray-500">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div> */}

       {/* <div className="flex items-center space-x-4 relative"> */}
        {/* Notification icon */}
        <div className="relative mr-3">
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

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
              <div className="p-2 border-b font-semibold">Notifications</div>
              <ul>
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="text-sm">{n.message}</div>
                    <div className="text-xs text-gray-400">{n.createdAt}</div>
                  </li>
                ))}
              </ul>
              <div className="p-2 border-t text-center text-blue-600 cursor-pointer hover:bg-gray-100">
                View All
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="ml-auto">
          <ul className="flex items-center space-x-4">
            {/* Profile */}
            <li className="relative mr-2">
              <button
                onClick={toggleDropdown}
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
              {/* Profile Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48">
                  <div className="p-4 border-b text-center">
                    <h6 className="font-bold">{name}</h6>
                    <span className="text-sm text-gray-500">{role}</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      // {
                      //   text: "My Profile",
                      //   icon: "bi-person",
                      //   href: "users-profile.html",
                      // },
                      // {
                      //   text: "Account Settings",
                      //   icon: "bi-gear",
                      //   href: "users-profile.html",
                      // },
                      // {
                      //   text: "Need Help?",
                      //   icon: "bi-question-circle",
                      //   href: "pages-faq.html",
                      // },
                      {
                        text: "Sign Out",
                        icon: "bi-box-arrow-right",
                        href: "#",
                      },
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.href === "#" ? undefined : item.href} // Prevent default for Sign Out
                        onClick={
                          item.text === "Sign Out" ? handleSignOut : undefined
                        } // Call sign out function
                        className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
                      >
                        <i className={`bi ${item.icon} text-gray-500`}></i>
                        <span>{item.text}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
