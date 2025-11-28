import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#47423D] via-[#3A3530] to-[#2D2820] text-white py-16 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(227, 242, 33, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 242, 33, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'float 20s ease-in-out infinite'
        }} />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E3F221] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5B5F97] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-8 h-8 bg-[#E3F221] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-[#E3F221]/50 transition-all duration-300 group-hover:scale-110">
                <Icon name="Zap" size={16} color="black" />
              </div>
              <span className="text-xl font-semibold text-white group-hover:text-[#E3F221] transition-colors">
                Revueon
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering businesses with intelligent review analytics and customer insights.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E3F221] hover:border-[#E3F221]/50 hover:bg-[#E3F221]/10 transition-all duration-300 hover:scale-110 group">
                <Icon name="Twitter" size={18} className="group-hover:animate-pulse" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E3F221] hover:border-[#E3F221]/50 hover:bg-[#E3F221]/10 transition-all duration-300 hover:scale-110 group">
                <Icon name="Linkedin" size={18} className="group-hover:animate-pulse" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E3F221] hover:border-[#E3F221]/50 hover:bg-[#E3F221]/10 transition-all duration-300 hover:scale-110 group">
                <Icon name="Github" size={18} className="group-hover:animate-pulse" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#E3F221] to-[#F4FF6E]">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Pricing</Link></li>
              <li><Link to="/integrations" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Integrations</Link></li>
              <li><Link to="/enterprise" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#E3F221] to-[#F4FF6E]">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Documentation</Link></li>
              <li><Link to="/guides" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Guides</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#E3F221] to-[#F4FF6E]">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Careers</Link></li>
              <li><Link to="/legal" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Legal</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Glassmorphism Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E3F221]/20 to-transparent" />
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center gap-2">
            <span>© {new Date().getFullYear()} Revueon Inc.</span>
            <span className="hidden md:inline text-gray-600">•</span>
            <span className="text-gray-500">All rights reserved.</span>
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E3F221] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-[#E3F221] transition-all duration-300 relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E3F221] group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
