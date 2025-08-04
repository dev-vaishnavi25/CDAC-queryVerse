import {
  User,
  Mail,
  Phone,
  BookOpen,
  Briefcase,
  Home,
  FileText,
  Camera,
  Pencil,
  Check,
} from "lucide-react";
import Layout from "../UserMainLayout/Layout";
import { fetchUserProfile, uploadAvatar } from "../../ApiServices/authApiService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ mobileNumber: "", address: "" });

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleGetProfile = async () => {
    try {
      const response = await fetchUserProfile();
      if (response?.status === "success") {
        setUser(response.data);
        setUpdatedUser({
          mobileNumber: response.data.mobileNumber || "",
          address: response.data.address || "",
        });
      } else {
        toast.error(response?.message || "Failed to fetch profile");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to fetch profile");
    }
  };

  

   const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      toast.info("Uploading avatar...");
      const response = await uploadAvatar(file);

      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success("Avatar uploaded successfully!");

        const profileRes = await fetchUserProfile();
        if (profileRes?.status === 200 && profileRes?.data?.data) {
          setUser(profileRes.data.data); 
        }
      } else {
        toast.error(response?.data?.message || "Upload failed");
      }
    } catch (err) {
      toast.error(err?.message || "Upload error");
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="text-center text-gray-600 mt-40 text-xl">Data profile is not available...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-50 py-6">
        <div className="max-w-1xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Profile Overview</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Welcome back, {user.fullName?.split(" ")[0]}!
                </p>
              </div>
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {user.role}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <div className="md:w-1/3 flex flex-col items-center text-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-gray group shadow-lg">
                  {user.avatar ? (
                    <img   src={`http://localhost:8082/uploads/${user.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="bg-gray-300 w-full h-full flex items-center justify-center text-5xl font-bold text-white">
                      {user.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* Camera Upload */}
                  <label className="absolute bottom-3 right-3 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                    <Camera className="w-4 h-4 text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0"
                      onChange={handleUploadAvatar}
                    />
                  </label>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">{user.fullName}</h3>
                <p className="text-gray-500 text-sm">{user.course || "Student"}</p>
              </div>

              {/* Details */}
              <div className="md:w-2/3 space-y-8">
                {/* Personal Info */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <p className="text-gray-400">Email</p>
                        <p>{user.email}</p>
                      </div>
                    </div>

                    {/* Editable Mobile */}
                    <div className="flex gap-3 relative">
                      <Phone className="w-5 h-5 text-pink-500 mt-1" />
                      <div>
                        <p className="text-gray-400">Mobile</p>
                        {editMode ? (
                          <input
                            type="text"
                            value={updatedUser.mobileNumber}
                            onChange={(e) =>
                              setUpdatedUser({ ...updatedUser, mobileNumber: e.target.value })
                            }
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                          />
                        ) : (
                          <p>{user.mobileNumber || "Not provided"}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Briefcase className="w-5 h-5 text-indigo-500 mt-1" />
                      <div>
                        <p className="text-gray-400">Department</p>
                        <p>{user.department || "Not provided"}</p>
                      </div>
                    </div>

                    {/* Editable Address */}
                    <div className="flex gap-3 relative">
                      <Home className="w-5 h-5 text-green-600 mt-1" />
                      <div className="w-full">
                        <p className="text-gray-400">Address</p>
                        {editMode ? (
                          <input
                            type="text"
                            value={updatedUser.address}
                            onChange={(e) =>
                              setUpdatedUser({ ...updatedUser, address: e.target.value })
                            }
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                          />
                        ) : (
                          <p>{user.address || "Not provided"}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Edit/Save Toggle Button */}
                  <div className="mt-4 flex justify-end">
                    {!editMode ? (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1 text-sm text-green-600 hover:underline"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                    )}
                  </div>
                </div>

                {/* About Me */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                    About Me
                  </h4>
                  <p className="text-sm text-gray-600">
                    {user.bio ||
                      "Hi! I'm a passionate learner currently exploring tech and development. I love building cool things and solving real-world problems."}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                    <BookOpen className="w-5 h-5 text-yellow-600" />
                    Expertise
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {user.expertise ? (
                      user.expertise
                        .split(",")
                        .map((skill, idx) => <li key={idx}>{skill.trim()}</li>)
                    ) : (
                      <>
                        <li>React.js & Tailwind CSS</li>
                        <li>Spring Boot</li>
                        <li>REST API Integration</li>
                        <li>Problem Solving</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;
