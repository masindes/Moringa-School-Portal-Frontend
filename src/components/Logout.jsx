import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. You are already logged out.");
      navigate("/");
      return;
    }

    localStorage.removeItem("token");

    const logoutTimer = setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 1500); 

    return () => clearTimeout(logoutTimer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-lg font-semibold text-gray-700">Logging out...</h2>
    </div>
  );
};

export default Logout;