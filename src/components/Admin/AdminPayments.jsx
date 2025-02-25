import React, { useState, useEffect } from "react";

const AdminPayment = () => {
  const totalFees = 50000; // Static total fees
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [payment, setPayment] = useState(""); // Admin input field
  const [receipts, setReceipts] = useState([]); // Store payment history
  const [editingReceipt, setEditingReceipt] = useState(null); // Track edited receipt

  useEffect(() => {
    // Load saved balance from localStorage
    const savedBalance = localStorage.getItem("feeBalance");
    const savedReceipts = localStorage.getItem("paymentReceipts");

    if (savedBalance) {
      const balance = parseFloat(savedBalance);
      setOutstandingAmount(balance);
      setPaidAmount(totalFees - balance);
    } else {
      setOutstandingAmount(totalFees);
      setPaidAmount(0);
    }

    // Load payment receipts
    if (savedReceipts) {
      setReceipts(JSON.parse(savedReceipts));
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

    // Create new receipt entry
    const newReceipt = {
      id: Date.now(), // Unique ID for the receipt
      amount: paymentAmount,
      date: new Date().toLocaleString(),
    };

    // Update receipts & save to localStorage
    const updatedReceipts = [newReceipt, ...receipts];
    setReceipts(updatedReceipts);
    localStorage.setItem("paymentReceipts", JSON.stringify(updatedReceipts));

    // Update state
    setOutstandingAmount(newOutstandingAmount);
    setPaidAmount(newPaidAmount);

    // Save new balance to localStorage
    localStorage.setItem("feeBalance", newOutstandingAmount.toString());

    // Reset input field
    setPayment("");

    alert(`Payment of Ksh ${paymentAmount.toLocaleString()} recorded successfully!`);
  };

  // Handle Payment Deletion
  const handleDelete = (id, amount) => {
    const updatedReceipts = receipts.filter((receipt) => receipt.id !== id);
    setReceipts(updatedReceipts);
    localStorage.setItem("paymentReceipts", JSON.stringify(updatedReceipts));

    const newOutstandingAmount = outstandingAmount + amount;
    const newPaidAmount = totalFees - newOutstandingAmount;

    setOutstandingAmount(newOutstandingAmount);
    setPaidAmount(newPaidAmount);
    localStorage.setItem("feeBalance", newOutstandingAmount.toString());

    alert(`Payment of Ksh ${amount.toLocaleString()} has been deleted.`);
  };

  // Handle Payment Editing
  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setPayment(receipt.amount);
  };

  // Handle Editing Submission
  const handleUpdatePayment = (e) => {
    e.preventDefault();
    if (!editingReceipt) return;

    const updatedAmount = parseFloat(payment);
    if (isNaN(updatedAmount) || updatedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const difference = updatedAmount - editingReceipt.amount;
    if (difference > outstandingAmount) {
      alert("Updated amount exceeds outstanding balance.");
      return;
    }

    const updatedReceipts = receipts.map((receipt) =>
      receipt.id === editingReceipt.id ? { ...receipt, amount: updatedAmount } : receipt
    );

    setReceipts(updatedReceipts);
    localStorage.setItem("paymentReceipts", JSON.stringify(updatedReceipts));

    const newOutstandingAmount = outstandingAmount - difference;
    const newPaidAmount = totalFees - newOutstandingAmount;

    setOutstandingAmount(newOutstandingAmount);
    setPaidAmount(newPaidAmount);
    localStorage.setItem("feeBalance", newOutstandingAmount.toString());

    setEditingReceipt(null);
    setPayment("");

    alert(`Payment updated successfully to Ksh ${updatedAmount.toLocaleString()}.`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center">🧾 Admin Fee Management</h2>
      <p className="text-gray-600 text-sm text-center mb-4">Managing student fees for Masinde Sylvester</p>

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

      {/* Payment Form */}
      <form onSubmit={editingReceipt ? handleUpdatePayment : handlePayment} className="mt-4">
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
          {editingReceipt ? "✏️ Update Payment" : "✅ Record Payment"}
        </button>
      </form>

      {/* Payment Receipts */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-800">📜 Payment Receipts</h3>
        {receipts.length === 0 ? (
          <p className="text-gray-500 text-sm">No payments made yet.</p>
        ) : (
          <ul className="bg-gray-50 p-4 rounded-lg shadow-inner mt-2">
            {receipts.map((receipt) => (
              <li key={receipt.id} className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-300 py-2 last:border-none">
                <div>
                  <span>{receipt.date}</span>
                  <span className="font-semibold ml-2">Ksh {receipt.amount.toLocaleString()}</span>
                </div>
                <div>
                  <button onClick={() => handleEdit(receipt)} className="text-blue-600 mr-2">✏️</button>
                  <button onClick={() => handleDelete(receipt.id, receipt.amount)} className="text-red-600">❌</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPayment;
