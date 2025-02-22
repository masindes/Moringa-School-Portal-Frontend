import React from "react";
import { Link } from "react-router-dom";

// Mock Data
const studentFeeData = {
  studentName: "Abdisalan Ali",
  totalFees: 50000,
  paidAmount: 35000,
  outstandingAmount: 15000,
};

const FeeBalance = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-center">💰 Fee Balance</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Check your fee balance details below.
      </p>

      {/* Card */}
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Student Name and Outstanding Balance */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{studentFeeData.studentName}</h2>
          <p className="text-xl text-red-600 font-semibold">
            Outstanding: Ksh {studentFeeData.outstandingAmount.toLocaleString()}
          </p>
        </div>

        {/* Fee Details */}
        <div className="space-y-6 text-xl">
          <div className="flex justify-between">
            <span className="text-gray-700">Total Fees:</span>
            <span className="font-semibold text-gray-900">
              Ksh {studentFeeData.totalFees.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Paid Amount:</span>
            <span className="text-green-600 font-semibold">
              Ksh {studentFeeData.paidAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Button */}
        <div className="mt-8">
          <Link
            to="/payment"
            className="w-full block text-center bg-[#ff7d00] text-white py-3 rounded-lg text-xl"
          >
            💳 Make a Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeeBalance;
