import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 border-b">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-800">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
        </button>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-gray-700"
          >
            <FaUserCircle size={24} />
            <span>Admin</span>
          </button>
          {open && (
            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              {['Profile', 'Logout'].map((opt) => (
                <li key={opt}>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
