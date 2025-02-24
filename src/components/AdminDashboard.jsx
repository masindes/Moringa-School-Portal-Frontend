import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sun, Moon } from "lucide-react";

const AuthForm = ({ type }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();
  const isSignUp = type === "signup";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || (isSignUp && (!firstName || !lastName))) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = isSignUp
        ? "http://localhost:5000/api/signup"
        : "http://localhost:5000/api/login";

      const payload = { email, password };
      if (isSignUp) {
        payload.firstName = firstName;
        payload.lastName = lastName;
      }

      const response = await axios.post(endpoint, payload);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("No token received. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Toggle Button */}
      <div className="absolute top-4 right-6">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
        >
          {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center px-7 py-7">
        <div className="w-full max-w-3xl">
          <h1 className="font-montserrat text-4xl font-bold text-center">
            Welcome to Moringa School
          </h1>
          <p className="font-nunito text-lg text-center mb-6 px-6">
            Your student portal for success.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[500px]">
            {/* Left Form Section */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center overflow-y-auto">
              <h3 className="text-2xl font-semibold text-center mb-3">
                {isSignUp ? "Create Account" : "Sign In"}
              </h3>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <>
                    <div className="mb-3">
                      <label className="block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="mb-3">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black dark:bg-[#df872e] text-white py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition"
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                </button>

                <div className="flex justify-between items-center mt-3 text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="mr-1" />
                    Remember Me
                  </label>
                  <Link to="/reset-password" className="hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>

            {/* Right Image Section */}
            <div className="md:w-1/2 hidden md:flex justify-center items-end bg-[#df872e] p-4 relative">
              <img
                src="src/assets/images/student.png"
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

export default AuthForm;
