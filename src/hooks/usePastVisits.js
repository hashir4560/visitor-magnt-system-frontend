import { useState } from 'react';
import useApi from '../api';

function usePastVisits() {
  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    api
      .getPastVisits()
      .then((res) => {
        setData(res.data.Pastvisits);
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
}

export default usePastVisits;
