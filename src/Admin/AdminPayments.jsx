import React, { useState } from "react";
import { FaDollarSign, FaMoneyCheckAlt, FaEdit, FaTrash } from "react-icons/fa";

const StudentPaymentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold">{student.studentName}</h2>
      <p className="text-gray-500 mt-2">Total Fees: ${student.totalFees}</p>
      <p className="text-green-500">Paid Amount: ${student.paidAmount}</p>
      <p className="text-red-500">Outstanding Balance: ${student.totalFees - student.paidAmount}</p>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center"
          onClick={() => onEdit(student)}
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
          onClick={() => onDelete(student.id)}
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    studentName: "",
    totalFees: "",
    paidAmount: "",
  });
  const [editingPayment, setEditingPayment] = useState(null); // Track the payment being edited

  const handleChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (editingPayment) {
      setPayments(
        payments.map((payment) =>
          payment.id === editingPayment.id ? { ...editingPayment, ...newPayment } : payment
        )
      );
      setEditingPayment(null); 
    } else {
      const newEntry = { id: Date.now(), ...newPayment };
      setPayments([...payments, newEntry]);
    }

    setNewPayment({ studentName: "", totalFees: "", paidAmount: "" });
  };

  const handleDelete = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setNewPayment({
      studentName: payment.studentName,
      totalFees: payment.totalFees,
      paidAmount: payment.paidAmount,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaMoneyCheckAlt className="text-green-500 mr-2" /> Payment Management
      </h2>

      <form onSubmit={handleAddPayment} className="mb-4 p-4 border rounded bg-gray-100">
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={newPayment.studentName}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="totalFees"
          placeholder="Total Fees"
          value={newPayment.totalFees}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={newPayment.paidAmount}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingPayment ? "Update Payment" : "Add Payment"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <StudentPaymentCard
            key={payment.id}
            student={payment}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPayments;