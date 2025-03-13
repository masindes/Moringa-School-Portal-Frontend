import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
        backgroundImage: `url('/images/cod.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        animation: "moveBackground 20s linear infinite",
      }}
    >
      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center px-7 py-7 bg-black bg-opacity-40">
        <div className="w-full max-w-3xl">
          <h1 className="font-montserrat text-white text-4xl font-bold text-center">
            Welcome to Moringa School
          </h1>
          <p className="font-nunito text-white text-lg text-center mb-6 px-6">
            Your student portal for success.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[500px]">
            {/* Left Form Section */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center overflow-y-auto">
              <h3 className="text-2xl font-semibold text-center mb-3">Sign In</h3>

              {error && <p className="text-green-500 text-center">{error}</p>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-black text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 relative">
                  <label className="block text-black text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-2 border border-gray-300 rounded-lg pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-[#df872e] transition"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>

                <div className="flex justify-between items-center mt-3 text-sm text-black">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="mr-1" />
                    Remember Me
                  </label>
                </div>
              </form>
            </div>

            {/* Right Image Section */}
            <div className="md:w-1/2 hidden md:flex justify-center items-end bg-[#df872e] p-4 relative">
              <img
                src="/images/student.png"
                alt="Graduate"
                className="w-full max-h-[80%] object-contain absolute bottom-0 left-1/2 transform -translate-x-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthForm);