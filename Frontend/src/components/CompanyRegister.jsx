import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import companyService from '../services/companyService';

const CompanyRegister = () => {
  const [step, setStep] = useState(1); // 1 for company creation, 2 for user registration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'SALES_EXECUTIVE',
    companyName: '',
    numberOfUsers: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdCompany, setCreatedCompany] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const companyData = {
        name: formData.companyName,
        size: parseInt(formData.numberOfUsers) || 0
      };
      
      const response = await companyService.createCompany(companyData);
      setCreatedCompany(response.company);
      setStep(2); // Move to user registration step
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        companyId: createdCompany.id // Assign user to the created company
      };
      
      await authService.register(userData);
      // After successful registration, navigate to login
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Company Registration</h2>
        
        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          <div className={`flex-1 text-center ${step === 1 ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
            1. Company Info
          </div>
          <div className="flex-1 text-center text-gray-300 dark:text-gray-600">—</div>
          <div className={`flex-1 text-center ${step === 2 ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
            2. User Info
          </div>
        </div>
        
        {error && <div className="text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-700 p-3 rounded mb-4">{error}</div>}
        
        {/* Step 1: Company Information */}
        {step === 1 && (
          <form onSubmit={handleCompanySubmit}>
            <div className="mb-4">
              <label htmlFor="companyName" className="block mb-2 text-gray-700 dark:text-gray-300">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="numberOfUsers" className="block mb-2 text-gray-700 dark:text-gray-300">Number of Users:</label>
              <input
                type="number"
                id="numberOfUsers"
                name="numberOfUsers"
                value={formData.numberOfUsers}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Company...' : 'Next: Register User'}
            </button>
          </form>
        )}
        
        {/* Step 2: User Registration */}
        {step === 2 && (
          <form onSubmit={handleUserSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-gray-700 dark:text-gray-300">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="role" className="block mb-2 text-gray-700 dark:text-gray-300">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="SALES_EXECUTIVE">Sales Executive</option>
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className={`flex-1 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        )}
        
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default CompanyRegister;