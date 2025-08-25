import React, { useState } from "react";

const NOTIFICATION_API = "http://localhost:5000/api/notifications";

const NotificationAdd = () => {
  const [message, setMessage] = useState(""); // input value
  const [status, setStatus] = useState(""); // success/error message
  const [loading, setLoading] = useState(false);

 console.log("TenantId:", localStorage.user?.TenantId);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!message.trim()) {
    setStatus("⚠️ Please enter a notification message");
    return;
  }

  setLoading(true);
  setStatus("");

  try {
    const token = localStorage.getItem("token"); // JWT token
    const user = JSON.parse(localStorage.getItem("user")); // Parse user object
    const tenantId = user?.TenantId; // Get TenantId safely

    if (!tenantId) {
      throw new Error("TenantId not found in localStorage");
    }

    const res = await fetch(`${NOTIFICATION_API}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        message, 
        tenantId   // 👈 send tenantId with the message
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error creating notification");
    }

    setStatus("✅ Notification created successfully!");
    setMessage(""); // clear input after success
  } catch (err) {
    console.error("Notification create error:", err.message);
    setStatus("❌ " + err.message);
  } finally {
    setLoading(false);
  }
};


  return (

    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Notification</h2>
      {status && (
        <p
          className={`mb-4 ${
            status.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {status}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Notification Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
           className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Notification"}
        </button>
      </form>
    </div>
  );
};

export default NotificationAdd;
