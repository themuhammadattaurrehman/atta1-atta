import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api"; // change to your backend URL
  const TENANT_API = "http://localhost:5000/api/tenants";
export default function Tenant() {
  const [admins, setAdmins] = useState([]);
  const [tenants, setTenants] = useState([]);
   const [popup, setPopup] = useState(null);
     const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

  // ✅ Fetch admins on load
  useEffect(() => {
      fetchTenants();
    // fetchAdmins();
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
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // if auth required
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


    //   const fetchAdmins = async () => {
    //   try {
    //     const token = localStorage.getItem("token");
    //     console.log("Fetching admins with token:", token);
    //     const res = await fetch(`${API_URL}/users/managers-users`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const data = await res.json();
    //     console.log("Fetched Admins:", data);
    //     setAdmins(data.data || []);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
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

    // optionally refresh tenants list
    fetchTenants();
    // setLoading(false);
  } catch (err) {
    console.error(err);
    setPopup({ type: "error", message: "Failed to delete tenant!" });
  }
};


  // ✅ Approve/Unapprove toggle
// const toggleApproval = async (id, currentStatus) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API_URL}/users/${id}/approval`, {
//       method: "PUT", // <-- changed from POST to PUT
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ approved: !currentStatus }),
//     });

//     const data = await res.json();
//     console.log("Approval toggled:", data);
//     // update state without reload
//     setAdmins((prev) =>
//       prev.map((a) => (a.id === id ? { ...a, approved: data.user.approved } : a))
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };


//   if (loading) return <p className="text-center">Loading...</p>;

  return (
     <div className="p-6">
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"  onClick={() => navigate("/superadmindashboard/tenant/add")}>
        Add Tenant
      </button>
      <h2 className="text-2xl font-bold mb-4">Tenants</h2>

      {/* Popup message */}
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
