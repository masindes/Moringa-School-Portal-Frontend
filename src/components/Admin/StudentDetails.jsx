
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', grade: '', currentPhase: '' });

    useEffect(() => {
        
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const foundStudent = storedStudents.find(s => s.id === parseInt(id));
    
        if (foundStudent) {
            setStudent(foundStudent);
            setFormData({
                name: foundStudent.name,
                email: foundStudent.email,
                grade: foundStudent.grade,
                currentPhase: foundStudent.currentPhase ? foundStudent.currentPhase.join(', ') : ''
            });
        }
    }, [id]);
    

    const handleDelete = () => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = storedStudents.filter(s => s.id !== parseInt(id));
        
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        setStudent(null); 
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = storedStudents.map(s => 
            s.id === parseInt(id) ? { ...s, ...formData, currentPhase: formData.currentPhase.split(', ') } : s
        );
    
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        setStudent(updatedStudents.find(s => s.id === parseInt(id)));
        setEditMode(false);
    };
    

    if (!student) return <div className="p-6">Student not found</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
            {editMode ? (
                <div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 mb-2" /><br />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 mb-2" /><br />
                    <input type="text" name="grade" value={formData.grade} onChange={handleChange} className="border p-2 mb-2" /><br />
                    <input type="text" name="currentPhase" value={formData.currentPhase} onChange={handleChange} className="border p-2 mb-2" /><br />
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 mr-2">Update</button>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Grade:</strong> {student.grade}</p>
                    <h3 className="text-lg font-semibold mt-4">Current Phase:</h3>
                    <ul className="list-disc pl-5">
                        {student.currentPhase?.map((course, index) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 mt-4 mr-2">Edit</button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mt-4">Delete</button>
            <br />
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
             <Link to="/manage-student">Back to Manage Students</Link>
             </button>
        </div>
    );
};

export default StudentDetails;