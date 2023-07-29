import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { Card, Container, Stack, TextField, Typography } from '@mui/material';
import useNewVisits from '../hooks/useNewVisits';

export default function NewDepartmentPage() {
  const newVisits = useNewVisits();
  return (
    <>
      <Helmet>
        <title> New Visit</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Visit
          </Typography>
        </Stack>

        <Card sx={{ maxWidth: 512 }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              name="visitorid"
              id="visitorid"
              label="Visitor ID"
              value={newVisits.form.values.visitor_id}
              error={!!newVisits.form.errors.visitor_id}
              helperText={newVisits.form.errors.visitor_id}
              onChange={newVisits.form.handleChange('visitor_id')}
              onBlur={newVisits.form.handleBlur('visitor_id')}
            />

            <TextField
              name="purpose"
              id="purpose"
              label="Purpose"
              value={newVisits.form.values.purpose}
              error={!!newVisits.form.errors.purpose}
              helperText={newVisits.form.errors.purpose}
              onChange={newVisits.form.handleChange('purpose')}
              onBlur={newVisits.form.handleBlur('purpose')}
            />

            <TextField
              name="deptid"
              id="deptid"
              label="Department ID"
              value={newVisits.form.values.dept_id}
              error={!!newVisits.form.errors.dept_id}
              helperText={newVisits.form.errors.dept_id}
              onChange={newVisits.form.handleChange('dept_id')}
              onBlur={newVisits.form.handleBlur('dept_id')}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="button"
              variant="contained"
              onClick={newVisits.form.handleSubmit}
              loading={newVisits.loading}
              disabled={newVisits.loading}
            >
              + Add
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
