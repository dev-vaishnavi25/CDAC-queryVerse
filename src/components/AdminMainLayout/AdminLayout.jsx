import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Sidebar - Fixed */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <AdminHeader />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
