import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Bgimage from '../assets/bglogin.gif'
import { Eye, EyeOff, Mail, Lock, LogIn, UserPlus, Stethoscope, Heartbeat, Calendar, Clipboard, FileText } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeIcon, setActiveIcon] = useState(0);

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  // Hospital management system icons for animation
  const hmsIcons = [
    <Stethoscope size={28} className="text-blue-400" />,
    <Calendar size={28} className="text-green-400" />,
    <Clipboard size={28} className="text-purple-400" />,
    <FileText size={28} className="text-yellow-400" />
  ];

  // Auto-cycle through icons
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % hmsIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
  };
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
   
    setTimeout(() => {
      setLoading(false);
      setFormError('Login failed. Please try again.');
    }, 2000);
  };
 
  return (
    <div className="flex h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full px-4">
        <div className="flex bg-black bg-opacity-70 rounded-xl border border-gray-800 shadow-2xl w-full max-w-4xl backdrop-blur-sm overflow-hidden">
          
          {/* Left Side - Animated HealNet Content */}
<div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-900 to-purple-900 relative p-8 flex-col justify-center items-center overflow-hidden">
  {/* HealNet Content */}
  <div className="relative z-10 text-white text-center animate-fade-in">
    <h2 className="text-3xl font-bold mb-6 animate-slide-up">Welcome to HealNet</h2>
    <p className="text-md text-gray-300 mb-4 animate-fade-in delay-100">
      A Smart Hospital Management System for the Modern World
    </p>

    {/* Animated Icon */}
    <div className="flex justify-center mb-8 relative h-16">
      {hmsIcons.map((icon, index) => (
        <div 
          key={index} 
          className={`absolute transition-all duration-700 transform ${
            activeIcon === index 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-75"
          }`}
        >
          {icon}
        </div>
      ))}
    </div>

    {/* Features List */}
    <div className="space-y-5 text-left animate-fade-in delay-200">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-800 bg-opacity-50 rounded-full animate-bounce">
          <Stethoscope size={18} className="text-blue-300" />
        </div>
        <p className="text-sm text-gray-300">Effortless Doctor Appointment Scheduling</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-800 bg-opacity-50 rounded-full animate-bounce delay-100">
          <Calendar size={18} className="text-green-300" />
        </div>
        <p className="text-sm text-gray-300">Centralized Patient Records & Medical History</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="p-2 bg-purple-800 bg-opacity-50 rounded-full animate-bounce delay-200">
          <Clipboard size={18} className="text-purple-300" />
        </div>
        <p className="text-sm text-gray-300">Smart Analytics for Medical Reports</p>
      </div>
    </div>

    {/* Background Animation Circles */}
    <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-ping"></div>
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-ping delay-1000"></div>
  </div>
</div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            {/* Animated glow effect */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
              <p className="text-gray-400">Sign in to access your account</p>
            </div>
            
            {/* Error message */}
            {formError && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded-lg mb-6 text-sm">
                {formError}
              </div>
            )}
            
            {/* Login Fields */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email field */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                  <Mail size={16} className="text-blue-400" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={data.email}
                    required
                    name="email"
                    onChange={handleOnchange}
                    className="w-full p-3 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              {/* Password field */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                  <Lock size={16} className="text-blue-400" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    required
                    name="password"
                    onChange={handleOnchange}
                    className="w-full p-3 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-all cursor-pointer">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all ${
                  loading
                    ? "bg-blue-800 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
            
            {/* Register link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-400 hover:text-blue-300 hover:underline transition-all flex items-center justify-center gap-1 mt-2 cursor-pointer">
                  <UserPlus size={16} />
                  <span>Create an account</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login