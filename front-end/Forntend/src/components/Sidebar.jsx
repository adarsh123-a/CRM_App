import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Leads', path: '/leads', icon: '👥' },
    { name: 'Customers', path: '/customers', icon: '💼' },
    { name: 'Reports', path: '/reports', icon: '📈' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed overflow-y-auto transition-all duration-300 z-10">
      <div className="p-6 bg-gray-900 border-b border-gray-700">
        <h2 className="text-xl font-bold">CRM System</h2>
      </div>
      <nav className="p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="border-b border-gray-700">
              <Link 
                to={item.path} 
                className={`flex items-center p-4 rounded transition-all duration-200 ${location.pathname === item.path ? 'bg-blue-600 border-l-4 border-blue-400' : 'hover:bg-gray-700'}`}
              >
                <span className="text-xl mr-4">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;