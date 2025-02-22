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
      localStorage.setItem("token", response.data.token); // Store token

      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex flex-col flex-grow items-center px-7 py-7">
        <h1 className="font-montserrat text-4xl font-bold text-center">
          Welcome to Moringa School
        </h1>
        <p className="font-nunito text-gray-700 text-lg text-center mb-6 px-6">
          Your student portal for success.
        </p>

        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-3xl w-full">
          {/* Left Form Section */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-center mb-3">
              {isSignUp ? "Create Account" : "Sign In"}
            </h3>

            {error && <p className="text-red-500 text-center">{error}</p>}

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
          <div className="md:w-1/2 hidden md:flex justify-center bg-[#D3C7A2] p-4">
            <img
              src="src/assets/images/student.png"
              alt="Graduate"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
