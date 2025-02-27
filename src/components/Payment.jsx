import React, { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/mpesa/pay", {
        phone: phoneNumber,
        amount: amount,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Payment request failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-all">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-lg text-sm"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-900 dark:text-white">
        💳 Make a Payment
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
        Enter details to pay your fee balance.
      </p>

      {/* Card */}
      <form
        onSubmit={handlePayment}
        className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        {/* Phone Number Input */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold text-xl">
            Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="07XXXXXXXX"
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold text-xl">
            Amount (Ksh)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#ff7d00] hover:bg-orange-600 text-white py-3 rounded-lg text-xl transition-all"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* Payment Message */}
        {message && (
          <p className="mt-4 text-center text-gray-800 dark:text-gray-300 text-lg">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Payment;
