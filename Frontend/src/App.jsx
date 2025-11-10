import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import Customers from './components/Customers';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Layout from './components/Layout';
import { useEffect } from 'react';
import Users from './components/Users';
import CompanyRegister from './components/CompanyRegister';

function App() {
  useEffect(() => {
    // Check for dark mode preference on initial load
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.darkMode) {
        document.body.classList.add('dark');
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyRegister />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-register" element={<CompanyRegister />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;