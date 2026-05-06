import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Bell, Users, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminNotifications = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("all");
  const [students, setStudents] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/students`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setStudents(Array.isArray(d) ? d : []))
      .catch(() => {});

    fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {})
      .catch(() => {});
  }, []);

  const handleSend = async () => {
    if (!message.trim()) { toast.error("Message cannot be empty."); return; }
    if (target === "single" && !selectedUserId) { toast.error("Select a student."); return; }
    setSending(true);
    const body = { message };
    if (target === "single") body.user_ids = [parseInt(selectedUserId)];

    try {
      const res = await fetch(`${API_URL}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setHistory((prev) => [{ message, target: target === "all" ? "All Students" : students.find(s => String(s.user_id) === String(selectedUserId))?.first_name || "Student", time: new Date().toLocaleTimeString() }, ...prev]);
        setMessage("");
      } else {
        toast.error(data.message || "Failed to send.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
          Send Notifications
        </h1>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Compose */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Bell size={18} /> Compose Notification</h2>

          <div className="flex gap-3 mb-4">
            <button onClick={() => setTarget("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${target === "all" ? "bg-orange-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
              <Users size={15} /> All Students
            </button>
            <button onClick={() => setTarget("single")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${target === "single" ? "bg-orange-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
              <User size={15} /> Single Student
            </button>
          </div>

          {target === "single" && (
            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full mb-4 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="">— Select Student —</option>
              {students.map((s) => (
                <option key={s.id} value={s.user_id}>{s.first_name} {s.last_name} ({s.email})</option>
              ))}
            </select>
          )}

          <textarea value={message} onChange={(e) => setMessage(e.target.value)}
            rows={4} placeholder="Write your notification message..."
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500" />

          <button onClick={handleSend} disabled={sending}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-medium transition">
            <Send size={18} /> {sending ? "Sending..." : "Send Notification"}
          </button>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Sent This Session</h2>
            <div className="space-y-3">
              {history.map((h, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>To: {h.target}</span><span>{h.time}</span>
                  </div>
                  <p className="text-sm text-gray-200">{h.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
