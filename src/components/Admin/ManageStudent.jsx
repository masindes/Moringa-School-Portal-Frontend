import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageStudent = () => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '', currentPhase: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.grade || !newStudent.currentPhase) {
      toast.error("All fields are required!");
      return;
    }
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents([...students, { ...newStudent, id: newId, isActive: true }]);
    setNewStudent({ name: '', email: '', grade: '', currentPhase: '' });
    toast.success("Student added successfully!");
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
    toast.info("Student deleted.");
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleUpdateStudent = () => {
    if (!editingStudent.name || !editingStudent.email || !editingStudent.grade || !editingStudent.currentPhase) {
      toast.error("All fields are required!");
      return;
    }
    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ));
    setEditingStudent(null);
    toast.success("Student updated successfully!");
  };

  // Toggle Student Active/Inactive Status
  const toggleStudentStatus = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, isActive: !student.isActive } : student
    ));
    toast.info("Student status updated.");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Back to Admin Dashboard NavLink */}
      <NavLink
        to="/Admin"
        className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Admin Dashboard
      </NavLink>

      <h2 className="text-2xl font-semibold mb-6">Manage Students</h2>

      {/* Add Student Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Grade"
            value={newStudent.grade}
            onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Current Phase"
            value={newStudent.currentPhase}
            onChange={(e) => setNewStudent({ ...newStudent, currentPhase: e.target.value })}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            onClick={handleAddStudent}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <div key={student.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
            <p className="text-gray-300 mb-2"><strong>Email:</strong> {student.email}</p>
            <p className="text-gray-300 mb-2"><strong>Grade:</strong> {student.grade}</p>
            <p className="text-gray-300 mb-4"><strong>Current Phase:</strong> {student.currentPhase}</p>
            <p className={`mb-4 font-semibold ${student.isActive ? 'text-green-400' : 'text-red-400'}`}>
              Status: {student.isActive ? 'Active' : 'Inactive'}
            </p>
            <div className="flex space-x-4">
              <Link to={`/student-details/${student.id}`} className="text-blue-400 hover:text-blue-300">
                View
              </Link>
              <button onClick={() => handleEditStudent(student)} className="text-yellow-400 hover:text-yellow-300">
                Edit
              </button>
              <button onClick={() => handleDeleteStudent(student.id)} className="text-red-400 hover:text-red-300">
                Delete
              </button>
              <button 
                onClick={() => toggleStudentStatus(student.id)}
                className={`px-3 py-1 rounded text-white ${student.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {student.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStudent;
