import { toast } from 'react-toastify';
import { createContext, useContext, useEffect, useState } from 'react';
import useApi from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const api = useApi();

  const [user, setUser] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [authenticating, setAuthenticating] = useState(true);

  // Login handler
  const login = ({ email, password }) => {
    setLoggingIn(true);
    setUser(null);
    setLoggedIn(false);
    setError(null);
    setAuthenticating(false);

    api
      .login({ email, password })
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        toast('Logged in successfully', { type: 'success' });
        setLoggedIn(true);
        setUser(user);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || 'Something went wrong';
        toast(message, { type: 'error' });
        setError(message);
        setLoggedIn(false);
      })
      .finally(() => {
        setLoggingIn(false);
      });
  };

  // Authenticate from token
  const authenticate = () => {
    setAuthenticating(true);
    setUser(null);
    setLoggingIn(false);
    setError(null);
    setLoggedIn(false);

    api
      .me()
      .then((res) => {
        const { user } = res.data;
        setLoggedIn(true);
        setUser(user);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || 'Something went wrong';
        setError(message);
        setLoggedIn(false);
      })
      .finally(() => {
        setAuthenticating(false);
      });
  };

  const logout = () => {
    setAuthenticating(false);
    setUser(null);
    setLoggingIn(false);
    setError(null);
    setLoggedIn(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data: {
          user,
          loggingIn,
          loggedIn,
          error,
          authenticating,
        },
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
