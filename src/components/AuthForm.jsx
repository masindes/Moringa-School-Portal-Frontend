import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = ({ type }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isSignUp = type === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !password || (isSignUp && (!firstName || !lastName))) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = isSignUp
        ? "https://moringa-school-portal-backend.onrender.com/register"
        : "https://moringa-school-portal-backend.onrender.com/login";

      const payload = { 
        email, 
        password,
        first_name: firstName, // Match backend's expected field name
        last_name: lastName,  // Match backend's expected field name
      };

      const response = await axios.post(endpoint, payload);
      console.log(response.data);
      console.log(response.data.access_token);
      
      // Handle response
      if (response.data.access_token) {
        console.log(payload);
        // Store token in localStorage
        localStorage.setItem("token", response.data.access_token);

        // Redirect to the Home Page
        navigate("/home-page");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Handle specific errors from the server
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url('src/assets/images/cod.jpg')`,
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
              <h3 className="text-2xl font-semibold text-center mb-3">
                {isSignUp ? "Create Account" : "Sign In"}
              </h3>

              {error && <p className="text-green-500 text-center">{error}</p>}

              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <>
                    <div className="mb-3">
                      <label className="block text-black text-sm font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-black text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

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

                <div className="mb-3">
                  <label className="block text-black text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-[#df872e] transition"
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                </button>

                <div className="flex justify-between items-center mt-3 text-sm text-black">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="mr-1" />
                    Remember Me
                  </label>
                  <Link to="/reset-password" className="hover:underline text-black">
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