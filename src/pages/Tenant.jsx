import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";
const TENANT_API = "http://localhost:5000/api/tenants";
export default function Tenant() {
  const [admins, setAdmins] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTenants();
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [popup]);
  const fetchTenants = async () => {
    try {
      const res = await fetch(TENANT_API, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTenants(data);
      } else {
        console.error("Failed to fetch tenants:", data.message);
      }
    } catch (err) {
      console.error("Error fetching tenants", err);
    }
  };
  const deleteTenant = async (tenantId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${TENANT_API}/${tenantId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete tenant");

      setPopup({ type: "success", message: "Tenant deleted successfully!" });
      fetchTenants();
    } catch (err) {
      console.error(err);
      setPopup({ type: "error", message: "Failed to delete tenant!" });
    }
  };

  return (
    <div className="p-6">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={() => navigate("/superadmindashboard/tenant/add")}
      >
        Add Tenant
      </button>
      <h2 className="text-2xl font-bold mb-4">Tenants</h2>
      {popup && (
        <div
          className={`mb-4 px-4 py-2 rounded-md text-white ${
            popup.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {popup.message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-t">
                <td className="px-4 py-2">{tenant.name}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteTenant(tenant.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tenants.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No tenants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
