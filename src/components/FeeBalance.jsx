import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeeBalance = () => {
  const totalFees = 50000;
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  useEffect(() => {
    // Fetch fee balance from localStorage
    const savedBalance = localStorage.getItem("feeBalance");
    if (savedBalance) {
      const balance = parseFloat(savedBalance);
      setOutstandingAmount(balance);
      setPaidAmount(totalFees - balance);
    } else {
      // If no data in localStorage, set default fee balance
      localStorage.setItem("feeBalance", totalFees);
      setOutstandingAmount(totalFees);
      setPaidAmount(0);
    }

    // Listen for storage changes (for real-time update)
    const handleStorageChange = () => {
      const updatedBalance = parseFloat(localStorage.getItem("feeBalance")) || totalFees;
      setOutstandingAmount(updatedBalance);
      setPaidAmount(totalFees - updatedBalance);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center">💰 Fee Balance</h2>
      <p className="text-gray-600 text-sm text-center mb-4">Student: Masinde Sylvester</p>

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

      {/* Payment Link */}
      <div className="mt-4 text-center">
        <Link 
          to="/payment" 
          className="inline-block bg-[#ff7d00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e66d00] transition"
        >
          💳 Make a Payment
        </Link>
      </div>
    </div>
  );
};

export default FeeBalance;
