import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaMoneyCheckAlt, FaEdit, FaTrash, FaMoon, FaSun } from "react-icons/fa";

const StudentPaymentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center transition-all border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{student.studentName}</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Total Fees: Ksh {student.totalFees.toLocaleString()}
      </p>
      <p className="text-green-600 dark:text-green-400">
        Paid Amount: Ksh {student.paidAmount.toLocaleString()}
      </p>
      <p className="text-red-600 dark:text-red-400">
        Outstanding Balance: Ksh {(student.totalFees - student.paidAmount).toLocaleString()}
      </p>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-yellow-400 text-gray-900 px-3 py-1 rounded flex items-center hover:bg-yellow-500"
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
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
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
    <div className="p-6 min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
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

      {/* Payment Form */}
      <form onSubmit={handleAddPayment} className="mb-4 p-4 border rounded bg-white dark:bg-gray-800 transition-all shadow-md">
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={newPayment.studentName}
          onChange={handleChange}
          className="border p-2 mr-2 rounded bg-white dark:bg-gray-700 dark:text-white text-gray-800"
          required
        />
        <input
          type="number"
          name="totalFees"
          placeholder="Total Fees"
          value={newPayment.totalFees}
          onChange={handleChange}
          className="border p-2 mr-2 rounded bg-white dark:bg-gray-700 dark:text-white text-gray-800"
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
          className="border p-2 mr-2 rounded bg-white dark:bg-gray-700 dark:text-white text-gray-800"
          required
          min="0"
          step="0.01"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editingPayment ? "Update Payment" : "Add Payment"}
        </button>
      </form>

      {/* Payment Cards */}
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
