import { useState, useEffect } from "react";
import { fetchSensorData } from "../utils/utils";

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Ensure error is of type string or null

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSensorData();
        setSensorData(data);
      } catch (err) {
        // Type guard to check if the error is an instance of Error
        if (err instanceof Error) {
          setError(err.message); // Access the message safely
        } else {
          setError("An unknown error occurred"); // Fallback for unknown error types
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { sensorData, loading, error };
};
