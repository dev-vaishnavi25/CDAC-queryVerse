import React, { useState } from 'react'
import AdminLayout from '../AdminMainLayout/AdminLayout'
import { MentorvalidateForm } from '../../utils/validator';
import { AddMentorData } from '../../ApiServices/mentorAddAuthService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddMentor = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleAddMentor = async (e) => {
    e.preventDefault();

    const isValid = MentorvalidateForm(form);
    if (!isValid) return;

    try {
      const response = await AddMentorData(form);

      if (response.status === 'success') {
        toast.success(response.message || "Mentor added successfully!");
        setForm({ fullName: '', email: '', password: '' });
        setTimeout(() => navigate("/admin/allMentorList"), 500);
      } else {
        toast.error(response?.message || "Mentor add failed.");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong during adding mentor.");
    }
  };

  return (
    <>
    <AdminLayout>
      <div>
         <div className="mb-10 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Add a New Mentor</h1>
          <p className="text-gray-700 text-md">
            Use this form to onboard a new mentor to the platform. Ensure the details are accurate and verified.
            Once added, the mentor will have access to their dashboard and mentoring tools. You can assign roles,
            view activity, and manage their access rights from the admin panel.
          </p>
        </div>
      </div>
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10 shadow">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Mentor</h2>

        <form onSubmit={handleAddMentor} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold"
          >
            Add Mentor
          </button>
        </form>
      </div>
    </AdminLayout>
    </>
  )
}

export default AddMentor
