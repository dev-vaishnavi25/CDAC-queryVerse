import { useEffect, useState } from 'react';
import { Pencil, Trash2, Mail, Phone, MoreVertical, Search, Plus } from 'lucide-react';
import AdminLayout from '../AdminMainLayout/AdminLayout';
import { DeleteMentorData, EditMentorData, fetchMentorList } from '../../ApiServices/mentorAddAuthService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MentorEditModal from '../MentorModal/MentorEditModal';
import DeleteMentorModal from '../MentorModal/DeleteMentorModal';

const getStatusBadge = (status) => {
    return status ? (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
        </span>
    ) : (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Inactive
        </span>
    );
};

const getRoleBadge = (role) => (
    <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
        {role.replace('ROLE_', '')}
    </span>
);

const AllMentorList = () => {
    const navigate = useNavigate();
    const [mentors, setMentors] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEditClick = (mentor) => {
        setSelectedMentor(mentor);
        setIsModalOpen(true);
    }

        const handleDeleteClick = (mentor) => {
        setSelectedMentor(mentor);
        setIsDeleteModalOpen(true);
    }

    const handleGetMentorList = async () => {
        try {
            const response = await fetchMentorList();
            if (response?.status === "success") {
                setMentors(response.data);
                setFilteredMentors(response.data);
            } else {
                toast.error(response?.message || "Failed to fetch mentors");
            }
        } catch (error) {
            toast.error(error?.message || "Failed to fetch mentors");
        }
    };

    useEffect(() => {
        handleGetMentorList();
    }, []);

    const handleEditMentor = async (updatedForm) => {
        try {
            const response = await EditMentorData(selectedMentor.id, updatedForm);

            if (response.status === 'success') {
                toast.success(response.message || "Mentor update successfully!");
                setIsModalOpen(false);
                handleGetMentorList();
            } else {
                toast.error(response?.message || "Mentor updation failed.");
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong during updating mentor.");
        }
    };

       const handleDeleteMentor = async () => {
        try {
            const response = await DeleteMentorData(selectedMentor.id);

            if (response.status === 'success') {
                toast.success(response.message || "Mentor deleted successfully!");
                setIsDeleteModalOpen(false);
                handleGetMentorList();
            } else {
                toast.error(response?.message || "Mentor deleted failed.");
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong during deleted mentor.");
        }
    };

    return (
        <>
            <AdminLayout>
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Our Expert Mentors</h1>
                            <p className="text-gray-600">View and manage all mentors in your system.</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/addMentor')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            <Plus size={16} />
                            Add Mentor
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">Mentor Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black-800 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredMentors.length > 0 ? (
                                        filteredMentors.map((mentor, index) => (
                                            <tr key={mentor.id} className="hover:bg-gray-200 transition-colors hover:shadow-lg ">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-white">
                                                                {mentor.fullName.split(' ').map(n => n[0]).join('')}
                                                            </span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{mentor.fullName}</div>
                                                            <div className="text-sm text-gray-500">ID: {mentor.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 flex items-center">
                                                        <Mail size={14} className="mr-2 text-gray-400" />
                                                        {mentor.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(mentor.role)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(mentor.active)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-3">
                                                        <button className="text-blue-600 hover:text-blue-900 transition-colors p-1 hover:bg-blue-50 rounded"
                                                            onClick={() => handleEditClick(mentor)}>
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900 transition-colors p-1 hover:bg-red-50 rounded" onClick={() => handleDeleteClick(mentor)}>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center">
                                                    <Search className="text-gray-400 mb-4" size={48} />
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
                                                    <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminLayout>
            <MentorEditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                mentorData={selectedMentor} onSave={handleEditMentor}
            />
            <DeleteMentorModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDeleteMentor} mentorId={selectedMentor?.id} />
        </>
    );
};

export default AllMentorList;
