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
    // localStorage.removeItem("userData"); // Example: Remove additional user data

    // Add a delay for better UX
    const logoutTimer = setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 1500); // 1.5 seconds delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(logoutTimer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-lg font-semibold text-gray-700">Logging out...</h2>
    </div>
  );
};

export default Logout;