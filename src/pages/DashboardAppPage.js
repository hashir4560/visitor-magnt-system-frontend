import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// import PeopleIcon from '@mui/icons-material/People';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, CircularProgress } from '@mui/material';
// components
// sections
import { AppWidgetSummary, AppConversionRates } from '../sections/@dashboard/app';
import useStats from '../hooks/useStats';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const stats = useStats();

  useEffect(() => {
    stats.fetch();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | VMS </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi,Welcome Back
        </Typography>

        {stats.loading ? (
          <Stack direction="row" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress size={64} />
          </Stack>
        ) : (
          <Grid container spacing={12}>
            <Grid item xs={12} sm={8} md={6}>
              <AppWidgetSummary
                title="Current Visits"
                total={stats.data?.currentVisits}
                color="info"
                icon={'ant-design:peopleicon-filled'}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={6}>
              <AppWidgetSummary
                title="Past Visits"
                total={stats.data?.pastVisits}
                color="info"
                icon={'ant-design:peopleicon-filled'}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
