import { useEffect, useState } from 'react';

const fetchCoordinates = async (systemPerformance: string): Promise<{ latitude: number; longitude: number }> => {
    try {
        const response = await fetch(`/api/get_coordinates?performance=${encodeURIComponent(systemPerformance)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch coordinates. Status: ${response.status} - ${response.statusText}`);
        }

        const coordinates = await response.json();
        if (typeof coordinates.latitude !== 'number' || typeof coordinates.longitude !== 'number') {
            throw new Error('Invalid coordinates data received');
        }
        return {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
        };
    } catch (error) {
        console.error('Error fetching coordinates:', error instanceof Error ? error.message : error);
        throw error;
    }
};

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
        
        if (systemPerformance){
            getMapData();
        }
    }, [systemPerformance]);

    return { mapData, loading, error };
};
