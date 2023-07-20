import { useState } from 'react';
import useApi from '../api';

const useVisitors = () => {
  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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
  };
};

export default useVisitors;
