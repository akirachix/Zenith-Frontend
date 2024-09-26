import { NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL || 'https://aquasense-e472a26d7581.herokuapp.com/api/datamonitoring/';
export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/datamonitoring/`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch water level and water pressure' },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received POST data:', body);
    return NextResponse.json({ message: 'Data received successfully', data: body }, { status: 201 });
  } catch (error) {
    console.error('Error processing POST data:', error);
    return NextResponse.json({ error: 'Failed to process POST data' }, { status: 500 });
  }
}