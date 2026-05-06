import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, ArrowLeft, CheckCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchNotifications = () => {
    fetch(`${API_URL}/my/notifications`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setNotifications(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => { toast.error("Failed to load notifications."); setLoading(false); });
  };

  useEffect(() => { fetchNotifications(); }, []);

  const markRead = async (id) => {
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, status: "read" } : n));
  };

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition">
            <ArrowLeft size={20} /> Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell size={24} /> Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </h1>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : notifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow">
            <Bell size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex justify-between items-start gap-4 border-l-4 ${n.status === "unread" ? "border-blue-500" : "border-gray-300 dark:border-gray-600"}`}>
                <div className="flex-1">
                  <p className={`text-sm ${n.status === "unread" ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {n.created_at ? new Date(n.created_at).toLocaleString() : ""}
                    {n.status === "read" && <span className="ml-2 text-green-500">✓ Read</span>}
                  </p>
                </div>
                {n.status === "unread" && (
                  <button onClick={() => markRead(n.id)} title="Mark as read"
                    className="text-blue-500 hover:text-blue-700 flex-shrink-0 transition">
                    <CheckCircle size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentNotifications;
