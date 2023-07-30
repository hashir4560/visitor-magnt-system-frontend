import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useApi from '../api';

const useNewDepartment = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // Add the message state

  const form = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError(null);
      api
        .createDepartment(values)
        .then((res) => {
          setMessage('Department created'); // Set the success message
          setLoading(false);
          navigate('/dashboard/department');
        })
        .catch((err) => {
          const message = err?.response?.data?.message || 'Something went wrong';
          setError(message);
        });
    },
  });

  return {
    loading,
    error,
    message, // Add the message to the returned object
    form,
  };
};

export default useNewDepartment;
