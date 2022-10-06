import {
  FaAdversal,
  FaFileInvoiceDollar,
  FaHome,
  FaUser,
} from 'react-icons/fa';
import {
  FiAward,
  FiDollarSign,
  FiLink,
  FiSmartphone,
  FiTool,
  FiUsers,
  FiZap,
} from 'react-icons/fi';

const dataAdmin = [
  {
    section: '',
    content: [
      {
        title: 'Dashboards',
        icon: <FaHome />,
        link: '/admin',
      },
      {
        title: 'Iklan',
        icon: <FaAdversal />,
        link: '/admin/iklan',
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
    section: '',
    content: [
      {
        title: 'Dashboards',
        icon: <FaHome />,
        link: '/admin',
      },
      {
        title: 'Iklan',
        icon: <FaAdversal />,
        link: '/admin/iklan',
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
  {
    section: 'User',
    content: [
      {
        title: 'Admin',
        icon: <FiUsers />,
        link: '/admin/admin',
      },
    ],
  },
  {
    section: 'Master',
    content: [
      {
        title: 'Bank',
        icon: <FiDollarSign />,
        link: '/admin/bank',
      },
      {
        title: 'Binding Account',
        icon: <FiLink />,
        link: '/admin/binding-account',
      },
      {
        title: 'Config',
        icon: <FiTool />,
        link: '/admin/config',
      },
      {
        title: 'Emblem',
        icon: <FiAward />,
        link: '/admin/emblem',
      },
      {
        title: 'Fee Admin',
        icon: <></>,
        link: '/admin/fee-admin',
      },
      {
        title: 'Fee Rekber',
        icon: <></>,
        link: '/admin/fee-rekber',
      },
      {
        title: 'Hero',
        icon: <FiZap />,
        link: '/admin/hero',
      },
      {
        title: 'Package Iklan',
        icon: <></>,
        link: '/admin/package-iklan',
      },
      {
        title: 'Platform',
        icon: <FiSmartphone />,
        link: '/admin/platform',
      },
      {
        title: 'Refund',
        icon: <></>,
        link: '/admin/refund',
      },
      {
        title: 'Message Template',
        icon: <></>,
        link: '/admin/message-template',
      },
    ],
  },
];

export default dataAdmin;
