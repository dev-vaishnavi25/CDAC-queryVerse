// src/components/Auth/AuthNavbar.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Branding */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QueryVerse
            </span>
          </div>

          {/* Optional Home button (can be hidden or used to go to main site) */}
      <button
  onClick={() => navigate('/')}
  className="bg-gradient-to-r border-2 border-white from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105 outline-2 outline-offset-2 outline-solid"
>
  Back to Home
</button>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
