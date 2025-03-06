import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      // Basic validation
      if (!email || !password) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
      }

      try {
        const endpoint = "https://moringa-school-portal-backend.onrender.com/login";

        const payload = { email, password };

        const response = await axios.post(endpoint, payload);
        const { access_token, role } = response.data;

        if (access_token) {
          // Store the token and role in localStorage
          localStorage.setItem("token", access_token);
          localStorage.setItem("role", role);

          // Set successful login state
          setError(null); // Clear any previous errors
          setLoading(false);

          // Redirect based on role
          switch (role) {
            case "admin":
              navigate("/admin");
              break;
            case "student":
              navigate("/home-page");
              break;
            default:
              navigate("/login");
          }
        } else {
          setError(response.data.message || "Login failed. Please try again.");
        }
      } catch (err) {
        if (err.response && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [email, password, navigate]
  );

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url('src/assets/images/about.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Netflix Logo */}
      <div className="absolute top-0 left-0 p-6">
        <img
          src="src/assets/images/moringa-01.png"
          alt="moringa logo"
          className="w-32"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center px-7 py-7 bg-black bg-opacity-70">
        <div className="w-full max-w-md">
          <div className="bg-black bg-opacity-80 rounded-lg shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6 relative">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>

              <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="mr-1" />
                  Remember Me
                </label>
                <Link to="/reset-password" className="hover:underline">
                  Need help?
                </Link>
              </div>
            </form>

            <div className="mt-6 text-gray-400">
              <p>
                New to Moringa School?{" "}
                <Link to="/signup" className="text-white hover:underline">
                  Sign up now.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthForm);