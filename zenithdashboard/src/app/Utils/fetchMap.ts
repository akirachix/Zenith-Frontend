export interface PerformanceData {
    id: number;
    system_performance: string; 
    date_of_record: string;
    status: string;
    latitude?: number; 
    longitude?: number; 
}

export const fetchPerformance = async (): Promise<PerformanceData[]> => {
    try {
        const response = await fetch('/api/get_performance', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch performance data. Status: ${response.status} - ${response.statusText}`);
        }

        const data: PerformanceData[] = await response.json();

        console.log('Fetched performance data:', data);

        const enrichedData = await Promise.all(data.map(async (item) => {
            try {
                const coordinates = await fetchCoordinates(item.system_performance);
                return {
                    ...item,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                };
            } catch (coordError) {
                console.error(`Error fetching coordinates for ${item.system_performance}:`, coordError);
                return item;
            }
        }));

        return enrichedData; 
    } catch (error) {
        console.error('Error fetching performance data:', error instanceof Error ? error.message : error);
        throw error;
    }
};
async function fetchCoordinates(systemPerformance: string): Promise<{ latitude: number; longitude: number }> {
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
}
