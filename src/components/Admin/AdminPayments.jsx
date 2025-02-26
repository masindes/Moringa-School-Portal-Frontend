import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaMoneyCheckAlt, FaEdit, FaTrash } from "react-icons/fa";

const StudentPaymentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold">{student.studentName}</h2>
      <p className="text-gray-500 mt-2">Total Fees: Ksh {student.totalFees.toLocaleString()}</p>
      <p className="text-green-500">Paid Amount: Ksh {student.paidAmount.toLocaleString()}</p>
      <p className="text-red-500">
        Outstanding Balance: Ksh {(student.totalFees - student.paidAmount).toLocaleString()}
      </p>
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

// ✅ Define PropTypes for validation
StudentPaymentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    studentName: PropTypes.string.isRequired,
    totalFees: PropTypes.number.isRequired,
    paidAmount: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const AdminPayments = () => {
  // ✅ Load payments from localStorage when the component mounts
  const [payments, setPayments] = useState(() => {
    const savedPayments = localStorage.getItem("payments");
    return savedPayments ? JSON.parse(savedPayments) : [];
  });

  const [newPayment, setNewPayment] = useState({
    studentName: "",
    totalFees: "",
    paidAmount: "",
  });

  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments)); // ✅ Save payments to localStorage when updated
  }, [payments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    const formattedPayment = {
      studentName: newPayment.studentName,
      totalFees: parseFloat(newPayment.totalFees) || 0,
      paidAmount: parseFloat(newPayment.paidAmount) || 0,
    };

    if (editingPayment) {
      setPayments(
        payments.map((payment) =>
          payment.id === editingPayment.id ? { ...editingPayment, ...formattedPayment } : payment
        )
      );
      setEditingPayment(null);
    } else {
      const newEntry = { id: Date.now(), ...formattedPayment };
      setPayments([...payments, newEntry]);
    }

    setNewPayment({ studentName: "", totalFees: "", paidAmount: "" });
  };

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
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="number"
          name="totalFees"
          placeholder="Total Fees"
          value={newPayment.totalFees}
          onChange={handleChange}
          className="border p-2 mr-2 rounded"
          required
          min="0"
          step="0.01"
        />
        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={newPayment.paidAmount}
          onChange={handleChange}
          className="border p-2 mr-2 rounded"
          required
          min="0"
          step="0.01"
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
