import { Link } from 'react-router-dom';

const ManageStudent = () => {
  const students = [
    { id: 1, name: 'John Doe', email: 'john@example.com', Grade: 'A' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', Grade: 'B' }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>
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
                <Link to={`/student-details/${student.id}`} className="text-blue-500 hover:underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudent;