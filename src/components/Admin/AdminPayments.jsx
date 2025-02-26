import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaMoneyCheckAlt, FaEdit, FaTrash, FaMoon, FaSun } from "react-icons/fa";

const StudentPaymentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-300 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{student.studentName}</h2>
      <p className="text-gray-600 dark:text-gray-300">Total Fees: Ksh {student.totalFees.toLocaleString()}</p>
      <p className="text-green-600 dark:text-green-400">Paid Amount: Ksh {student.paidAmount.toLocaleString()}</p>
      <p className="text-red-600 dark:text-red-400">Outstanding Balance: Ksh {(student.totalFees - student.paidAmount).toLocaleString()}</p>
      <div className="mt-3 flex space-x-2">
        <button
          className="bg-green-600 text-gray-900 px-3 py-1 rounded flex items-center hover:bg-blue-500"
          onClick={() => onEdit(student)}
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600"
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
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  // ✅ Load payments from localStorage
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
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

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
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setNewPayment({
      studentName: payment.studentName,
      totalFees: payment.totalFees.toString(),
      paidAmount: payment.paidAmount.toString(),
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FaMoneyCheckAlt className="text-green-500 mr-2" /> Payment Management
        </h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded flex items-center"
        >
          {darkMode ? <FaSun className="mr-1" /> : <FaMoon className="mr-1" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Payment Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            {editingPayment ? "Edit Payment" : "Add Payment"}
          </h3>
          <form onSubmit={handleAddPayment} className="space-y-4">
            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={newPayment.studentName}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
              required
            />
            <input
              type="number"
              name="totalFees"
              placeholder="Total Fees"
              value={newPayment.totalFees}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
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
              className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
              required
              min="0"
              step="0.01"
            />
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600">
              {editingPayment ? "Update Payment" : "Add Payment"}
            </button>
          </form>
        </div>

        {/* Right: Payment List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Student Payments</h3>
          <div className="space-y-4">
            {payments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No payments recorded yet.</p>
            ) : (
              payments.map((payment) => (
                <StudentPaymentCard
                  key={payment.id}
                  student={payment}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
