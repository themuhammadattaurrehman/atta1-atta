import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api"; // change to your backend URL

export default function SuperAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch admins on load
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching admins with token:", token);
        const res = await fetch(`${API_URL}/users/managers-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Fetched Admins:", data);
        setAdmins(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // ✅ Approve/Unapprove toggle
const toggleApproval = async (id, currentStatus) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/users/${id}/approval`, {
      method: "PUT", // <-- changed from POST to PUT
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ approved: !currentStatus }),
    });

    const data = await res.json();
    console.log("Approval toggled:", data);
    // update state without reload
    setAdmins((prev) =>
      prev.map((a) => (a.id === id ? { ...a, approved: data.user.approved } : a))
    );
  } catch (err) {
    console.error(err);
  }
};


  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              {/* <th className="px-4 py-2 text-left">ID</th> */}
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-t">
                {/* <td className="px-4 py-2">{admin.id}</td> */}
                <td className="px-4 py-2">{admin.name}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">
                  {admin.approved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleApproval(admin.id, admin.approved)}
                    className={`px-3 py-1 rounded-md text-white ${
                      admin.approved ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {admin.approved ? "Unapprove" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
