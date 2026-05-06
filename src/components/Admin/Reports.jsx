import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, UserX, CreditCard, BookOpen, Bell, ArrowLeft, RefreshCw } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className={`bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg border border-gray-700 hover:scale-105 transition-transform`}>
    <Icon className={`w-10 h-10 mb-3 ${color}`} />
    <p className="text-3xl font-bold text-white">{value ?? "—"}</p>
    <p className="text-gray-400 text-sm mt-1 text-center">{label}</p>
  </div>
);

const Reports = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchStats = () => {
    setLoading(true);
    fetch(`${API_URL}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => { toast.error("Failed to load stats."); setLoading(false); });
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Reports &amp; Stats
        </h1>
        <button onClick={fetchStats} className="ml-auto flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 mt-20 text-lg">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatCard icon={Users} label="Total Students" value={stats?.total_students} color="text-blue-400" />
          <StatCard icon={UserCheck} label="Active Students" value={stats?.active_students} color="text-green-400" />
          <StatCard icon={UserX} label="Inactive Students" value={stats?.inactive_students} color="text-red-400" />
          <StatCard icon={CreditCard} label="Total Payments (Ksh)" value={stats ? `${Number(stats.total_payments).toLocaleString()}` : null} color="text-yellow-400" />
          <StatCard icon={BookOpen} label="Total Courses" value={stats?.total_courses} color="text-purple-400" />
          <StatCard icon={Bell} label="Unread Notifications" value={stats?.unread_notifications} color="text-orange-400" />
        </div>
      )}

      {stats && (
        <div className="max-w-4xl mx-auto mt-10 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Student Status Breakdown</h2>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-4 rounded-full bg-green-500 transition-all" style={{ width: `${stats.total_students ? (stats.active_students / stats.total_students) * 100 : 0}%`, minWidth: "4px" }} />
            <span className="text-sm text-gray-300">Active — {stats.active_students}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 rounded-full bg-red-500 transition-all" style={{ width: `${stats.total_students ? (stats.inactive_students / stats.total_students) * 100 : 0}%`, minWidth: "4px" }} />
            <span className="text-sm text-gray-300">Inactive — {stats.inactive_students}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
