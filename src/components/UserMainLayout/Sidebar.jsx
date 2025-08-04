import React from 'react';
import { BookOpen, FileText, User, Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/authHelpers';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    toast.success("Logout successfully");
    navigate('/Login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: <Menu size={20} />, path: '/dashboard' },
    { label: 'Courses', icon: <BookOpen size={20} />, path: '/courses' },
    { label: 'Materials', icon: <FileText size={20} />, path: '/materials' },
    { label: 'Post', icon: <User size={20} />, path: '/addPost' },
  ];

  return (
    <aside className="w-64 fixed top-0 left-0 h-full bg-gradient-to-b from-slate-100 via-white to-slate-200 text-gray-800 shadow-2xl hidden md:flex flex-col justify-between z-50 rounded-tr-3xl rounded-br-3xl overflow-hidden transition-all duration-300">
      
      {/* Brand */}
      <div>
        <div className="p-6 flex items-center gap-2 text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-200 to-blue-400 shadow-sm text-blue-800">
          <span className="text-blue-700">📘</span>
          <span>QueryVerse</span>
        </div>

        {/* Nav Items */}
        <nav className="px-4 py-6 space-y-3 text-[15px] font-medium">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:text-blue-800 transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => navigate(item.path)}
            >
              <span className="text-blue-600 group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-6 py-5 border-t border-blue-100 bg-white/90 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-all text-sm font-semibold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
