import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("User");
  const [tenant, setTenant] = useState("");
  const [tenants, setTenants] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/auth";
  const TENANT_API = "http://localhost:5000/api/tenants";

  useEffect(() => {
    fetchTenants();
  }, []);
  const fetchTenants = async () => {
    try {
      const res = await fetch(TENANT_API, {
        headers: {
          "Content-Type": "application/json",
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

const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    setMessage("✅ Login successful!");
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.user.role);  
    localStorage.setItem("user", JSON.stringify(data.user));
console.log("Access Token:", data.user.role);
    switch (data.user.role) {
      case "SuperAdmin":
        navigate("/superadmindashboard");
        break;
      case "Admin":
        navigate("/admindashboard");
        break;
      case "Manager":
        navigate("/managerdashboard");
        break;
      default:
        navigate("/user");
        break;
    }
  } catch (err) {
    setMessage("❌ " + err.message);
  }
};
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, TenantId: tenant }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMessage("✅ Registration successful. Awaiting approval!");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className=" backdrop-blur rounded-2xl shadow-2xl p-6">
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`w-1/2 py-2 rounded-l-lg ${
                activeTab === "login"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`w-1/2 py-2 rounded-r-lg ${
                activeTab === "register"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Register
            </button>
          </div>
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Welcome Back
              </h2>
              <input name="email" type="email" placeholder="Email" required
                className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800"/>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800"
                />
                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-sm text-gray-500">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <select value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800">
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
              <button type="submit"
                className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Login
              </button>
            </form>
          )}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Create Account
              </h2>
              <input name="name" type="text" placeholder="Full Name" required
                 className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800"/>
              <input name="email" type="email" placeholder="Email" required
               className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800"/>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800"
                />
                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-sm text-gray-500">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <select value={role} onChange={(e) => setRole(e.target.value)}
                 className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800">
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
              <select value={tenant} onChange={(e) => setTenant(e.target.value)}
                className="w-full p-2 mb-4 border rounded 
             text-black dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500 
             bg-white dark:bg-gray-800"
                required>
                <option value="">-- Select Tenant --</option>
                {tenants.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <button type="submit"
                className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
                Register
              </button>
            </form>
          )}

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-gray-700">
              {message}
            </p>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AI SaaS Platform
          </div>
        </div>
      </motion.div>
    </div>
    </div>
  );
}
