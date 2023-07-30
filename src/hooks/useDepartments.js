import { toast } from 'react-toastify';
import { useState } from 'react';
import useApi from '../api';

const useDepartments = () => {
  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const deleteDepartments = (ids = []) => {
    setDeleting(false);
    api
      .deleteDepartments({ ids })
      .then(() => {
        toast('Deleted department(s)', { type: 'success' });
        fetch();
      })
      .catch((err) => {
        const message = err?.response?.data?.message || 'Something went wrong';
        toast(message, { type: 'error' });
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const fetch = () => {
    setLoading(true);
    api
      .getDepartments()
      .then((res) => {
        setData(res.data.department);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // eslint-disable-next-line
  const deleteDepartment = (dept_id) => {
    setLoading(true);
    api
      .deleteDepartments(dept_id)
      .then(() => {
        // eslint-disable-next-line
        setData((prevData) => prevData.filter((department) => department.id !== dept_id));
      })
      .catch((err) => {
        setError(err?.response?.data?.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    data,
    fetch,
    deleteDepartment,
    deleting,
    deleteDepartments,
  };
};

export default useDepartments;
