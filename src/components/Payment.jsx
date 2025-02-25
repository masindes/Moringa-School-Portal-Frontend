import React, { useState, useEffect } from "react";

const Payment = () => {
  const totalFees = 50000;
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [payment, setPayment] = useState("");
  const [isFullyPaid, setIsFullyPaid] = useState(false);

  useEffect(() => {
    // Load balance from localStorage
    const savedBalance = localStorage.getItem("feeBalance");

    if (savedBalance) {
      const balance = parseFloat(savedBalance);
      setOutstandingAmount(balance);
      setPaidAmount(totalFees - balance);

      // Check if payment is completed
      if (balance === 0) {
        setIsFullyPaid(true);
      }
    } else {
      setOutstandingAmount(totalFees);
      setPaidAmount(0);
    }
  }, []);

  // Handle Payment Submission
  const handlePayment = (e) => {
    e.preventDefault();

    const paymentAmount = parseFloat(payment);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (paymentAmount > outstandingAmount) {
      alert("Payment exceeds outstanding balance!");
      return;
    }

    const newOutstandingAmount = outstandingAmount - paymentAmount;
    const newPaidAmount = totalFees - newOutstandingAmount;

    // Update state
    setOutstandingAmount(newOutstandingAmount);
    setPaidAmount(newPaidAmount);

    // Save new balance to localStorage
    localStorage.setItem("feeBalance", newOutstandingAmount.toString());

    // Check if full payment is completed
    if (newOutstandingAmount === 0) {
      setIsFullyPaid(true);
    }

    // Reset input field
    setPayment("");

    alert(`Payment of Ksh ${paymentAmount.toLocaleString()} recorded successfully!`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center">💳 Student Payment</h2>
      <p className="text-gray-600 text-sm text-center mb-4">Masinde Sylvester's Payment Status</p>

      {/* Fee Details */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <div className="flex justify-between text-gray-700 text-sm">
          <span>Total Fees:</span>
          <span className="font-semibold">Ksh {totalFees.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-gray-700 text-sm mt-2">
          <span>Paid Amount:</span>
          <span className="text-green-600 font-semibold">Ksh {paidAmount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-red-600 font-bold text-sm mt-2">
          <span>Outstanding Balance:</span>
          <span>Ksh {outstandingAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Show "Successfully Paid" if balance is 0 */}
      {isFullyPaid ? (
        <div className="mt-4 text-center text-green-600 font-bold text-lg">
          🎉 Successfully Paid!
        </div>
      ) : (
        <form onSubmit={handlePayment} className="mt-4">
          <label className="block text-gray-700 text-sm font-medium">Enter Payment Amount:</label>
          <input
            type="number"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-[#ff7d00] focus:border-[#ff7d00]"
            placeholder="Enter amount in Ksh"
          />

          <button
            type="submit"
            className="mt-3 w-full bg-[#ff7d00] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#e66d00] transition"
          >
            ✅ Make Payment
          </button>
        </form>
      )}
    </div>
  );
};

export default Payment;
