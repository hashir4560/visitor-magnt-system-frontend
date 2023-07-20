import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import useLogin from '../../../hooks/useLogin';
import { useAuth } from '../../../contexts/auth.context';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();
  const auth = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          id="email"
          label="Email address"
          value={login.form.values.email}
          error={!!login.form.errors.email}
          helperText={login.form.errors.email}
          onChange={login.form.handleChange('email')}
          onBlur={login.form.handleBlur('email')}
        />

        <TextField
          name="password"
          label="Password"
          value={login.form.values.password}
          error={!!login.form.errors.password}
          helperText={login.form.errors.password}
          onChange={login.form.handleChange('password')}
          onBlur={login.form.handleBlur('password')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="button"
        variant="contained"
        onClick={login.form.handleSubmit}
        loading={auth.data.loggingIn}
        disabled={auth.data.loggingIn}
      >
        Login
      </LoadingButton>
    </>
  );
}
