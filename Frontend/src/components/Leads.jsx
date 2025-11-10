import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeads, deleteLead } from '../store/leadsSlice';
import LeadForm from './LeadForm';

const Leads = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const dispatch = useDispatch();
  const { items: leads, loading, error } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleMenuToggle = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
    setActiveMenu(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteLead(id));
    setActiveMenu(null);
  };

  const handleView = (id) => {
    console.log('View lead history:', id);
    // Implement view history functionality
    setActiveMenu(null);
  };

  const handleAddLead = () => {
    setEditingLead(null);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingLead(null);
    // Refresh the leads list
    dispatch(fetchLeads());
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingLead(null);
  };

  if (showForm) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <LeadForm 
          lead={editingLead} 
          onSubmit={handleFormSubmit} 
          onCancel={handleFormCancel} 
        />
      </div>
    );
  }

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Leads Management</h1>
        <button
          onClick={handleAddLead}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Lead
        </button>
      </header>
      <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">Leads Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage all your leads here.</p>
        </div>
        
        {error && (
          <div className="p-4 mb-4 text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded">
            Error: {error}
          </div>
        )}
        
        {loading ? (
          <div className="p-4 text-center text-gray-600 dark:text-gray-400">Loading leads...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Name</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Email</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Status</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Created</th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads && leads.map(lead => (
                  <tr key={lead.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{lead.title}</td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{lead.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        lead.status === 'NEW' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        lead.status === 'QUALIFIED' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4 relative">
                      <div className="relative">
                        <button 
                          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleMenuToggle(lead.id)}
                        >
                          <span className="text-lg">☰</span>
                        </button>
                        
                        {activeMenu === lead.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                            <button 
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handleView(lead.id)}
                              title="View History"
                            >
                              <span className="mr-2">👁️</span> View
                            </button>
                            <button 
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handleEdit(lead)}
                              title="Edit"
                            >
                              <span className="mr-2">✏️</span> Edit
                            </button>
                            <button 
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handleDelete(lead.id)}
                              title="Delete"
                            >
                              <span className="mr-2">🗑️</span> Delete
                            </button>
                          </div>
                        )}
                      </div>
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

export default Leads;