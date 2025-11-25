import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import loginIllustration from '../assets/login-illustration.png';

const Login = () => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-24 flex flex-col justify-center relative">
        <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-brand-text transition-colors flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <FadeIn direction="up">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-heading font-bold mb-2">
              <span className="bg-brand-primary px-2 py-1">Revueon</span>
            </h1>
            <h2 className="text-4xl font-bold mb-8">Welcome back!</h2>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Link to="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand-primary text-brand-text font-bold py-3 rounded-lg hover:bg-brand-accent transition-colors"
                  type="button"
                >
                  Sign In
                </motion.button>
              </Link>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </button>

              <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Sign in with SSO
              </button>

              <div className="flex items-center justify-between text-sm mt-8">
                <p className="text-gray-600">Don't have an account? <Link to="/signup" className="text-brand-text font-bold hover:underline">Sign Up</Link></p>
                <a href="#" className="text-brand-text font-bold hover:underline">Forgot password?</a>
              </div>
            </form>

            <p className="text-xs text-gray-400 mt-12 leading-relaxed">
              By clicking "Sign In" you agree to the <a href="#" className="underline">Terms of Service</a> and acknowledge the <a href="#" className="underline">Privacy Notice</a>.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:block w-1/2 bg-[#FBF7F1] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <motion.img 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={loginIllustration} 
            alt="Login Illustration" 
            className="w-full max-w-2xl object-contain drop-shadow-2xl"
          />
        </div>
        {/* Decorative stars/elements */}
        <div className="absolute top-20 right-20 text-brand-primary text-4xl animate-pulse">✦</div>
        <div className="absolute bottom-40 left-20 text-brand-secondary text-6xl animate-pulse animation-delay-1000">✦</div>
      </div>
    </div>
  );
};

export default Login;
