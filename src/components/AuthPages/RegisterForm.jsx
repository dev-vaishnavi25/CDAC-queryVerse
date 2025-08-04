import React, { useEffect, useState } from 'react';
import { User, Mail, Lock, BookOpen } from 'lucide-react';
import { fetchCourseList, registerUser } from '../../ApiServices/authApiService';
import { handleApiError } from '../../utils/authErrorhandler';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formdata, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    course: ""
  });
  const [course, setCourse] = useState([]);

  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      const response = await fetchCourseList();
      setCourse(response);
    } catch (error) {
       console.error("Failed to load course list", error);
      toast.error("Failed to load course list");
    }
  };

  useEffect(() => {
    loadCourses();
  }, [])

  const validateForm = () => {
    if (!formdata.fullName || !formdata.email || !formdata.password || !formdata.course) {
      toast.error("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formdata.email)) {
      toast.error("Enter a valid email");
      return false;
    }
    if (formdata.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };


  const handleChnage = (e) => {
    setFormData({
      ...formdata, [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await registerUser(formdata);
      console.log("Register response:", response); 

       if ( response.status === "success") {
      toast.success(response.message || "Registration successful!");
      setTimeout(() => navigate("/Login"), 500);
    } else {
      toast.error(response?.message || "Registration failed.");
    }
  } catch (error) {
    const errorMsg = handleApiError(error); 
    toast.error(errorMsg || "Something went wrong during registration.");
  }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Your Account</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formdata.fullName}
            onChange={handleChnage}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChnage}
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChnage}
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

       <div className="relative">
  <div className="relative">
    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
    <select
      name="course"
      value={formdata.course}
      onChange={handleChnage}
      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700 text-base transition-all"
    >
      <option value="" disabled>Select Course</option>
      {course && course.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  </div>
</div>


        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
