import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Get current user
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!user) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name} ({user.role})</span>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">Welcome to CRM Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">You have successfully logged in!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Leads</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Customers</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Revenue</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">$12,450</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;