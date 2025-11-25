import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';
import CTAButton from '../ui/CTAButton';
import BrandLogo from '../BrandLogo';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = useMemo(() => [
    {
      label: 'Platform',
      href: '/homepage-landing',
      children: [
        { label: 'Overview', href: '/homepage-landing' },
        { label: 'Interactive Demo', href: '/product-demo-interactive' }
      ]
    },
    {
      label: 'Roles',
      href: '/roles',
      children: [
        { label: 'Sales Teams', href: '/roles/sales' },
        { label: 'Marketing Teams', href: '/roles/marketing' }
      ]
    },
    {
      label: 'Resources',
      href: '/resources',
      children: [
        { label: 'Documentation', href: '/resources/docs' },
        { label: 'Blog', href: '/resources/blog' }
      ]
    },
    {
      label: 'Pricing',
      href: '/pricing-calculator'
    }
  ], []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const isActiveRoute = useCallback((href) => {
    return location.pathname === href;
  }, [location.pathname]);

  const isActiveParent = useCallback((item) => {
    if (item.href === location.pathname) return true;
    return item.children?.some(child => child.href === location.pathname) || false;
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F3F2F0]/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <BrandLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActiveParent(item) ? 'text-[#5B5F97]' : 'text-[#47423D] hover:text-[#5B5F97]'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-[#47423D] hover:text-[#5B5F97]">
              Log in
            </Link>
            <CTAButton to="/signup" size="small">
              Get Started
            </CTAButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-[#47423D] hover:bg-gray-100"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#47423D] hover:bg-gray-50 hover:text-[#5B5F97]"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#47423D] hover:bg-gray-50"
              >
                Log in
              </Link>
              <div className="px-3">
                <CTAButton to="/signup" className="w-full justify-center">
                  Get Started
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
