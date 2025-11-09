import React from 'react';
import { useState, useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage or use defaults
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      notifications: true,
      emailReports: true,
      darkMode: false,
      language: 'en',
      timezone: 'UTC'
    };
  });

  // Apply dark mode class to body when darkMode setting changes
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    // Save settings to localStorage whenever they change
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to a backend
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Settings</h1>
      </header>
      <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">System Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your system settings here.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">Preferences</h3>
              
              <div className="mb-4">
                <label className="flex items-center gap-3 mb-4 text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  Enable notifications
                </label>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-3 mb-4 text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    name="emailReports"
                    checked={settings.emailReports}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  Email reports
                </label>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center gap-3 mb-4 text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={settings.darkMode}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  Dark mode
                </label>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">System</h3>
              
              <div className="mb-4">
                <label htmlFor="language" className="block mb-2 text-gray-700 dark:text-gray-300">Language</label>
                <select
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="timezone" className="block mb-2 text-gray-700 dark:text-gray-300">Timezone</label>
                <select
                  id="timezone"
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="CET">Central European Time</option>
                </select>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Settings
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Settings;