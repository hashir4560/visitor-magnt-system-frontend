import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Card, Container, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import useApi from '../api';
import { useAuth } from '../contexts/auth.context';

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const api = useApi();
  const email = auth.data.user?.email;

  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required('Old Password is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError(null);
      api
        .updatePassword({
          email,
          oldPassword: values.oldPassword,
          password: values.password,
        })
        .then((res) => {
          toast('Password Changed', { type: 'success' });

          // eslint-disable-next-line no-undef
          navigate('/dashboard/app');
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
  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Change Password
          </Typography>
        </Stack>

        <Card sx={{ maxWidth: 512 }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              name="oldPassword"
              id="password"
              label="Old Password"
              type="password"
              value={form.values.oldPassword}
              error={form.touched.oldPassword && !!form.errors.oldPassword}
              helperText={form.touched.oldPassword && form.errors.oldPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <TextField
              name="password"
              id="password"
              label="New Password"
              type="password"
              value={form.values.password}
              error={form.touched.password && !!form.errors.password}
              helperText={form.touched.password && form.errors.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
              disabled={loading}
              onClick={form.handleSubmit}
            >
              Change Password
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
};
export default ChangePasswordPage;
