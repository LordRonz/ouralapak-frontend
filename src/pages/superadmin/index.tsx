import * as React from 'react';
import { FiCheckCircle, FiLock, FiTrash2, FiXCircle } from 'react-icons/fi';
import { Column } from 'react-table';

import Button from '@/components/buttons/Button';
import ReactTable from '@/components/ReactTable';
import DashboardLayout from '@/dashboard/layout';
import clsxm from '@/lib/clsxm';

const IndexPage = () => {
  const data = React.useMemo(
    () => [
      {
        username: 'Bruh',
        col2: 'World',
        delete: {},
        verify: {
          isVerified: true,
        },
        resetPassword: {},
      },
      {
        username: 'react-table',
        col2: 'rocks',
        delete: {},
        verify: {
          isVerified: true,
        },
        resetPassword: {},
      },
      {
        username: 'whatever',
        col2: 'you want',
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
        Header: 'Column 2',
        accessor: 'col2',
      },
      {
        accessor: 'delete',
        Header: 'Delete',
        Cell: () => (
          <Button variant='light' className='text-red-500 hover:text-red-600'>
            <FiTrash2 />
          </Button>
        ),
      },
      {
        accessor: 'verify',
        Header: 'Nggatau',
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
          >
            <FiLock />
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <DashboardLayout superAdmin>
      <ReactTable data={data} columns={columns} />
    </DashboardLayout>
  );
};

export default IndexPage;
