import axios from 'axios';

// Create an api client (instance) with the base URL
const apiInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

// Attach the authorization header with each request if token exists
apiInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, console.log);

// A custom hook called to consume the api requests
const useApi = () => {
  const getVisitors = () => {
    return apiInstance.get('/visitor');
  };

  const login = ({ email, password }) => {
    return apiInstance.post('/auth/login', { email, password });
  };

  const me = () => {
    return apiInstance.get('/auth/me');
  };

  return {
    getVisitors,
    login,
    me,
  };
};

export default useApi;
