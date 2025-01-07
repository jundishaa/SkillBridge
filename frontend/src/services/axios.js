import axios from 'axios';

// Create an axios instance with the base URL from .env
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Fallback to localhost if .env variable is missing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Include the token in the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses for centralized error handling
api.interceptors.response.use(
  (response) => {
    return response; // Pass through successful responses
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        console.error('Unauthorized access. Redirecting to login...');
        localStorage.removeItem('token'); // Clear the token
        window.location.href = '/login'; // Redirect to login
      } else if (status >= 400 && status < 500) {
        console.error(`Client error: ${data.message || 'Something went wrong'}`);
      } else if (status >= 500) {
        console.error('Server error. Please try again later.');
      }
    } else {
      console.error('Network error. Please check your connection.');
    }

    return Promise.reject(error); // Reject the error to be handled by the calling function
  }
);

export default api;

