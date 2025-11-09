import React from 'react';
import { useState, useEffect } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching customers data
    setTimeout(() => {
      const mockCustomers = [
        { id: 1, name: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', phone: '(555) 123-4567', value: '$25,000' },
        { id: 2, name: 'Globex Inc', contact: 'Jane Smith', email: 'jane@globex.com', phone: '(555) 987-6543', value: '$42,500' },
        { id: 3, name: 'Wayne Enterprises', contact: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '(555) 555-5555', value: '$120,000' },
        { id: 4, name: 'Stark Industries', contact: 'Tony Stark', email: 'tony@stark.com', phone: '(555) 111-2222', value: '$85,000' },
      ];
      setCustomers(mockCustomers);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Customers Management</h1>
      </header>
      <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">Customers Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage all your customers here.</p>
        </div>
        
        {loading ? (
          <div className="p-4 text-center text-gray-600 dark:text-gray-400">Loading customers...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Company</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Contact</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Email</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Phone</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Value</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{customer.name}</td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{customer.contact}</td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{customer.email}</td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{customer.phone}</td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{customer.value}</td>
                    <td className="py-3 px-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default Customers;