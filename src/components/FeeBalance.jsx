import React from "react";
import { Link } from "react-router-dom";

// Mock Data
const studentFeeData = {
  studentName: "Joan wambui",
  totalFees: 174000,
  paidAmount: 50000,
  outstandingAmount: 124000,
};

const FeeBalance = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      {/* Student Name */}
      <h2 className="text-xl font-bold text-gray-800 text-center">💰 Fee Balance</h2>
      <p className="text-gray-600 text-sm text-center mb-4">Student: {studentFeeData.studentName}</p>

      {/* Fee Details */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <div className="flex justify-between text-gray-700 text-sm">
          <span>Total Fees:</span>
          <span className="font-semibold">Ksh {studentFeeData.totalFees.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-gray-700 text-sm mt-2">
          <span>Paid Amount:</span>
          <span className="text-green-600 font-semibold">Ksh {studentFeeData.paidAmount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-red-600 font-bold text-sm mt-2">
          <span>Outstanding Balance:</span>
          <span>Ksh {studentFeeData.outstandingAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Link */}
      <div className="mt-4 text-center">
        {/* <Link 
          to="/payment" 
          className="inline-block bg-[#ff7d00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e66d00] transition"
        >
          💳 Make a Payment
        </Link> */}
      </div>
    </div>
  );
};

export default FeeBalance;
