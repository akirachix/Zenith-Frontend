"use client"

import React from 'react';
import { useGetPerformance } from '../hooks/useGetPerfomaces'; 
import { PerformanceData } from '../Utils/fetchMap';


const Performance = () => {
    const { performanceData, loading, error } = useGetPerformance();

    const recentPerformanceData = performanceData?.slice(-4) || [];
    return (
        <div className="w-4/5 p-4 ml-40 mt-8 border border-black">
            <h2 className="text-xl mb-8 ml-4 font-serif">System Performance</h2>
            {loading && <div>Loading performance data...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                    <tr className='font-serif'>
                        <th className="py-2 px-4 border-b text-left">Sensor ID</th>
                        <th className="py-2 px-4 border-b text-left">Address</th>
                        <th className="py-2 px-4 border-b text-left">Latitude</th>
                        <th className="py-2 px-4 border-b text-left">Longitude</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                        
                    </tr>
                </thead>
                <tbody className='font-serif'>
                    {recentPerformanceData.map((sensor) => (
                        <tr key={sensor.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{sensor.id}</td>
                            <td className="py-2 px-4 border-b">{sensor.address}</td>
                            <td className="py-2 px-4 border-b">{sensor.latitude}</td>
                            <td className="py-2 px-4 border-b">{sensor.longitude}</td>
                            <td className="py-2 px-4 border-b">{sensor.status}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Performance;
