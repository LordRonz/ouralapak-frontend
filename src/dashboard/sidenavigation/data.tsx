import { FiUsers } from 'react-icons/fi';

import ContactIcon from '@/dashboard/sidenavigation/icons/contact';
import DocumentationIcon from '@/dashboard/sidenavigation/icons/documentation';
import HomeIcon from '@/dashboard/sidenavigation/icons/home';
import MediasIcon from '@/dashboard/sidenavigation/icons/medias';
import RecycleBinIcon from '@/dashboard/sidenavigation/icons/recycle-bin';
import ServersIcon from '@/dashboard/sidenavigation/icons/servers';
import TerminalIcon from '@/dashboard/sidenavigation/icons/terminal';

const dataAdmin = [
  {
    section: 'Applications',
    content: [
      {
        title: 'Users',
        icon: <HomeIcon />,
        link: '/',
      },
      {
        title: 'Medias',
        icon: <MediasIcon />,
        link: '/admin/medias',
      },
      {
        title: 'Contacts',
        icon: <ContactIcon />,
        link: '/admin/contacts',
      },
    ],
  },
  {
    section: 'Monitoring',
    content: [
      {
        title: 'Terminal',
        icon: <TerminalIcon />,
        link: '/admin/terminal',
      },
      {
        title: 'Recycle bin',
        icon: <RecycleBinIcon />,
        link: '/admin/recycle-bin',
      },
      {
        title: 'Servers',
        icon: <ServersIcon />,
        link: '/admin/servers',
      },
    ],
  },
  {
    section: 'Guides',
    content: [
      {
        title: 'Documentation',
        icon: <DocumentationIcon />,
        link: '/admin/documentation',
      },
    ],
  },
];

export const dataSuperAdmin = [
  {
    section: 'User',
    content: [
      {
        title: 'Admin',
        icon: <FiUsers />,
        link: '/superadmin',
      },
    ],
  },
];

export default dataAdmin;
