


interface LoginCredentials {
  email: string;
  password: string;
 }
 
 
 const url = 'api/users/login'
 
 
 export async function loginUser({ email, password }: LoginCredentials) {
 try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
 
 
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }
 
 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
 } 