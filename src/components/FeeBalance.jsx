import React from "react";
import { Link } from "react-router-dom";

// Mock Data
const studentFeeData = {
  studentName: "John Doe",
  totalFees: 50000,
  paidAmount: 35000,
  outstandingAmount: 15000,
};

const FeeBalance = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-12 w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800">💰 Fee Balance</h2>
        <p className="text-gray-600 text-center text-2xl mb-8">{studentFeeData.studentName}</p>

        <div className="space-y-6 text-2xl">
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

          <div className="flex justify-between">
            <span className="text-gray-700">Outstanding:</span>
            <span className="text-red-600 font-semibold">
              Ksh {studentFeeData.outstandingAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Button */}
        <div className="mt-10">
          <Link
            to="/payment"
            className="w-full block text-center bg-blue-600 text-white py-4 rounded-xl text-2xl hover:bg-blue-700 transition"
          >
            💳 Make a Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeeBalance;
