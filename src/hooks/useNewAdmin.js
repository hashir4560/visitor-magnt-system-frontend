import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useApi from '../api';

const useNewAdmin = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().required('Password is required'),
  });

  const form = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setError(null);
      api
        .createAdmin(values)
        .then((res) => {
          toast('Admin created', { type: 'success' });
          navigate('/visitor-magnt-system-frontend/dashboard/app');
        })
        .catch((err) => {
          const message = err?.response?.data?.message || 'Something went wrong';
          toast(message, { type: 'error' });
          setError(message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return {
    loading,
    error,
    form,
  };
};

export default useNewAdmin;
