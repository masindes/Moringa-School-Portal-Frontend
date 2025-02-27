import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeeBalance = () => {
  const totalFees = 50000;
  const studentName = "Masinde Sylvester"; 

  const [outstandingAmount, setOutstandingAmount] = useState(totalFees);
  const [paidAmount, setPaidAmount] = useState(0);

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("studentPayments")) || [];
    const studentPayments = storedPayments.filter((p) => p.studentName === studentName);

    const totalPaid = studentPayments.reduce((sum, p) => sum + p.amount, 0);
    setPaidAmount(totalPaid);
    setOutstandingAmount(Math.max(totalFees - totalPaid, 0));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center">💰 Fee Balance</h2>
      <p className="text-gray-600 text-sm text-center mb-4">Student: {studentName}</p>

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
