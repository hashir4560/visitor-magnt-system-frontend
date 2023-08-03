import axios from 'axios';

// Create an api client (instance) with the base URL
const apiInstance = axios.create({
  baseURL: 'https://visitrack-folio3.azurewebsites.net',
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

  const getDepartments = () => {
    return apiInstance.get('/department');
  };
  const deleteDepartment = () => {
    return apiInstance.delete('/department/:id');
  };
  const deleteDepartments = ({ ids = [] }) => {
    return apiInstance.post('/department/bulk-delete', { ids });
  };
  const getVisits = () => {
    return apiInstance.get('/visit');
  };
  const getPastVisits = () => {
    return apiInstance.get('/visit/past');
  };
  const checkout = (id) => {
    return apiInstance.put(`/visit/${id}/checkout`);
  };

  const login = ({ email, password }) => {
    return apiInstance.post('/auth/login', { email, password });
  };

  const me = () => {
    return apiInstance.get('/auth/me');
  };

  const createVisitor = ({ name, email, phone, cnic }) => {
    return apiInstance.post('/visitor', { name, email, phone, cnic });
  };

  const deleteVisitors = ({ ids = [] }) => {
    return apiInstance.post(`/visitor/bulk-delete`, { ids });
  };

  // eslint-disable-next-line camelcase
  const createAdmin = ({ first_name, last_name, email, password }) => {
    // eslint-disable-next-line camelcase
    return apiInstance.post('/admin', { first_name, last_name, email, password });
  };

  // eslint-disable-next-line
  const createVisits = ({ visitor_id, purpose, checkintime, dept_id }) => {
    // eslint-disable-next-line
    return apiInstance.post('/visit', { visitor_id, purpose, checkintime, dept_id });
  };
  const updatePassword = ({ email, oldPassword, password }) => {
    return apiInstance.put('/admin/password', { email, oldPassword, password });
  };

  const createDepartment = ({ name }) => {
    return apiInstance.post('/department', { name });
  };

  const getStats = () => {
    return apiInstance.get('/visit/stats');
  };
  return {
    getVisitors,
    login,
    me,
    createVisitor,
    createAdmin,
    getDepartments,
    deleteDepartment,
    deleteDepartments,
    createDepartment,
    getVisits,
    createVisits,
    getPastVisits,
    checkout,
    updatePassword,
    deleteVisitors,
    getStats,
  };
};

export default useApi;
