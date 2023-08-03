import { toast } from 'react-toastify';
import { useState } from 'react';
import useApi from '../api';

const useStats = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useApi();

  const fetch = () => {
    setLoading(true);
    api
      .getStats()
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || 'Something went wrong';
        toast(message, { type: 'error' });
        setError(error);
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
  };
};

export default useStats;
