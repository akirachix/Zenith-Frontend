import { useEffect, useState } from 'react';
import { processDrainageData, submitDrainageData } from '../Utilis/drainage';
export const useDrainageData = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const processedData = await processDrainageData();
        setData(processedData);
      } catch (error: any) {
        setError(`Error fetching data: ${error.message}`);
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const submitData = async (payload: any) => {
    try {
      await submitDrainageData(payload);
    } catch (error: any) {
      console.error('Error submitting data:', error.message);
    }
  };
  return { data, loading, error, submitData };
};