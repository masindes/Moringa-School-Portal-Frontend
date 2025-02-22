
import { useParams,Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

const students = [
 
];

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const foundStudent = students.find(s => s.id === parseInt(id));
    setStudent(foundStudent);
  }, [id]); 

  if (!student) return <div className="p-6">Student not found</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Grade:</strong> {student.status}</p>
      <h3 className="text-lg font-semibold mt-4">Current Phase:</h3>
      <ul className="list-disc pl-5">
        {student.courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
      <Link to="/manage-student" className="mt-4 inline-block text-blue-500 hover:underline">Back to Manage Students</Link>
    </div>
  );
};

export default StudentDetails;