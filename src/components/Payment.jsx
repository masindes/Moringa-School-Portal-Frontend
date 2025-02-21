import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">💳 Make a Payment</h1>
      <p className="text-gray-700">Enter details to pay your fee balance.</p>

      <form onSubmit={handlePayment} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mt-6">
        <label className="block text-gray-700 font-semibold">Phone Number</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="07XXXXXXXX"
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
          required
        />

        <label className="block text-gray-700 font-semibold">Amount (Ksh)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#ff7d00] text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {message && <p className="mt-4 text-center text-gray-800">{message}</p>}
      </form>
    </div>
  );
};

export default Payment;
