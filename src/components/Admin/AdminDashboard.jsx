
import { useState} from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img src="src/assets/images/logo1.png" alt="Moringa Logo" className="w-12 h-12" />
            <span className="text-black text-2xl font-bold">Admin Dashboard</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-black hover:text-blue-600 transition text-base">Home</Link>
            <Link to="/student-management" className="text-black hover:text-blue-600 transition text-base">Manage Students</Link>
            <Link to="/payment-records" className="text-black hover:text-blue-600 transition text-base">Payments</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-blue-600 py-4 text-center">
            <Link to="/" className="block text-white py-2 hover:bg-blue-500 text-base">Home</Link>
            <Link to="/student-management" className="block text-white py-2 hover:bg-blue-500 text-base">Manage Students</Link>
            <Link to="/payment-records" className="block text-white py-2 hover:bg-blue-500 text-base">Payments</Link>
          </div>
        )}
      </nav>

      {/* Dashboard Content */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-md flex items-center">
            <FontAwesomeIcon icon={faUsers} className="text-4xl mr-4" />
            <div>
              <h4 className="text-lg font-medium">Total Students</h4>
            
            </div>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center">
            <FontAwesomeIcon icon={faDollarSign} className="text-4xl mr-4" />
            <div>
              <h4 className="text-lg font-medium">Total Payments</h4>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
