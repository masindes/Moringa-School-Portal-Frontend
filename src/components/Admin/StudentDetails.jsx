import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
                currentPhase: foundStudent.currentPhase ? foundStudent.currentPhase.join(', ') : '',
            });
        }
    }, [id]);

    const handleDelete = () => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = storedStudents.filter(s => s.id !== parseInt(id));

        localStorage.setItem('students', JSON.stringify(updatedStudents));
        navigate('/manage-student');
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

    const toggleActivation = () => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = storedStudents.map(s =>
            s.id === parseInt(id) ? { ...s, isActive: !s.isActive } : s
        );

        localStorage.setItem('students', JSON.stringify(updatedStudents));
        setStudent(updatedStudents.find(s => s.id === parseInt(id)));
    };

    if (!student) return <div className="p-6">Student not found</div>;

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
            {editMode ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 mb-2 w-full bg-gray-800 text-white"
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 mb-2 w-full bg-gray-800 text-white"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="border p-2 mb-2 w-full bg-gray-800 text-white"
                        placeholder="Grade"
                    />
                    <input
                        type="text"
                        name="currentPhase"
                        value={formData.currentPhase}
                        onChange={handleChange}
                        className="border p-2 mb-2 w-full bg-gray-800 text-white"
                        placeholder="Current Phase (comma-separated)"
                    />
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-4 py-2 mr-2 rounded hover:bg-green-600"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => setEditMode(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Grade:</strong> {student.grade}</p>
                    <p>
                        <strong>Status:</strong> 
                        <span className={student.isActive ? 'text-green-400' : 'text-red-400'}>
                            {student.isActive ? ' Active' : ' Inactive'}
                        </span>
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Current Phase:</h3>
                    <ul className="list-disc pl-5">
                        {student.currentPhase?.map((course, index) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="mt-6 space-x-4">
                {!editMode && (
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={toggleActivation}
                    className={`px-4 py-2 rounded ${
                        student.isActive
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                >
                    {student.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete
                </button>
                <Link
                    to="/manage-student"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Manage Students
                </Link>
            </div>
        </div>
    );
};

export default StudentDetails;
