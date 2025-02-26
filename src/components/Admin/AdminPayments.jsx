import React, { useState, useEffect } from "react";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load latest payments
    const storedPayments = JSON.parse(localStorage.getItem("studentPayments")) || [];
    setPayments(storedPayments);
  }, []);

  const handleDelete = (id) => {
    const updatedPayments = payments.filter((payment) => payment.id !== id);
    setPayments(updatedPayments);
    localStorage.setItem("studentPayments", JSON.stringify(updatedPayments));
    alert("Payment record deleted successfully.");
  };

  // Filter payments by student name
  const filteredPayments = payments.filter((payment) =>
    payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center">📋 Admin Payments</h2>
      <p className="text-gray-600 text-sm text-center mb-4">Manage student payment records</p>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search by student name..."
      />

      {filteredPayments.length > 0 ? (
        <ul className="divide-y divide-gray-300">
          {filteredPayments.map((payment) => (
            <li key={payment.id} className="flex justify-between items-center py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">{payment.studentName}</p>
                <p className="text-xs text-gray-600">Paid: Ksh {payment.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{payment.timestamp}</p>
              </div>
              <button
                onClick={() => handleDelete(payment.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
              >
                ❌ Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-sm">No payments recorded.</p>
      )}
    </div>
  );
};

export default AdminPayments;
