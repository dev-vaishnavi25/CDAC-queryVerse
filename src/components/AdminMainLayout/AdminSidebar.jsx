import React from 'react';
import {
  FaHome,
  FaUserCheck,
  FaClipboardList,
  FaTags,
  FaMoneyCheckAlt,
  FaTimes,
  FaUsers,
  FaShieldAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/authHelpers';
import { toast } from 'react-toastify';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        removeToken();
        toast.success("logout successfully");
        navigate("/");
    }
  const navItems = [
    { icon: <MdDashboard />, label: "Dashboard", link: "/admin/adminDashboard", active: true },
    { icon: <FaUsers />, label: "Manage Users", link: "/admin/users", count: "1,247" },
    { icon: <FaUsers />, label: "Manage Mentors", link: "/admin/allMentorList", count: "1,247" },
    { icon: <FaClipboardList />, label: "Review Reports", link: "/admin/reports", count: "24" },
    { icon: <FaTags />, label: "Tags & Categories", link: "/admin/tags", count: "156" },
    { icon: <FaMoneyCheckAlt />, label: "Payments", link: "/admin/payments", count: "89" },
    { icon: <IoMdSettings />, label: "Settings", link: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 w-64 h-screen bg-white border-r border-gray-200 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Sidebar Inner with Flex */}
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FaShieldAlt className="text-white text-sm" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${item.active
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className={`${item.active ? 'text-blue-700' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Logout Button at Bottom */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
