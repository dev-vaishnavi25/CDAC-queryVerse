// components/EditMentorModal.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MentorEditModal = ({ isOpen, onClose, mentorData, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    // password: '',
  });

  useEffect(() => {
    if (mentorData) {
      setFormData({
        fullName: mentorData.fullName || '',
        email: mentorData.email || '',
        // password: '', // password won't be shown by default
      });
    }
  }, [mentorData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form Data Being Submitted:", formData); 
  onSave(formData);
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-600">
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Mentor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm"
              required
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm"
              required
            />
          </div> */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorEditModal;
