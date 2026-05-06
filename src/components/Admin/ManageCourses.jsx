import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, BookOpen } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const ManageCourses = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const fetchCourses = () => {
    fetch(`${API_URL}/courses`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setCourses(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => { toast.error("Failed to load courses."); setLoading(false); });
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleAdd = async () => {
    if (!form.name.trim()) { toast.error("Course name is required."); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { toast.success("Course added!"); setForm({ name: "", description: "" }); fetchCourses(); }
      else toast.error(data.message || "Failed to add course.");
    } catch { toast.error("Network error."); }
    finally { setSaving(false); }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${API_URL}/courses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      });
      if (res.ok) { toast.success("Course updated!"); setEditingId(null); fetchCourses(); }
      else toast.error("Failed to update.");
    } catch { toast.error("Network error."); }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Manage Courses
        </h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Add Course */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Plus size={18} /> Add New Course</h2>
          <div className="space-y-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Course name" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description (optional)" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <button onClick={handleAdd} disabled={saving}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-medium transition">
              {saving ? "Saving..." : "Add Course"}
            </button>
          </div>
        </div>

        {/* Course List */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><BookOpen size={18} /> All Courses ({courses.length})</h2>
          {loading ? (
            <p className="text-gray-400 text-center">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-gray-400 text-center">No courses yet.</p>
          ) : (
            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.id} className="bg-gray-700 rounded-lg p-4">
                  {editingId === c.id ? (
                    <div className="space-y-2">
                      <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none" />
                      <input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none" />
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdate(c.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm">Save</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded text-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-white">{c.name}</p>
                        <p className="text-sm text-gray-400">{c.description || "No description"}</p>
                      </div>
                      <button onClick={() => { setEditingId(c.id); setEditForm({ name: c.name, description: c.description || "" }); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">Edit</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
