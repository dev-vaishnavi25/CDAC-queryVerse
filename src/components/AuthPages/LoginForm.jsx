import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../ApiServices/authApiService';


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const[formdata , setFormData] = useState({email: '' , password : ''});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formdata.email, formdata.password);
      if (response?.status === 'success') {
        toast.success(response.message || 'Login successful');
        const userRole = response?.data?.role;
        // Redirect based on user role
      switch (userRole) {
        case 'ROLE_ADMIN':
          navigate('/admin/adminDashboard');
          break;
        // case 'ROLE_MENTOR':
        //   navigate('/mentorDashboard');
        //   break;
        case 'ROLE_USER':
           navigate('/userDashboard');
           break;
        default:
          navigate('/');
          break;
      }
      } else {
        toast.error(response?.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
    }
  };

  const handleForogtPasssword = () => {
    navigate("/forgot-password");
  } 

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login to QueryVerse</h2>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
         <input
            name="email"
            type="email"
            placeholder="Email"
            value={formdata.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {/* Password Field with Eye Toggle */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
           <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formdata.password}
            onChange={handleChange}
            required
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

        {/* Forgot Password Link */}
        <div className="text-right text-sm">
          <button type ="button" className="text-purple-600 hover:underline" onClick={handleForogtPasssword}>
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all" 
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
