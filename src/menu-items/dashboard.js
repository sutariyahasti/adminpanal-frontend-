// assets
import { IconUser } from '@tabler/icons-react';
import { IconDashboard } from '@tabler/icons-react';
import { IconFolder } from '@tabler/icons-react';


// constant
const icons = { IconDashboard ,IconUser ,IconFolder };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'user',
      title: 'User',
      type: 'item',
      url: '/dashboard/user',
      icon: icons.IconUser ,
      breadcrumbs: false
    },
    {
    id: 'project',
    title: 'Project',
    type: 'item',
    url: '/dashboard/project',
    icon: icons.IconFolder ,
    breadcrumbs: false
  }
  ]
};

export default dashboard;
