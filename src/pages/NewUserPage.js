import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { Card, Container, Stack, TextField, Typography } from '@mui/material';
import useNewVisitor from '../hooks/useNewVisitor';

export default function NewDepartmentPage() {
  const newVisitor = useNewVisitor();

  return (
    <>
      <Helmet>
        <title>Add New Visitor</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add New Visitor
          </Typography>
        </Stack>

        <Card sx={{ maxWidth: 512 }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              name="name"
              id="name"
              label="Name"
              value={newVisitor.form.values.name}
              error={!!newVisitor.form.errors.name}
              helperText={newVisitor.form.errors.name}
              onChange={newVisitor.form.handleChange('name')}
              onBlur={newVisitor.form.handleBlur('name')}
            />
            <TextField
              name="cnic"
              id="cnic"
              label="CNIC"
              value={newVisitor.form.values.cnic}
              error={!!newVisitor.form.errors.cnic}
              helperText={newVisitor.form.errors.cnic}
              onChange={newVisitor.form.handleChange('cnic')}
              onBlur={newVisitor.form.handleBlur('cnic')}
            />
            <TextField
              name="phone"
              id="phone"
              label="Phone"
              value={newVisitor.form.values.phone}
              error={!!newVisitor.form.errors.phone}
              helperText={newVisitor.form.errors.phone}
              onChange={newVisitor.form.handleChange('phone')}
              onBlur={newVisitor.form.handleBlur('phone')}
            />
            <TextField
              name="email"
              id="email"
              label="E-mail"
              value={newVisitor.form.values.email}
              error={!!newVisitor.form.errors.email}
              helperText={newVisitor.form.errors.email}
              onChange={newVisitor.form.handleChange('email')}
              onBlur={newVisitor.form.handleBlur('email')}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="button"
              variant="contained"
              onClick={newVisitor.form.handleSubmit}
              loading={newVisitor.loading}
              disabled={newVisitor.loading}
            >
              + Add
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
