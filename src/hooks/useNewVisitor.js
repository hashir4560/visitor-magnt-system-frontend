import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useApi from '../api';

const useNewVisitor = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useFormik({
    initialValues: {
      cnic: '',
      phone: '',
      name: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required').email('Invalid email'),
      phone: Yup.string().required('Phone is required').matches(/^\d+$/, { message: 'Invalid phone' }),
      cnic: Yup.string().required('CNIC is required').matches(/^\d+$/, { message: 'Invalid CNIC' }),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError(null);
      api
        .createVisitor(values)
        .then((res) => {
          toast('Vistor Created', { type: 'success' });
          navigate('/visitor-magnt-system-frontend/dashboard/visitor');
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

export default useNewVisitor;
