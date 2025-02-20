import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignUp = type === "signup";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { email, password });
  };

  return (
    <div className="flex min-h-screen bg-[#4E2A25] items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-3xl w-full">
        
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 pt-4 px-8 pb-8 flex flex-col justify-center">
          <div className="text-center mb-4">
            <img 
              src="src/assets/images/moringa-01.png" 
              alt="Moringa Logo" 
              className="mx-auto w-24"
            />
            <p className="text-gray-600">Welcome to our student portal</p>
          </div>

          <h3 className="text-2xl font-semibold text-center mb-3">
            {isSignUp ? "Create Account" : "Sign In"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>

            <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
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
        <div className="md:w-1/2 hidden md:flex justify-center bg-[#D3C7A2] p-0">
          <img
            src="src/assets/images/student.png"
            alt="Graduate"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
