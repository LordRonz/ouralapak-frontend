import * as React from 'react';
import { Column } from 'react-table';

import ReactTable from '@/components/ReactTable';
import DashboardLayout from '@/dashboard/layout';

const IndexPage = () => {
  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
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
