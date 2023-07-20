import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

const useApi = () => {
  const getVisitors = () => {
    return apiInstance.get('/visitor');
  };

  return {
    getVisitors,
  };
};

export default useApi;
