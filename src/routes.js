import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import NewUserPage from './pages/NewUserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { useAuth } from './contexts/auth.context';
import DepartmentPage from './pages/DepartmentPage';
import NewDepartmentPage from './pages/NewDepartmentPage';

// ----------------------------------------------------------------------

export default function Router() {
  const auth = useAuth();

  const loggedInRoutes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'visitor', element: <UserPage /> },
        { path: 'visitor/new', element: <NewUserPage /> },
        { path: 'department', element: <DepartmentPage /> },
        { path: 'department/new', element: <NewDepartmentPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/dashboard/app" /> },
      ],
    },
  ]);

  const loggedOutRoutes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return auth.data.authenticating ? null : auth.data.loggedIn ? loggedInRoutes : loggedOutRoutes;
}
