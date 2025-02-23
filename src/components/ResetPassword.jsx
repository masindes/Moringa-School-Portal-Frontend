import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/auth/reset-password", { email });
      setMessage("If the email exists, a reset link has been sent.");
    } catch (error) {
      setError("Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-black mb-4">
          Reset Password
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {message && <div className="text-green-500 text-center">{message}</div>}
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-[#df872e] text-white px-6 py-2 rounded hover:bg-black ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
