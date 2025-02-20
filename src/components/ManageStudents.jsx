import { useState, useEffect } from "react";
import axios from "axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/students");
    setStudents(response.data);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/students", newStudent);
    setNewStudent({ name: "", email: "" });
    fetchStudents();
  };

  const handleUpdate = async (id) => {
    const updatedName = prompt("Enter new name:");
    if (updatedName) {
      await axios.put(`http://localhost:5000/api/students/${id}`, { name: updatedName });
      fetchStudents();
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Students</h2>
      <form onSubmit={handleAddStudent} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mr-2"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mr-2"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Add</button>
      </form>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="border-b flex justify-between py-2">
            {student.name} - {student.email}
            <div>
              <button onClick={() => handleUpdate(student.id)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudents;
