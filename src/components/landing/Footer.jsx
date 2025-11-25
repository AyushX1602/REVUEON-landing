import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  return (
    <footer className="bg-[#47423D] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-[#E3F221] rounded-full flex items-center justify-center">
                <Icon name="Zap" size={16} color="black" />
              </div>
              <span className="text-xl font-semibold text-white">
                Revueon
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Empowering businesses with intelligent review analytics and customer insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#E3F221] transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E3F221] transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E3F221] transition-colors">
                <Icon name="Github" size={20} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E3F221]">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="text-gray-400 hover:text-white transition-colors">Integrations</Link></li>
              <li><Link to="/enterprise" className="text-gray-400 hover:text-white transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E3F221]">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/guides" className="text-gray-400 hover:text-white transition-colors">Guides</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E3F221]">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/legal" className="text-gray-400 hover:text-white transition-colors">Legal</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Revueon Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
