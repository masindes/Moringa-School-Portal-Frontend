import { useState } from 'react';
import { Link } from 'react-router-dom';

const ManageStudent = () => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [
      
    ];
  });
  
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '' });
  const [editingStudent, setEditingStudent] = useState(null);


  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.grade) return;
    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
    setNewStudent({ name: '', email: '', grade: '' });
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleUpdateStudent = () => {
    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ));
    setEditingStudent(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>
      <div className="mb-4">
        <input type="text" placeholder="Name" value={newStudent.name} 
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="border p-2 mr-2" />
        <input type="text" placeholder="Email" value={newStudent.email} 
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} className="border p-2 mr-2" />
        <input type="text" placeholder="Grade" value={newStudent.grade} 
          onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })} className="border p-2 mr-2" />
        <button onClick={handleAddStudent} className="bg-blue-500 text-white px-4 py-2">Add</button>
      </div>

      {editingStudent && (
        <div className="mb-4">
          <input type="text" value={editingStudent.name} 
            onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} className="border p-2 mr-2" />
          <input type="text" value={editingStudent.email} 
            onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })} className="border p-2 mr-2" />
          <input type="text" value={editingStudent.grade} 
            onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })} className="border p-2 mr-2" />
          <button onClick={handleUpdateStudent} className="bg-green-500 text-white px-4 py-2">Update</button>
        </div>
      )}
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Grade</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="text-center">
              <td className="border border-gray-300 p-2">{student.id}</td>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.email}</td>
              <td className="border border-gray-300 p-2">{student.grade}</td>
              <td className="border border-gray-300 p-2">
                <Link to={`/student-details/${student.id}`} className="text-blue-500 hover:underline mr-2">View</Link>
                <button onClick={() => handleEditStudent(student)} className="text-yellow-500 mr-2">Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        <Link to="/Admin">Back to Admin Dashboard</Link>
      </button>
    </div>
  );
};

export default ManageStudent;
