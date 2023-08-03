// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={require(`../../../assets/icons/navbar/${name}.svg`)} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/visitor-magnt-system-frontend/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'visitors',
    path: '/visitor-magnt-system-frontend/dashboard/visitor',
    icon: icon('ic_user'),
  },
  {
    title: 'departments',
    path: '/visitor-magnt-system-frontend/dashboard/department',
    icon: icon('ic_user'),
  },
  {
    title: 'Current Visits',
    path: '/visitor-magnt-system-frontend/dashboard/visit/current',
    icon: icon('ic_user'),
  },
  {
    title: 'Past Visits',
    path: '/visitor-magnt-system-frontend/dashboard/visit/past',
    icon: icon('ic_user'),
  },
];

export default navConfig;
