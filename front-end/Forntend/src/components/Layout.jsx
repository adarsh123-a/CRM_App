import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import authService from '../services/authService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Apply dark mode class if it was set in settings
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;