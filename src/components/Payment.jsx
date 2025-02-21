import React, { useState } from "react";

const Payment = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment of Ksh ${amount} submitted!`);
    setAmount("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">💳 Make a Payment</h1>
      <p className="text-gray-700">Enter an amount to pay your fee balance.</p>

      <form onSubmit={handlePayment} className="mt-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="p-2 border border-gray-300 rounded-lg w-full"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 mt-3 rounded-lg">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
