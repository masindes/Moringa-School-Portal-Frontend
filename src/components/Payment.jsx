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

    // Input validation
    if (!phoneNumber.startsWith("07") || phoneNumber.length !== 10) {
      setMessage("Please enter a valid phone number starting with 07 and 10 digits long.");
      setLoading(false);
      return;
    }

    if (amount <= 0) {
      setMessage("Please enter a valid amount greater than 0.");
      setLoading(false);
      return;
    }

    // Transform phone number to the required format (e.g., 2547XXXXXXXX)
    const formattedPhoneNumber = `254${phoneNumber.substring(1)}`;

    try {
      const payload = {
        phone: formattedPhoneNumber, // Use the formatted phone number
        amount: parseFloat(amount), // Ensure amount is a number
      };

      console.log("Sending payload:", payload); // Log the payload for debugging

      const response = await axios.post(
        "https://moringa-school-portal-backend.onrender.com/mpesa/payment",
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the correct content type
          },
        }
      );

      setMessage(response.data.message || "Payment request successful!");
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message); // Log the error for debugging
      setMessage(
        error.response?.data?.error ||
          "Payment request failed. Please check your inputs and try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-all relative">
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
            aria-label="Phone Number"
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
            aria-label="Amount"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#ff7d00] hover:bg-orange-600 text-white py-3 rounded-lg text-xl transition-all"
          disabled={loading}
          aria-label="Pay Now"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* Payment Message */}
        {message && (
          <p className="mt-4 text-center text-gray-800 dark:text-gray-300 text-lg" aria-live="polite">
            {message}
          </p>
        )}
      </form>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-full shadow-md text-sm transition-all"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default Payment;