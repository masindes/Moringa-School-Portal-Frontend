import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageStudent = () => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    email: '', 
    grade: '', 
    currentPhase: '', 
    courseName: '' 
  });

  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.grade || !newStudent.currentPhase || !newStudent.courseName) {
      toast.error("All fields are required!");
      return;
    }
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents([...students, { ...newStudent, id: newId }]);
    setNewStudent({ name: '', email: '', grade: '', currentPhase: '', courseName: '' });
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
    if (!editingStudent.name || !editingStudent.email || !editingStudent.grade || !editingStudent.currentPhase || !editingStudent.courseName) {
      toast.error("All fields are required!");
      return;
    }
    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ));
    setEditingStudent(null);
    toast.success("Student updated successfully!");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      <NavLink
        to="/Admin"
        className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
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
          <select
            value={newStudent.courseName}
            onChange={(e) => setNewStudent({ ...newStudent, courseName: e.target.value })}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          >
            <option value="">Select Course</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Data Science">Data Science</option>
            <option value="Product Design">Product Design</option>
            <option value="DevOps">DevOps</option>
          </select>
          <button
            onClick={handleAddStudent}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Edit Student Form */}
      {editingStudent && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={editingStudent.name}
              onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
            <input
              type="email"
              value={editingStudent.email}
              onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              value={editingStudent.grade}
              onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              value={editingStudent.currentPhase}
              onChange={(e) => setEditingStudent({ ...editingStudent, currentPhase: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
            <select
              value={editingStudent.courseName}
              onChange={(e) => setEditingStudent({ ...editingStudent, courseName: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            >
              <option value="">Select Course</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Science">Data Science</option>
              <option value="Product Design">Product Design</option>
              <option value="DevOps">DevOps</option>
            </select>
            <button
              onClick={handleUpdateStudent}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Student
            </button>
          </div>
        </div>
      )}

      {/* Student List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <div key={student.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
            <p className="text-gray-300 mb-2"><strong>Course:</strong> {student.courseName}</p>
            <div className="flex space-x-4">
              <button onClick={() => handleEditStudent(student)} className="text-yellow-400 hover:text-yellow-300">Edit</button>
              <button onClick={() => handleDeleteStudent(student.id)} className="text-red-400 hover:text-red-300">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStudent;
