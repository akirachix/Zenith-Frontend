const url = 'https://aquasense-e472a26d7581.herokuapp.com/api/datamonitoring/';
export const processDrainageData = async () => {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error in fetching drainage systems:', error.message);
    throw error;
  }
};
export const submitDrainageData = async (payload: any) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit data: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error in submitting drainage data:', error.message);
    throw error;
  }
};