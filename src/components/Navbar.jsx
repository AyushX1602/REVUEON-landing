import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const tlRef = React.useRef(null);

  useGSAP(() => {
    if (!menuRef.current) return;

    // Create timeline but pause it
    tlRef.current = gsap.timeline({ paused: true });

    tlRef.current
      .to(menuRef.current, {
        y: '0%',
        duration: 0.6,
        ease: "power4.inOut",
      })
      .from('.mobile-link', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");

  }, { scope: menuRef });

  // Play/Reverse timeline based on state
  React.useEffect(() => {
    if (tlRef.current) {
      if (isOpen) {
        tlRef.current.play();
      } else {
        tlRef.current.reverse();
      }
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center relative z-50">
              <Link to="/" className="text-2xl font-heading font-bold text-brand-text tracking-tight">
                <span className="bg-brand-primary px-2 py-1">Revueon</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Impact', 'Pricing'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-brand-text relative group overflow-hidden">
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                </a>
              ))}
              <Link to="/signup" className="btn-primary text-sm px-5 py-2">
                Sign Up
              </Link>
            </div>

            <div className="md:hidden flex items-center relative z-50">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-text hover:text-brand-primary transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-[#F3F2F0] z-40 transform -translate-y-full flex flex-col items-center justify-center space-y-8 md:hidden"
      >
        {/* Background Grain */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
        </div>

        {['Features', 'Impact', 'Pricing'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            onClick={() => setIsOpen(false)}
            className="mobile-link text-4xl font-heading font-bold text-brand-text hover:text-brand-primary transition-colors"
          >
            {item}
          </a>
        ))}
        <Link 
          to="/signup" 
          onClick={() => setIsOpen(false)}
          className="mobile-link btn-primary text-xl px-8 py-4 mt-8"
        >
          Sign Up Now
        </Link>
      </div>
    </>
  );
};

export default Navbar;
