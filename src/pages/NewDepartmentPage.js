import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { Card, Container, Stack, TextField, Typography } from '@mui/material';
import useNewDepartment from '../hooks/useNewDepartment';

export default function NewDepartmentPage() {
  const newDepartment = useNewDepartment();

  return (
    <>
      <Helmet>
        <title>Add New Department</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add New Department
          </Typography>
        </Stack>

        <Card sx={{ maxWidth: 512 }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              name="name"
              id="name"
              label="Name"
              value={newDepartment.form.values.name}
              error={!!newDepartment.form.errors.name}
              helperText={newDepartment.form.errors.name}
              onChange={newDepartment.form.handleChange('name')}
              onBlur={newDepartment.form.handleBlur('name')}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="button"
              variant="contained"
              onClick={newDepartment.form.handleSubmit}
              loading={newDepartment.loading}
              disabled={newDepartment.loading}
            >
              + Add
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
