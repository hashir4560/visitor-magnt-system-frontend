import { toast } from 'react-toastify';
import { useState } from 'react';
import useApi from '../api';

const useVisitors = () => {
  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const deleteVisitors = (ids = []) => {
    setDeleting(false);
    api
      .deleteVisitors({ids})
      .then(() => {
        toast('Deleted visitor(s)', { type: 'success' });
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
      .getVisitors()
      .then((res) => {
        setData(res.data.visitors);
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
    deleting,
    deleteVisitors,
  };
};

export default useVisitors;
