import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint =
      type === "signup"
        ? "http://localhost:5000/auth/signup"
        : "http://localhost:5000/auth/login";

    try {
      const response = await axios.post(endpoint, user);

      if (type === "login") {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setMessage("Signup successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 px-4 py-10 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-sky-700 mb-4">
          {type === "signup" ? "Sign Up" : "Login"}
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {message && <div className="text-green-500 text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : type === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>
        {type === "login" && (
          <p className="text-center mt-4">
            Forgot your password?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/reset-password")}
            >
              Reset here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
