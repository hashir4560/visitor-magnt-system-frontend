import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../contexts/auth.context';

const useLogin = () => {
  const auth = useAuth();

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required').email('Invalid email format'),
      password: Yup.string().required('Password is required'),
    }),

    onSubmit: (values) => {
      auth.login(values);
    },
  });

  return {
    form,
  };
};

export default useLogin;
