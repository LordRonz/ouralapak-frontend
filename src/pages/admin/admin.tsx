import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FiCheck, FiLock, FiSearch, FiTrash, FiX } from 'react-icons/fi';
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
import customAxios from '@/lib/customAxios';
import toastPromiseError from '@/lib/toastPromiseError';
import Pagination from '@/types/pagination';
import User from '@/types/user';

const MySwal = withReactContent(Swal);

const IndexPage = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [updBtnDisabled, setUpdBtnDisabled] = useState(false);

  const [curPage, setCurPage] = useState(0);

  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const {
    data: admins,
    error,
    mutate,
  } = useSWR<{
    data: {
      data: User[];
      pagination: Pagination;
    };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/superuser/config-admin`,
          query: {
            page: curPage + 1,
            ...(filter && { search: filter }),
            orderBy: 'created_at',
            orderDir: 'DESC',
          },
        })
      : null
  );

  const onClickVerify = React.useCallback(
    async (user: User) => {
      const { isConfirmed } = await MySwal.fire({
        title: `Yakin ingin ubah status admin dari ${
          user.is_active ? 'aktif' : 'nonaktif'
        } jadi ${user.is_active ? 'nonaktif' : 'aktif'}?`,
        text: 'Tindakan ini bisa diubah nantinya!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update',
        ...mySwalOpts(theme),
      });

      const payload = {
        is_active: Number(!user.is_active),
      };

      if (isConfirmed) {
        toast.promise(
          customAxios.put(
            `${API_URL}/superuser/config-admin/${user.id}`,
            payload
          ),
          {
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
                return 'Berhasil update admin!';
              },
            },
            error: {
              render: toastPromiseError(undefined, 'Gagal update admin!'),
            },
          }
        );
      }
    },
    [mutate, theme]
  );

  const onClickDelete = React.useCallback(
    async (id: number) => {
      const { isConfirmed } = await MySwal.fire({
        title: 'Yakin ingin hapus user ini?',
        text: 'Tindakan ini tidak bisa dibatalkan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        ...mySwalOpts(theme),
      });

      if (isConfirmed) {
        toast.promise(
          customAxios.delete(`${API_URL}/superuser/config-admin/${id}`),
          {
            pending: {
              render: () => {
                return 'Loading';
              },
            },
            success: {
              render: () => {
                mutate();
                return 'Berhasil hapus admin!';
              },
            },
            error: {
              render: toastPromiseError(undefined, 'Gagal hapus admin!'),
            },
          }
        );
      }
    },
    [mutate, theme]
  );

  const onClickResetPassword = React.useCallback(
    async (id: number) => {
      const { value: password, isConfirmed } = await MySwal.fire<string>({
        title: 'Yakin ingin reset password user ini?',
        icon: 'warning',
        input: 'password',
        inputLabel: 'Password baru',
        inputPlaceholder: 'Masukkan password',
        inputValidator: (value) => {
          if (!value) {
            return 'Password tidak boleh kosong!';
          } else if (value.length < 8) {
            return 'Password tidak boleh kurang dari 8 karakter!';
          }
          return null;
        },
        showCancelButton: true,
        confirmButtonText: 'Reset',
        ...mySwalOpts(theme),
      });

      if (isConfirmed && password) {
        toast.promise(
          customAxios.put(`${API_URL}/superuser/config-admin/${id}`, {
            password,
          }),
          {
            pending: {
              render: () => {
                return 'Loading';
              },
            },
            success: {
              render: () => {
                mutate();
                return 'Berhasil update admin!';
              },
            },
            error: {
              render: toastPromiseError(undefined, 'Gagal update admin!'),
            },
          }
        );
      }
    },
    [mutate, theme]
  );

  const data = React.useMemo(
    () =>
      admins?.data.data.map((admin) => {
        return {
          id: admin.id,
          email: admin.email,
          username: admin.username,
          noHp: admin.phone,
          status: admin.is_active ? 'Aktif' : 'Nonaktif',
          blacklist: admin.is_blacklist,
          active: admin.is_active,
          igUsername: admin.ig_username,
          name: admin.name,
          action: {},
          admin,
        };
      }) ?? [],
    [admins?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Nama',
        accessor: 'name',
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
            <Tooltip interactive={false} content='Toggle status'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
                onClick={() => onClickVerify(row.original.admin)}
                disabled={updBtnDisabled}
              >
                {row.original.admin.is_active ? <FiX /> : <FiCheck />}
              </Button>
            </Tooltip>
            <Tooltip interactive={false} content='Hapus'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
                onClick={() => onClickDelete(row.original.id)}
                disabled={updBtnDisabled}
              >
                <FiTrash />
              </Button>
            </Tooltip>
            <Tooltip interactive={false} content='Ganti Password'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
                onClick={() => onClickResetPassword(row.original.id)}
                disabled={updBtnDisabled}
              >
                <FiLock />
              </Button>
            </Tooltip>
          </>
        ),
      },
    ],
    [onClickDelete, onClickResetPassword, onClickVerify, theme, updBtnDisabled]
  );

  if (error) {
    router.push('/');
  }

  return (
    <>
      <Seo templateTitle='Admin | Invoice' />
      <AnimatePage>
        <DashboardLayout superAdmin>
          <TableSearch
            setFilter={(s: string) => {
              setCurPage(0);
              setFilter(s);
            }}
          />
          {admins && (
            <ReactTable data={data} columns={columns} withFooter={false} />
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
              pageCount={admins?.data.pagination.lastPage ?? 1}
              onPageChange={({ selected }) => setCurPage(selected)}
            />
          </div>
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
