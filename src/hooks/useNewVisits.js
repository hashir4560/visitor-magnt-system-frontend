import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useApi from '../api';

const useNewVisits = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useFormik({
    initialValues: {
      visitor_id: '',
      purpose: '',
      dept_id: '',
    },
    validationSchema: Yup.object().shape({
      visitor_id: Yup.string().required('Visitor ID is required'),
      purpose: Yup.string().required('Purpose is required'),

      // .matches(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/, { message: ' Write in this format HH-MM-YYYY' }),
      //   checkouttime: Yup.string().required('Check-out time is required'),
      // .matches(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/, { message: 'Write in this format HH-MM-YYYY' }),
      dept_id: Yup.string().required('Department ID is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError(null);
      api
        .createVisits(values)
        .then((res) => {
          toast('Visit created', { type: 'success' });
          navigate('/visitor-magnt-system-frontend/dashboard/visit/current');
        })
        .catch((err) => {
          const message = err?.response?.data?.message || 'Something went wrong';
          toast(message, { type: 'error' });
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

export default useNewVisits;
