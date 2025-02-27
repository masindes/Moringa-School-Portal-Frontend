import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const studentName = "Masinde Sylvester"; 
  const totalFees = 50000;
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const storedPayments = JSON.parse(localStorage.getItem("studentPayments")) || [];

    const newPayment = {
      id: Date.now(),
      studentName,
      amount: paymentAmount,
      timestamp: new Date().toLocaleString(),
    };

    const updatedPayments = [...storedPayments, newPayment];
    localStorage.setItem("studentPayments", JSON.stringify(updatedPayments));

    alert("Payment successful!");
    navigate("/fee-balance"); 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center">💳 Make a Payment</h2>
      <p className="text-gray-600 text-sm text-center mb-4">Student: {studentName}</p>

      <form onSubmit={handlePayment}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter payment amount"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
        >
          ✅ Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
