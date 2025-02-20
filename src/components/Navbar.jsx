import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Moringa Portal</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
        <Link to="/logout" className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
