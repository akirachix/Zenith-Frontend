import { useState, useEffect } from 'react';

export const useGetPerformance = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('https://aquasense-e472a26d7581.herokuapp.com/api/devices/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); 

                console.log('Fetched data:', data);

                setPerformanceData(data); 
                setLoading(false);
            } catch (err) {
                console.error('Fetching data error:', err); 
                setError(`Error fetching data: ${err.message}`); 
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { performanceData, loading, error };
};
