import React from "react";
import { useState, useEffect } from "react";
const Home = () => {
  useEffect(() => {
    document.title = "Dashboard";
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("Access Token:", token);
    console.log("Refresh Token:", refreshToken);
    console.log("Role:", role);
    console.log("User:", user);
  }, []);
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className=" shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          👤 User Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome to your dashboard! Here you can view your profile, check
          updates, and manage your account.
        </p>

        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
            View Profile
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
            Notifications
          </button>
          <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
