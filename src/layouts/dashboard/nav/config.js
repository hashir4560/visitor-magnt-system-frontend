// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'visitors',
    path: '/dashboard/visitor',
    icon: icon('ic_user'),
  },
  {
    title: 'departments',
    path: '/dashboard/department',
    icon: icon('ic_user'),
  },
  {
    title: 'Current Visits',
    path: '/dashboard/visit/current',
    icon: icon('ic_user'),
  },
  {
    title: 'Past Visits',
    path: '/dashboard/visit/past',
    icon: icon('ic_user'),
  },
];

export default navConfig;
