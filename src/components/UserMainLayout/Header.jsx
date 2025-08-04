import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b fixed top-0 left-64 right-0 z-30">
      <h1 className="text-2xl font-bold text-blue-700"></h1>
      <div className="flex items-center gap-4">
        <Bell className="text-gray-600 cursor-pointer hover:text-blue-600 transition" />
        <Link to={'/userProfile'}>
        <img
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt="Profile"
          className="w-9 h-9 rounded-full border border-blue-300 shadow-sm"
        />
        </Link>
      </div>
    </header>
  );
};

export default Header;
