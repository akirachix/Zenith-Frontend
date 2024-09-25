export async function GET(request: Request) {
    const baseUrl = process.env.BASE_URL;

  
    try {
      const response = await fetch('https://aquasense-e472a26d7581.herokuapp.com/api/devices/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
  
      const result = await response.json();
      return new Response(JSON.stringify(result), {
        status: 201,
        statusText: 'Devices Fetched Successful',
      });
    } catch (error) {
      return new Response((error as Error).message, {
        status: 500,
      });
    }
  }


  
