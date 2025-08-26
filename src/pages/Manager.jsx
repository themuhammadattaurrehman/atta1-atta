import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api"; 

export default function SuperAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
      const tenantId = user?.TenantId;

      if (!tenantId) throw new Error("TenantId not found in localStorage");

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/users/managers-users?tenantId=${tenantId}`, {
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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-t">
                <td className="px-4 py-2">{admin.name}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">{admin.role}</td>
                <td className="px-4 py-2">
                  {admin.approved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
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
    </div>
  );
}
