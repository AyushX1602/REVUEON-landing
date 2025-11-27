import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="text-2xl font-heading font-bold text-brand-text tracking-tight mb-4 block">
              Revueon
            </a>
            <p className="text-gray-500 text-sm leading-relaxed">
              Helping Shopify brands turn customer feedback into actionable growth strategies.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {['Features', 'Pricing', 'Integrations', 'Changelog'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-brand-primary transition-colors flex items-center gap-1 group">
                    {item}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-brand-primary">About</a></li>
              <li><a href="#" className="hover:text-brand-primary">Blog</a></li>
              <li><a href="#" className="hover:text-brand-primary">Careers</a></li>
              <li><a href="#" className="hover:text-brand-primary">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-brand-primary">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-primary">Terms</a></li>
              <li><a href="#" className="hover:text-brand-primary">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Revueon Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-brand-text"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-brand-text"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-brand-text"><Github size={20} /></a>
      </div>
        </div>
      </div>
      
      {/* Massive Footer Watermark */}
      <div className="w-full overflow-hidden pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[15vw] font-bold text-center leading-none tracking-tighter text-[#47423D]">
          REVUEON
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
