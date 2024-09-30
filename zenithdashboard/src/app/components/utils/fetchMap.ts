import { useEffect, useState } from 'react';

// Function to fetch coordinates from an API based on system performance
const fetchCoordinates = async (systemPerformance: string) => {
  try {
    // Replace the URL with your actual API endpoint
    const response = await fetch(`/api/coordinates?performance=${systemPerformance}`);
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }

    const data = await response.json();
    // Assuming the API response contains latitude and longitude
    return {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error; // Rethrow the error so it can be caught in the calling function
  }
};

// Custom hook to get map data based on system performance
export const useGetMapData = (systemPerformance: string) => {
  const [mapData, setMapData] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMapData = async () => {
      try {
        const coordinates = await fetchCoordinates(systemPerformance);
        console.log('Map data fetched:', coordinates);
        setMapData(coordinates);
      } catch (err: any) {
        console.error('Error fetching map data:', err);
        setError(err.message || 'Failed to fetch map data');
      } finally {
        setLoading(false);
      }
    };

    if (systemPerformance) {
      getMapData();
    }
  }, [systemPerformance]);

  return { mapData, loading, error };
};
