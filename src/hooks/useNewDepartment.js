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
          alert('Department created');
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
    form,
  };
};

export default useNewDepartment;
