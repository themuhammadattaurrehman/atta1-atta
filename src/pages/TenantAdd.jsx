import React, { useState } from "react";

const TENANT_API = "http://localhost:5000/api/tenants";
const AddTenant = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Please enter tenant name");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // assuming auth token is stored in localStorage
      const response = await fetch(`${TENANT_API}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating tenant");
      }

      setMessage(data.message);
      setName(""); // reset input
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Tenant</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tenant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          {loading ? "Adding..." : "Add Tenant"}
        </button>
      </form>
    </div>
  );
};
export default AddTenant;
