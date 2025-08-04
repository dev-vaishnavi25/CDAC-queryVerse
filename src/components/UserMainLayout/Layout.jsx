
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6 space-y-6 overflow-y-auto max-h-screen pt-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;