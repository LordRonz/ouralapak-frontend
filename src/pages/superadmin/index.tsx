import { useTheme } from 'next-themes';
import * as React from 'react';
import { FiCheckCircle, FiLock, FiTrash2, FiXCircle } from 'react-icons/fi';
import { Column } from 'react-table';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Button from '@/components/buttons/Button';
import ReactTable from '@/components/ReactTable';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import clsxm from '@/lib/clsxm';

const MySwal = withReactContent(Swal);

const IndexPage = () => {
  const { theme } = useTheme();

  const onClickDelete = React.useCallback(() => {
    MySwal.fire({
      title: 'Yakin ingin hapus user ini?',
      text: 'Tindakan ini tidak bisa dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      ...mySwalOpts(theme),
    });
  }, [theme]);

  const onClickResetPassword = React.useCallback(() => {
    MySwal.fire({
      title: 'Yakin ingin reset password user ini?',
      text: 'Tindakan ini tidak bisa dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reset',
      ...mySwalOpts(theme),
    });
  }, [theme]);

  const data = React.useMemo(
    () => [
      {
        username: 'Bruh',
        email: 'World',
        delete: {},
        verify: {
          isVerified: true,
        },
        resetPassword: {},
      },
      {
        username: 'react-table',
        email: 'rocks',
        delete: {},
        verify: {
          isVerified: true,
        },
        resetPassword: {},
      },
      {
        username: 'whatever',
        email: 'you want',
        delete: {},
        verify: {
          isVerified: false,
        },
        resetPassword: {},
      },
    ],
    []
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Username',
        accessor: 'username', // accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        accessor: 'delete',
        Header: 'Delete',
        Cell: () => (
          <Button
            variant='light'
            className='text-red-500 hover:text-red-600'
            onClick={() => onClickDelete()}
          >
            <FiTrash2 />
          </Button>
        ),
      },
      {
        accessor: 'verify',
        Header: 'Toggle Verifikasi',
        Cell: ({ cell }) => (
          <Button
            variant='light'
            className={clsxm(
              cell.value.isVerified && 'text-red-500 hover:text-red-600',
              !cell.value.isVerified && 'text-green-500 hover:text-green-600'
            )}
          >
            {cell.value.isVerified ? <FiXCircle /> : <FiCheckCircle />}
          </Button>
        ),
      },
      {
        accessor: 'resetPassword',
        Header: 'Reset password',
        Cell: () => (
          <Button
            variant='light'
            className='text-yellow-500 hover:text-yellow-600'
            onClick={() => onClickResetPassword()}
          >
            <FiLock />
          </Button>
        ),
      },
    ],
    [onClickDelete, onClickResetPassword]
  );

  return (
    <DashboardLayout superAdmin>
      <ReactTable data={data} columns={columns} pageCount={69} />
    </DashboardLayout>
  );
};

export default IndexPage;
