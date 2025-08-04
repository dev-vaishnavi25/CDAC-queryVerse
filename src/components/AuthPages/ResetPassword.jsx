import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import AuthNavbar from './AuthNavbar';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {makeJsonApiRequest} from '../../ApiServices/apiRequest';


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

   const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in both fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const endpoint = `http://localhost:9090/auth/reset-password?token=${token}`;
      const body = {
        newPassword,
        confirmPassword
      };

      const response = await makeJsonApiRequest('POST', endpoint, body);

      if (response?.status === 'success') {
        toast.success(response.message || 'Password reset successful!');
        setTimeout(() => navigate('/Login'), 500);
      } else {
        toast.error(response?.message || 'Password reset failed');
      }
    } catch (err) {
      toast.error('Something went wrong while resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AuthNavbar/>
 <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f0f4ff] via-[#e7e9fc] to-[#f8f9ff] flex items-center justify-center px-4">
    
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* Left: Form */}
        <div className="p-10 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Your Password</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Enter your new password below. Make sure it’s strong and secure.
          </p>

          <form className="space-y-5" onSubmit={handleResetPassword}>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Reset Password
            </button>
          </form>
        </div>

        {/* Right: Message */}
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
          <p className="text-purple-100 text-sm text-center max-w-sm">
            Your account’s ready to go. Just set your new password and continue learning with QueryVerse.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
