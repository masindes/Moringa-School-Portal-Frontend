import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const FeeBalance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }

    fetch(`${API_URL}/student/fee_balance`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load fee balance."); setLoading(false); });
  }, []);

  const paidPct = data ? Math.min(100, Math.round((data.paidAmount / data.totalFees) * 100)) : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center">💰 Fee Balance</h2>
      {loading ? (
        <p className="text-center text-gray-500 text-sm mt-4">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-sm mt-4">{error}</p>
      ) : data ? (
        <>
          <p className="text-gray-600 text-sm text-center mb-4">Student: {data.studentName}</p>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner space-y-2">
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Total Fees:</span>
              <span className="font-semibold">Ksh {data.totalFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Paid Amount:</span>
              <span className="text-green-600 font-semibold">Ksh {data.paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-600 font-bold text-sm">
              <span>Outstanding Balance:</span>
              <span>Ksh {data.outstandingAmount.toLocaleString()}</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Payment Progress</span><span>{paidPct}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${paidPct}%` }} />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link to="/payment" className="inline-block bg-[#ff7d00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e66d00] transition">
              💳 Make a Payment
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FeeBalance;
