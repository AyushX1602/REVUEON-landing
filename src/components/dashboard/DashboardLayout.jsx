import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Sparkles, Settings, LogOut, Bell, Search } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Sparkles, label: 'AI Insights', path: '/dashboard/ai' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-20 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="text-2xl font-heading font-bold text-brand-text tracking-tight flex items-center gap-2">
            <span className="bg-brand-primary px-2 py-1">Revyno</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-primary text-brand-text' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-brand-text'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 lg:hidden">
            <span className="font-heading font-bold text-xl">Revyno</span>
          </div>

          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search reviews, customers, or insights..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-brand-text font-bold text-sm">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
