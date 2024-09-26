"use client"
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDrainageData } from '../hooks/useData';
const Dashboard = () => {
  const { data, loading, error } = useDrainageData();
  const processBarChartData = (data: any[]) => {
    return data.slice(-4).map((item: any) => ({
      name: item.location,
      value: item.water_level
    }));
  };
  const processLineChartData = (data: any[]) => {
    return data.map((item: any) => ({
      name: new Date(item.timestamp).toLocaleDateString(),
      waterLevel: item.water_level,
      waterPressure: item.water_pressure
    }));
  };
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  const barChartData = processBarChartData(data);
  const lineChartData = processLineChartData(data);
  return (
    <div className="flex h-screen bg-white  ">
      <div className="flex-1 p-10 ml-[20%]">
        <header className="flex justify-between items-center mb-8">
          <div className="relative">
          </div>
          <div className="flex items-center ">
            <button className="mr-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <button>
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
          </div>
        </header>
        <main>
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-500 ml-12">Overview</h2>
          <div className="grid grid-cols-2">
            <div className="mt-20 ">
              <h3 className="text-lg font-semibold mb-4 text-center">Water Level and Pressure</h3>
              <ResponsiveContainer width="180%" height={400}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="waterLevel" stroke="#3B82F6" />
                  <Line type="monotone" dataKey="waterPressure" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;