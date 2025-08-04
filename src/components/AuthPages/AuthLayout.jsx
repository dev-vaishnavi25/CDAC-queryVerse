import React, { useState } from 'react';
import { Users, BookOpen, Award, Shield } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthNavbar from './AuthNavbar';
import { useLocation, useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20">
    <div className="flex items-center mb-2">
      <Icon className="text-white mr-2" size={20} />
      <h4 className="text-white font-semibold">{title}</h4>
    </div>
    <p className="text-purple-100 text-sm">{description}</p>
  </div>
);

const AuthLayout = () => {
  // const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

   const isLogin = location.pathname === "/Login";

  const renderCurrentScreen = () => (isLogin ? <LoginForm /> : <RegisterForm />);

  const loginFeatures = [
    {
      icon: Users,
      title: 'Smart Dashboard',
      description: 'Track doubts, answers & points in real time',
    },
    {
      icon: BookOpen,
      title: 'Expert Access',
      description: 'Verified mentors answer your toughest queries',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'All data is encrypted with industry standards',
    },
  ];

  const registerFeatures = [
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Unlock badges & rank higher by helping peers',
    },
    {
      icon: BookOpen,
      title: 'CDAC Library',
      description: 'Access exclusive preparation content & notes',
    },
    {
      icon: Users,
      title: 'CDAC Network',
      description: 'Collaborate with 1000+ students across centers',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 relative overflow-hidden">
        <AuthNavbar />

        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* Left: Form */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  {isLogin ? 'Welcome Back' : 'Create an Account'}
                </h2>
                <p className="text-gray-500 text-sm">
                  {isLogin
                    ? 'Login to continue your learning journey.'
                    : 'Join CDAC’s smartest community.'}
                </p>
              </div>
              {isLogin ? <LoginForm /> : <RegisterForm />}
              <div className="text-center mt-4 text-sm">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                onClick={() => navigate(isLogin ? '/register' : '/Login')}
                className="text-purple-600 font-semibold hover:underline"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Content */}
          <div className="hidden lg:flex flex-1 mt-5 items-center justify-center p-8 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
            <div className="max-w-md space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {isLogin ? 'Login  to QueryVerse' : 'Why Join QueryVerse?'}
                </h3>
                <p className="text-purple-100 text-sm">
                  {isLogin
                    ? 'Your personal gateway to get doubts solved and rank up.'
                    : 'Join India’s smartest CDAC network with instant doubt help and growth.'}
                </p>
              </div>

              <div className="space-y-3">
                {(isLogin ? loginFeatures : registerFeatures).map(
                  ({ icon, title, description }, index) => (
                    <FeatureCard key={index} icon={icon} title={title} description={description} />
                  )
                )}
              </div>

              <div className="mt-6 text-sm text-purple-200 italic">
                {isLogin
                  ? '“I log in daily just to solve doubts. It boosts my skills!”'
                  : '“Joining QueryVerse helped me connect with mentors and grow fast.”'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
