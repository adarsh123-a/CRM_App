import React from 'react';
import { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('sales');

  const reportData = {
    sales: {
      title: 'Sales Report',
      description: 'Track your sales performance over time',
      metrics: [
        { name: 'Total Revenue', value: '$125,450', change: '+12%' },
        { name: 'Leads Converted', value: '142', change: '+8%' },
        { name: 'Avg. Deal Size', value: '$8,250', change: '+5%' },
        { name: 'Conversion Rate', value: '24.5%', change: '+3%' },
      ]
    },
    marketing: {
      title: 'Marketing Report',
      description: 'Analyze your marketing campaign performance',
      metrics: [
        { name: 'Leads Generated', value: '324', change: '+15%' },
        { name: 'Email Open Rate', value: '64.2%', change: '+7%' },
        { name: 'Click Through Rate', value: '12.8%', change: '+4%' },
        { name: 'Social Engagement', value: '2,451', change: '+22%' },
      ]
    },
    customer: {
      title: 'Customer Report',
      description: 'Understand your customer base and retention',
      metrics: [
        { name: 'Active Customers', value: '1,248', change: '+6%' },
        { name: 'Retention Rate', value: '87.5%', change: '+2%' },
        { name: 'Avg. Satisfaction', value: '4.6/5', change: '+0.2' },
        { name: 'Support Tickets', value: '42', change: '-18%' },
      ]
    }
  };

  const currentReport = reportData[reportType];

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Reports</h1>
      </header>
      <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">{currentReport.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{currentReport.description}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <label htmlFor="reportType" className="block mb-2 text-gray-700 dark:text-gray-300">Select Report Type:</label>
            <select 
              id="reportType" 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="sales">Sales Report</option>
              <option value="marketing">Marketing Report</option>
              <option value="customer">Customer Report</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {currentReport.metrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{metric.name}</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{metric.value}</p>
              <span className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded">{metric.change}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Performance Trend</h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded relative overflow-hidden">
              {/* In a real app, this would be a chart component */}
              <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] opacity-20"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Reports;