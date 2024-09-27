"use client";
import React, { useEffect, useState } from "react";
import { useGetPerformance } from "@/app/hooks/useGetPerfomaces";
import { PerformanceData } from "@/app/Utils/fetchMap";

const Performance = () => {
  const { performanceData, loading, error } = useGetPerformance();
  const [allPerformanceData, setAllPerformanceData] = useState<PerformanceData[]>([]);
  const [recentPerformanceData, setRecentPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    if (performanceData && performanceData.length > 0) {
      setAllPerformanceData((prevData) => {
        
        const existingIds = new Set(prevData.map(item => item.id));
        const newData = performanceData.filter(item => !existingIds.has(item));
        return [...prevData, ...newData];
      });
    }
  }, [performanceData]);

  useEffect(() => {
    
    if (allPerformanceData.length > 0) {
      const sortedData = [...allPerformanceData]
        .sort((a, b) => b.id - a.id) 
        .slice(0, 4); 
      setRecentPerformanceData(sortedData);
    }
  }, [allPerformanceData]);
return (
    <div className="xl:w-11/12 p-4 ml-12 mt-8 border border-black nesthubmax:mt-96 nesthubmax:w-96">
      {loading && <div>Loading performance data...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && recentPerformanceData.length > 0 && (
        <table className="min-w-full bg-white rounded-lg shadow h-6 nesthubmax:w-6">
          <thead>
            <tr className="font-serif">
              <th className="py-2 px-4 border-b text-left">Sensor ID</th>
              <th className="py-2 px-4 border-b text-left">Address</th>
              <th className="py-2 px-4 border-b text-left">Latitude</th>
              <th className="py-2 px-4 border-b text-left">Longitude</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody className="font-serif">
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
      )}
    </div>
  );
};

export default Performance;
