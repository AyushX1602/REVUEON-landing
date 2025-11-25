import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-heading font-bold text-brand-text tracking-tight">
              <span className="bg-brand-primary px-2 py-1">Revyno</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">Features</a>
            <a href="#impact" className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">Impact</a>
            <a href="#pricing" className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors">Pricing</a>
            <Link to="/signup" className="btn-primary text-sm px-5 py-2">
              Sign Up
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-brand-text hover:text-brand-primary">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
