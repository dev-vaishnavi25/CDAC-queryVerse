import { useEffect, useState } from 'react';
import {
  FileText,
  BookOpen,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Layout from './Layout';
import { getPost } from '../../ApiServices/postApiService';
import { toast } from 'react-toastify';
import AllPost from '../UserPost/AllPost';
import CourseFilter from '../UserPost/CourseFilter';
import Cookies from 'js-cookie';

const activityData = [
  { name: 'Mon', posts: 3 },
  { name: 'Tue', posts: 6 },
  { name: 'Wed', posts: 4 },
  { name: 'Thu', posts: 7 },
  { name: 'Fri', posts: 5 },
  { name: 'Sat', posts: 2 },
  { name: 'Sun', posts: 1 },
];

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const courseType = Cookies.get("course");

  const handleGetPostList = async (course) => {
    try {
      const response = await getPost();
      if (response?.success) {

        // const courseFiltered = response.data.filter(
        //   (post) => post.courseType === course
        // );
        setPosts(response.data);
        setFilteredPosts(response.data);
      } else {
        toast.error(response?.message || "Failed to fetch post");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to fetch post");
    }
  };

  useEffect(() => {
    setSelectedCourse(courseType); 
    handleGetPostList(courseType);
  }, []);
const handleCourseChange = (newCourse) => {
  handleGetPostList(newCourse); 
  setSelectedCourse(newCourse); 
};
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
    } else {
      const lower = searchTerm.toLowerCase();
      const result = posts.filter(
        (post) =>
          post.title?.toLowerCase().includes(lower) ||
          post.description?.toLowerCase().includes(lower)
      );
      setFilteredPosts(result);
    }
  }, [searchTerm, posts]);


  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* LEFT: User Posts */}
        <div className="md:col-span-6 space-y-4">
           <CourseFilter
            selectedCourse={selectedCourse}
            onCourseChange={handleCourseChange}
          />

          {filteredPosts.length > 0 ? (
            <AllPost posts={filteredPosts} />
          ) : (
            <p className="text-gray-500 text-center mt-4">❌Sorry! No post  available regarding {selectedCourse}</p>
          )}
        </div>

        {/* RIGHT: Dashboard Widgets */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Vaishnavi! 👋</h1>
            <p className="text-gray-500">Here’s what’s happening in QueryVerse today.</p>
          </div>

          {/* Trending Tags */}
          <div className="rounded-xl border bg-white shadow-md p-5">
            <h2 className="text-lg font-bold mb-2">🔥 Trending Tags</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'Pointers', 'DBMS', 'MongoDB', 'SpringBoot'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="rounded-xl border bg-white shadow-md p-5">
            <h2 className="text-lg font-bold mb-2">📈 Weekly Activity</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={activityData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="posts"
                    stroke="#7c3aed"
                    fillOpacity={1}
                    fill="url(#colorPosts)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Access */}
          <div className="rounded-xl border bg-white shadow-md p-5 space-y-3">
            <h2 className="text-lg font-bold mb-3">🚀 Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-purple-600 text-white rounded-lg py-2 font-semibold hover:shadow-xl transition">
                Ask Question
              </button>
              <button className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:shadow-xl transition">
                My Profile
              </button>
            </div>
          </div>

          {/* Materials & Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border bg-white shadow-md p-5">
              <h2 className="text-lg font-bold mb-3">📚 Enrolled Courses</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2"><BookOpen size={18} /> DAC September 2024</li>
                <li className="flex items-center gap-2"><BookOpen size={18} /> DITISS</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-white shadow-md p-5">
              <h2 className="text-lg font-bold mb-3">📁 Suggested Materials</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><FileText size={18} /> Advanced Pointers (PDF)</li>
                <li className="flex items-center gap-2"><FileText size={18} /> DBMS Notes by Sir Sharma</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
