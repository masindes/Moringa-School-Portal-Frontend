import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user_id");
  localStorage.removeItem("student_id");
};

const Logout = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Logging out...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      clearSession();
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .catch(() => {})
      .finally(() => {
        clearSession();
        setStatus("Logged out successfully. Redirecting...");
        setTimeout(() => navigate("/login"), 1200);
      });
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 gap-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-700 font-semibold text-lg">{status}</p>
      </div>
    </div>
  );
};

export default Logout;
