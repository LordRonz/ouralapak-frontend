import { FaAdversal, FaFileInvoiceDollar, FaUser } from 'react-icons/fa';
import {
  FiAward,
  FiDollarSign,
  FiLink,
  FiTool,
  FiUsers,
  FiZap,
} from 'react-icons/fi';

const dataAdmin = [
  {
    section: '',
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
      {
        title: 'Akun Penjual',
        icon: <FaUser />,
        link: '/admin/user',
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
  {
    section: 'Master',
    content: [
      {
        title: 'Bank',
        icon: <FiDollarSign />,
        link: '/superadmin/bank',
      },
      {
        title: 'Binding Account',
        icon: <FiLink />,
        link: '/superadmin/binding-account',
      },
      {
        title: 'Config',
        icon: <FiTool />,
        link: '/superadmin/config',
      },
      {
        title: 'Emblem',
        icon: <FiAward />,
        link: '/superadmin/emblem',
      },
      {
        title: 'Hero',
        icon: <FiZap />,
        link: '/superadmin/hero',
      },
    ],
  },
];

export default dataAdmin;
