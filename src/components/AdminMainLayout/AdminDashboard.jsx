import { 
  FaHome, 
  FaUserCheck, 
  FaClipboardList, 
  FaTags, 
  FaMoneyCheckAlt,
  FaTimes,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaEye,
  FaCrown,
  FaFlag,
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaFileAlt,
  FaCalendarAlt,
  FaGlobe
} from 'react-icons/fa';
import AdminLayout from './AdminLayout';
const StatsCard = ({ title, value, change, icon, color }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <div className="flex items-center mt-2">
          <FaArrowUp className="text-green-500 text-xs mr-1" />
          <span className="text-sm text-green-600 font-medium">{change}</span>
          <span className="text-sm text-gray-500 ml-1">from last month</span>
        </div>
      </div>
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

// Table Row Component
const TableRow = ({ user, email, role, joinDate }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50">
    <td className="px-6 py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
          <span className="text-sm font-medium text-gray-700">{user.charAt(0)}</span>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{user}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        role === 'Admin' ? 'bg-purple-100 text-purple-800' :
        role === 'Mentor' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {role}
      </span>
    </td>
   
    <td className="px-6 py-4 text-sm text-gray-500">{joinDate}</td>
    <td className="px-6 py-4">
      <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
      <button className="text-red-600 hover:text-red-900 text-sm font-medium ml-4">Delete</button>
    </td>
  </tr>
);

// Main Dashboard Component
const AdminDashboard = () => {

  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12.5%",
      icon: <FaUsers className="text-white" />,
      color: "bg-blue-500"
    },
    {
      title: "Active Reports",
      value: "24",
      change: "+8.2%",
      icon: <FaClipboardList className="text-white" />,
      color: "bg-red-500"
    },
    {
      title: "Monthly Revenue",
      value: "$45,280",
      change: "+15.3%",
      icon: <FaDollarSign className="text-white" />,
      color: "bg-green-500"
    },
    {
      title: "Premium Users",
      value: "3,247",
      change: "+22.1%",
      icon: <FaCrown className="text-white" />,
      color: "bg-purple-500"
    }
  ];

  const recentUsers = [
    { user: "John Doe", email: "john@example.com", role: "User", joinDate: "Jan 15, 2024" },
    { user: "Sarah Wilson", email: "sarah@example.com", role: "Mentor",joinDate: "Jan 12, 2024" },
    { user: "Mike Johnson", email: "mike@example.com", role: "User",  joinDate: "Jan 10, 2024" },
    { user: "Emily Davis", email: "emily@example.com", role: "Admin", joinDate: "Jan 8, 2024" },
    { user: "Alex Brown", email: "alex@example.com", role: "User",  joinDate: "Jan 5, 2024" }
  ];

  const recentReports = [
    { id: "#RPT-001", type: "Spam Content", reporter: "John Doe", status: "Pending", date: "2 hours ago" },
    { id: "#RPT-002", type: "Inappropriate Behavior", reporter: "Sarah Wilson", status: "Under Review", date: "4 hours ago" },
    { id: "#RPT-003", type: "Fake Profile", reporter: "Mike Johnson", status: "Resolved", date: "1 day ago" },
    { id: "#RPT-004", type: "Harassment", reporter: "Emily Davis", status: "Pending", date: "2 days ago" }
  ];

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      
       
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Analytics Chart */}
            <div className="xl:col-span-2 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <FaChartLine className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium">Analytics Chart</p>
                  <p className="text-sm text-gray-400">Chart integration pending</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <FaGlobe className="text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Total Posts</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">8,492</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-green-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Today's Activity</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">247</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <FaFileAlt className="text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Categories</span>
                  </div>
                  <span className="text-sm font-semibold text-purple-600">156</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Recent Users Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <TableRow key={index} {...user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{report.id}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            report.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{report.type}</p>
                        <p className="text-xs text-gray-500">By {report.reporter} • {report.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

    </div>
    </AdminLayout>
  );
};

export default AdminDashboard;