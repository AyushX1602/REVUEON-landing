import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../AppIcon';
import CTAButton from '../ui/CTAButton';
import BrandLogo from '../BrandLogo';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const actionsRef = useRef(null);
  const menuButtonRef = useRef(null);

  useGSAP(() => {
    let lastScrollY = 0;
    let isScrolled = false;

    const shrinkNavbar = () => {
      gsap.to(navRef.current, {
        backgroundColor: "#000000",
        width: "90%",
        maxWidth: "1280px",
        borderRadius: "50px",
        marginTop: "20px",
        borderBottomColor: "transparent",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to([
        linksRef.current?.querySelectorAll('a'), 
        actionsRef.current?.querySelectorAll('a'), 
        menuButtonRef.current
      ], {
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(".brand-logo-text", {
        autoAlpha: 0,
        width: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(".brand-logo-icon", {
        backgroundColor: "#ffffff",
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(".brand-logo-icon span", {
        color: "#000000",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(".nav-cta-btn", {
        backgroundColor: "#000000",
        color: "#ffffff",
        borderColor: "#ffffff",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const expandNavbar = () => {
      gsap.to(navRef.current, {
        backgroundColor: "transparent",
        width: "100%",
        maxWidth: "100%",
        borderRadius: "0px",
        marginTop: "0px",
        borderBottomColor: "rgba(0,0,0,0.1)",
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to([
        linksRef.current?.querySelectorAll('a'), 
        actionsRef.current?.querySelectorAll('a'), 
        menuButtonRef.current
      ], {
        color: "#000000",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(".brand-logo-text", {
        autoAlpha: 1,
        width: "auto",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(".brand-logo-icon", {
        backgroundColor: "#E3F221",
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(".brand-logo-icon span", {
        color: "#000000",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(".nav-cta-btn", {
        backgroundColor: "#E3F221",
        color: "#000000",
        borderColor: "#E3F221",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50 && !isScrolled) {
        isScrolled = true;
        shrinkNavbar();
      } else if (currentScrollY <= 50 && isScrolled) {
        isScrolled = false;
        expandNavbar();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, { scope: navRef });

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
    // Wrapper: Fixed, Full Width, Flex Center, Pointer Events None
    <div className="fixed top-0 left-0 w-full z-[999] flex justify-center pointer-events-none">
      <nav 
        ref={navRef}
        // Nav: Pointer Events Auto, bg-white (User request), Initial Width 100%
        className="bg-white border-b border-gray-200/50 w-full pointer-events-auto"
      >
        <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0" ref={logoRef}>
              <Link to="/" className="flex items-center gap-2">
                <BrandLogo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 ml-10" ref={linksRef}>
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
            <div className="hidden md:flex items-center space-x-4" ref={actionsRef}>
              <Link to="/login" className="text-sm font-medium text-[#47423D] hover:text-[#5B5F97]">
                Log in
              </Link>
              <CTAButton to="/signup" size="small" className="nav-cta-btn">
                Get Started
              </CTAButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden" ref={menuButtonRef}>
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
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg rounded-b-2xl">
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
    </div>
  );
};

export default Navbar;
