import { FaAdversal, FaFileInvoiceDollar } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';

const dataAdmin = [
  {
    section: 'Applications',
    content: [
      {
        title: 'Iklan',
        icon: <FaAdversal />,
        link: '/admin',
      },
      {
        title: 'Invoice',
        icon: <FaFileInvoiceDollar />,
        link: '/admin/invoice',
      },
    ],
  },
  // {
  //   section: 'Monitoring',
  //   content: [
  //     {
  //       title: 'Terminal',
  //       icon: <TerminalIcon />,
  //       link: '/admin/terminal',
  //     },
  //     {
  //       title: 'Recycle bin',
  //       icon: <RecycleBinIcon />,
  //       link: '/admin/recycle-bin',
  //     },
  //     {
  //       title: 'Servers',
  //       icon: <ServersIcon />,
  //       link: '/admin/servers',
  //     },
  //   ],
  // },
  // {
  //   section: 'Guides',
  //   content: [
  //     {
  //       title: 'Documentation',
  //       icon: <DocumentationIcon />,
  //       link: '/admin/documentation',
  //     },
  //   ],
  // },
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
