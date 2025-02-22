import { useState, useEffect } from "react";
import axios from "axios";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ student_id: "", amount: "" });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const response = await axios.get("http://localhost:5000/api/payments");
    setPayments(response.data);
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/payments", newPayment);
    setNewPayment({ student_id: "", amount: "" });
    fetchPayments();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/payments/${id}`);
    fetchPayments();
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Payments</h2>
      <form onSubmit={handleAddPayment} className="mb-4">
        <input
          type="text"
          placeholder="Student ID"
          className="border p-2 mr-2"
          value={newPayment.student_id}
          onChange={(e) => setNewPayment({ ...newPayment, student_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 mr-2"
          value={newPayment.amount}
          onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Add</button>
      </form>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id} className="border-b flex justify-between py-2">
            Student {payment.student_id}: Ksh {payment.amount}
            <button onClick={() => handleDelete(payment.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePayments;
