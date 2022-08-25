import axios from 'axios';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FiEdit2, FiSearch } from 'react-icons/fi';
import { Column } from 'react-table';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import AnimatePage from '@/components/AnimatePage';
import Button from '@/components/buttons/Button';
import PaginationComponent from '@/components/Common/Pagination';
import ButtonLink from '@/components/links/ButtonLink';
import ReactTable from '@/components/ReactTable';
import Seo from '@/components/Seo';
import TableSearch from '@/components/TableSearch';
import Tooltip from '@/components/Tooltip';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import toastPromiseError from '@/lib/toastPromiseError';
import Pagination from '@/types/pagination';
import User from '@/types/user';

const MySwal = withReactContent(Swal);

const IndexPage = () => {
  const { theme } = useTheme();

  const [updBtnDisabled, setUpdBtnDisabled] = React.useState(false);
  const [mounted, setMounted] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [filter, setFilter] = useState<string>();
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: users, mutate } = useSWR<{
    data: {
      data: User[];
      pagination: Pagination;
    };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/admin/user`,
          query: {
            page: curPage + 1,
            ...(filter && { search: filter }),
            orderBy: 'created_at',
            orderDir: 'DESC',
          },
        })
      : null
  );

  const onClickUpdate = React.useCallback(
    async (user: User) => {
      const { isConfirmed } = await MySwal.fire({
        title: `Yakin ingin ubah status user dari ${
          user.is_verified ? 'terverifikasi' : 'belum diverifikasi'
        } jadi ${user.is_verified ? 'belum diverifikasi' : 'terverifikasi'}?`,
        text: 'Tindakan ini bisa diubah nantinya!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update',
        ...mySwalOpts(theme),
      });

      const payload = {
        is_verified: Number(!user.is_verified),
      };

      if (isConfirmed) {
        toast.promise(axios.put(`${API_URL}/admin/user/${user.id}`, payload), {
          pending: {
            render: () => {
              setUpdBtnDisabled(true);
              return 'Loading';
            },
          },
          success: {
            render: () => {
              setUpdBtnDisabled(false);
              mutate();
              return 'Berhasil update user!';
            },
          },
          error: {
            render: toastPromiseError(() => {
              setUpdBtnDisabled(false);
            }, 'Gagal update user!'),
          },
        });
      }
    },
    [mutate, theme]
  );

  const data = React.useMemo(
    () =>
      users?.data.data.map((user) => {
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          noHp: user.phone,
          status: user.is_verified ? 'Verified' : 'Unverified',
          blacklist: user.is_blacklist,
          active: user.is_active,
          igUsername: user.ig_username,
          name: user.name,
          action: {},
          user,
        };
      }) ?? [],
    [users?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'No. HP',
        accessor: 'noHp',
      },
      {
        Header: 'Status',
        accessor: 'status', // accessor is the "key" in the data
      },
      {
        Header: 'Aksi',
        accessor: 'action',
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
            <Tooltip interactive={false} content='Lihat'>
              <ButtonLink
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-green-500 hover:text-green-600'
                href={`/admin/user/${row.original.id}`}
              >
                <FiSearch />
              </ButtonLink>
            </Tooltip>
            <Tooltip interactive={false} content='Edit'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
                onClick={() => onClickUpdate(row.original.user)}
                disabled={updBtnDisabled}
              >
                <FiEdit2 />
              </Button>
            </Tooltip>
          </>
        ),
      },
    ],
    [updBtnDisabled, onClickUpdate, theme]
  );

  return (
    <>
      <Seo templateTitle='Admin | Invoice' />
      <AnimatePage>
        <DashboardLayout>
          <TableSearch
            setFilter={(s: string) => {
              setCurPage(0);
              setFilter(s);
            }}
          />
          {users && (
            <ReactTable data={data} columns={columns} withFooter={false} />
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
              pageCount={users?.data.pagination.lastPage ?? 1}
              onPageChange={({ selected }) => setCurPage(selected)}
            />
          </div>
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
