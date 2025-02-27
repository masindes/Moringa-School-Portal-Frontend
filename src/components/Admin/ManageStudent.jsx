import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageStudent = () => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '', currentPhase: '', course: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const courses = ["Software Engineering", "Cyber Security", "Data Science", "Product Design", "DevOps"];

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.grade || !newStudent.currentPhase || !newStudent.course) {
      toast.error("All fields are required!");
      return;
    }
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents([...students, { ...newStudent, id: newId }]);
    setNewStudent({ name: '', email: '', grade: '', currentPhase: '', course: '' });
    toast.success("Student added successfully!");
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
    toast.info("Student deleted.");
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleUpdateStudent = () => {
    if (!editingStudent.name || !editingStudent.email || !editingStudent.grade || !editingStudent.currentPhase || !editingStudent.course) {
      toast.error("All fields are required!");
      return;
    }
    setStudents(students.map(student => 
      student.id === editingStudent.id ? { ...editingStudent } : student
    ));
    setIsModalOpen(false);
    toast.success("Student updated successfully!");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Centered Back Button */}
      <div className="flex justify-center mb-6">
        <NavLink to="/Admin" className="flex items-center text-blue-400 hover:text-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Admin Dashboard
        </NavLink>
      </div>

      {/* Centered Manage Students Heading */}
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Students</h2>

      {/* Centered Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Add Student
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`px-4 py-2 rounded ${activeTab === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          View Students
        </button>
      </div>

      {/* Add Student Form */}
      {activeTab === 'add' && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Add New Student</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
            <input type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
            <input type="text" placeholder="Grade" value={newStudent.grade} onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
            <input type="text" placeholder="Current Phase" value={newStudent.currentPhase} onChange={(e) => setNewStudent({ ...newStudent, currentPhase: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
            <select value={newStudent.course} onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white">
              <option value="">Select Course</option>
              {courses.map(course => <option key={course} value={course}>{course}</option>)}
            </select>
            <button onClick={handleAddStudent} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Student</button>
          </div>
        </div>
      )}

      {/* Student List */}
      {activeTab === 'view' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <div key={student.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
              <p className="text-gray-300"><strong>Email:</strong> {student.email}</p>
              <p className="text-gray-300"><strong>Grade:</strong> {student.grade}</p>
              <p className="text-gray-300"><strong>Phase:</strong> {student.currentPhase}</p>
              <p className="text-gray-300 mb-4"><strong>Course:</strong> {student.course}</p>
              <div className="flex space-x-2">
                <button onClick={() => handleEditStudent(student)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Name" value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"/>
              <input type="email" placeholder="Email" value={editingStudent.email} onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"/>
              <input type="text" placeholder="Grade" value={editingStudent.grade} onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"/>
              <input type="text" placeholder="Current Phase" value={editingStudent.currentPhase} onChange={(e) => setEditingStudent({ ...editingStudent, currentPhase: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"/>
              <select value={editingStudent.course} onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white">
                <option value="">Select Course</option>
                {courses.map(course => <option key={course} value={course}>{course}</option>)}
              </select>
              <button onClick={handleUpdateStudent} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update Student</button>
              <button onClick={() => setIsModalOpen(false)} className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudent;