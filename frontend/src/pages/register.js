import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Bgimage from '../assets/bglogin.gif'
import { Eye, EyeOff, Mail, Lock, LogIn, UserPlus, Stethoscope, Calendar, Clipboard, FileText, User, CreditCard, Calendar as CalendarIcon, Image, CheckCircle } from 'lucide-react';
import imageToBase64 from '../helpers/imageTobase64';
import SummariApi from '../common/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeIcon, setActiveIcon] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);
  
  // Form data state - only include fields from the schema
  const [data, setData] = useState({
    fullName: '',
    email: '',
    nic: '',
    gender: '',
    dob: '',
    password: '',
    profilePic: ''
  });

  // Separate state for confirmation password (not part of schema)
  const [confirmPassword, setConfirmPassword] = useState('');

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

  // Check if passwords match
  useEffect(() => {
    if (confirmPassword && data.password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [data.password, confirmPassword]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    // Handle confirm password separately as it's not part of the schema
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      // Update other fields in the data state
      setData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Separate function for handling profile picture upload
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    
    // Clear previous errors
    setImageError('');
    
    // Basic validation
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      setImageError('Please select an image file (JPG, PNG, etc.)');
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    try {
      // Convert to base64 with compression
      const imagePic = await imageToBase64(file);
      setImagePreview(imagePic);
      setData(prev => ({
        ...prev,
        profilePic: imagePic
      }));
    } catch (error) {
      console.error("Error processing image:", error);
      setImageError("Failed to process the image. Please try a smaller file or different format.");
    } finally {
      setLoading(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    setLoading(true);
    setFormError('');
    
    // Basic validation
    if (data.password !== confirmPassword) {
      setLoading(false);
      setFormError('Passwords do not match');
      return;
    }
    
    if (data.password.length < 8) {
      setLoading(false);
      setFormError('Password must be at least 8 characters');
      return;
    }
    
    try {
      // Only proceed with API call if passwords match
      if (data.password === confirmPassword) {
        // Send the data object (which matches the schema) to the API
        const dataResponse = await fetch(SummariApi.signUp.url, {
          method: SummariApi.signUp.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!dataResponse.ok) {
          // Get response data even for error cases
          const errorData = await dataResponse.json();
          throw new Error(errorData.message || `Server responded with status: ${dataResponse.status}`);
        }
    
        const dataApi = await dataResponse.json();
        console.log('API Response:', dataApi);
        
        // Handle successful registration
        if (dataApi.success) {
          // Show success toast notification
          toast.success('Registration successful! ', {
            position: "top-right",  
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          
          // Redirect after short delay to allow toast to be seen
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          // Show error from API
          setFormError(dataApi.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      setFormError(error.message || 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="flex min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      
      {/* Toast Container */}
      <ToastContainer />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full px-4 py-12">
        <div className="flex bg-black bg-opacity-70 rounded-xl border border-gray-800 shadow-2xl w-full max-w-5xl backdrop-blur-sm overflow-hidden">
          
          {/* Left Side - Animated HealNet Content */}
          <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-900 to-purple-900 relative p-8 flex-col justify-center items-center overflow-hidden">
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

          {/* Right Side - Registration Form */}
          <div className="w-full lg:w-3/5 p-6 flex flex-col justify-center">
            {/* Animated glow effect */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
              <p className="text-gray-400">Join HealNet and access our services</p>
            </div>
            
            {/* Error message */}
            {formError && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
                {formError}
              </div>
            )}
            
            {/* Registration Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name field */}
                <div className="space-y-1">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <User size={16} className="text-blue-400" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleOnChange}
                    required
                    className="w-full p-2.5 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email field */}
                <div className="space-y-1">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <Mail size={16} className="text-blue-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className="w-full p-2.5 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                {/* NIC field */}
                <div className="space-y-1">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <CreditCard size={16} className="text-blue-400" />
                    National ID Card
                  </label>
                  <input
                    type="text"
                    name="nic"
                    value={data.nic}
                    onChange={handleOnChange}
                    required
                    className="w-full p-2.5 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="123456789012"
                  />
                </div>

                {/* Gender field */}
                <div className="space-y-1">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <User size={16} className="text-blue-400" />
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={data.gender}
                    onChange={handleOnChange}
                    required
                    className="w-full p-2.5 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Date of Birth field */}
                <div className="space-y-1">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <CalendarIcon size={16} className="text-blue-400" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={data.dob}
                    onChange={handleOnChange}
                    required
                    className="w-full p-2.5 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Profile Picture field */}
                <div className="space-y-1">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <Image size={16} className="text-blue-400" />
                    Profile Picture
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      name="profilePic"
                      ref={fileInputRef}
                      onChange={handleUploadPic}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="flex-1 p-2.5 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-gray-400 hover:text-white focus:outline-none hover:border-blue-500 transition-all text-left truncate"
                    >
                      {imagePreview ? "Image selected" : "Choose an image"}
                    </button>
                    {imagePreview && (
                      <div className="ml-2 h-10 w-10 rounded-full overflow-hidden border border-gray-700">
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                  {imageError && (
                    <p className="text-red-400 text-xs mt-1">{imageError}</p>
                  )}
                </div>
              </div>
              
              {/* Password fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {/* Password field */}
                <div className="space-y-1">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <Lock size={16} className="text-blue-400" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={data.password}
                      onChange={handleOnChange}
                      required
                      className="w-full p-2.5 bg-gray-900 bg-opacity-70 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field */}
                <div className="space-y-1">
                  <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <CheckCircle size={16} className="text-blue-400" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      required
                      className={`w-full p-2.5 bg-gray-900 bg-opacity-70 rounded-lg border ${
                        confirmPassword && !passwordMatch ? "border-red-500" : "border-gray-700"
                      } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="Re-enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {confirmPassword && !passwordMatch && (
                    <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || (confirmPassword && !passwordMatch)}
                className={`w-full py-3 mt-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all ${
                  loading || (confirmPassword && !passwordMatch)
                    ? "bg-blue-800 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>
            
            {/* Login link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 hover:underline transition-all flex items-center justify-center gap-1 mt-2 cursor-pointer">
                  <LogIn size={16} />
                  <span>Sign In</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;