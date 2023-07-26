import { useState } from 'react';
import useApi from '../api';

function useVisits() {
  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [checkingoutid, setcheckingoutid] = useState(null);

  const fetch = () => {
    setLoading(true);
    api
      .getVisits()
      .then((res) => {
        setData(res.data.visits); // Assuming the API returns an array of visits
      })
      .catch((err) => {
        setError(err?.response?.data?.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const checkout = (id) => {
    setcheckingoutid(id);
    api
      .checkout(id)
      .then((res) => {
        setData((data) => {
          const idx = data.findIndex((visit) => visit.id === id);
          data.splice(idx, 1);
          return data;
        });
      })
      .catch(console.log)
      .finally(() => {
        setcheckingoutid(null);
      });
  };

  return {
    loading,
    error,
    data,
    fetch,
    checkout,
    checkingoutid,
  };
}

export default useVisits;
