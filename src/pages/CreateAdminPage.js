import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { Card, Container, Stack, TextField, Typography } from '@mui/material';
import useNewAdmin from '../hooks/useNewAdmin';

export default function CreateAdminPage() {
  const { loading, error, form } = useNewAdmin();

  return (
    <>
      <Helmet>
        <title>Create Admin</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Admin
          </Typography>
        </Stack>

        <Card sx={{ maxWidth: 512 }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              name="first_name"
              id="first_name"
              label="First Name"
              value={form.values.first_name}
              error={form.touched.first_name && !!form.errors.first_name}
              helperText={form.touched.first_name && form.errors.first_name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />

            <TextField
              name="last_name"
              id="last_name"
              label="Last Name"
              value={form.values.last_name}
              error={form.touched.last_name && !!form.errors.last_name}
              helperText={form.touched.last_name && form.errors.last_name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />

            <TextField
              name="email"
              id="email"
              label="Email"
              value={form.values.email}
              error={form.touched.email && !!form.errors.email}
              helperText={form.touched.email && form.errors.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />

            <TextField
              name="password"
              id="password"
              label="Password"
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
              type="button"
              variant="contained"
              onClick={form.handleSubmit}
              loading={loading}
              disabled={loading}
            >
              Create Admin
            </LoadingButton>

            {error && <div>Error: {error}</div>}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
