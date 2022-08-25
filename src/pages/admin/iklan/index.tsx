import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi';
import Select, { SingleValue } from 'react-select';
import { Column } from 'react-table';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import AnimatePage from '@/components/AnimatePage';
import Button from '@/components/buttons/Button';
import ButtonGradient from '@/components/buttons/ButtonGradient';
import PaginationComponent from '@/components/Common/Pagination';
import ButtonLink from '@/components/links/ButtonLink';
import ReactTable from '@/components/ReactTable';
import Seo from '@/components/Seo';
import TableSearch from '@/components/TableSearch';
import Tooltip from '@/components/Tooltip';
import { maxEntriesOpts } from '@/constant/admin';
import { API_URL } from '@/constant/config';
import { customSelectStyles } from '@/constant/select';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import { clsxm } from '@/lib/clsxm';
import formatDateStrId from '@/lib/formatDateStrId';
import getStatusIklan, { statusIklanArray } from '@/lib/getStatusIklan';
import toastPromiseError from '@/lib/toastPromiseError';
import useAuthHeader from '@/services/authHeader';
import { IklanAdmin } from '@/types/iklan';
import type Pagination from '@/types/pagination';
import Refund from '@/types/refund';

const MySwal = withReactContent(Swal);

type IFormInput = {
  status?: number;
};

const IndexPage = () => {
  const { theme } = useTheme();

  const [delBtnDisabled, setDelBtnDisabled] = React.useState(false);

  const [iklan, setIklan] = useState<IklanAdmin>();

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [curPage, setCurPage] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>();

  const [maxPerPage, setMaxPerPage] = useState(10);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: iklans,
    error,
    mutate,
  } = useSWR<{
    data: {
      data: IklanAdmin[];
      pagination: Pagination;
    };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/admin/iklan`,
          query: {
            page: curPage + 1,
            ...(filter && { search: filter }),
            orderBy: 'created_at',
            orderDir: 'DESC',
            perPage: maxPerPage,
          },
        })
      : null
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(false);

  const headers = useAuthHeader();

  const statusIklanOpts = statusIklanArray;

  const onSubmit: SubmitHandler<IFormInput> = React.useCallback(
    async (data) => {
      if (!headers.Authorization || iklan?.id === undefined) {
        return;
      }
      await toast.promise(
        axios.put(`${API_URL}/admin/iklan/${iklan?.id}`, data, { headers }),
        {
          pending: {
            render: () => {
              setUpdateBtnDisabled(true);
              return 'Loading';
            },
          },
          success: {
            render: () => {
              setUpdateBtnDisabled(false);
              setIsModalOpen(false);
              mutate();
              return 'Berhasil update iklan';
            },
          },
          error: {
            render: toastPromiseError(() => {
              setUpdateBtnDisabled(false);
            }, 'Gagal update iklan!'),
          },
        }
      );
    },
    [headers, iklan?.id, mutate]
  );

  const onClickDelete = React.useCallback(
    async (id: number) => {
      const { isConfirmed } = await MySwal.fire({
        title: 'Yakin ingin hapus iklan ini?',
        text: 'Tindakan ini tidak bisa dibatalkan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        ...mySwalOpts(theme),
      });
      if (isConfirmed) {
        toast.promise(axios.delete(`${API_URL}/admin/iklan/${id}`), {
          pending: {
            render: () => {
              setDelBtnDisabled(true);
              return 'Loading';
            },
          },
          success: {
            render: () => {
              mutate();
              setDelBtnDisabled(false);
              return 'Berhasil hapus iklan!';
            },
          },
          error: {
            render: toastPromiseError(() => {
              setDelBtnDisabled(false);
            }, 'Gagal menghapus iklan!'),
          },
        });
      }
    },
    [mutate, theme]
  );

  if (error) {
    router.push('/');
  }

  const { data: refund } = useSWR<{
    data: { data: Refund[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(`${API_URL}/master/refund?perPage=200`);

  const getJenisRefund = React.useCallback(
    (i: number) => {
      if (!refund) {
        return;
      }

      return refund.data.data.find((v) => v.id === i)?.name;
    },
    [refund]
  );

  const data = React.useMemo(
    () =>
      iklans?.data.data.map((iklan) => {
        return {
          biayaPenjualan: iklan.harga_akun,
          createdAt: formatDateStrId(iklan.created_at),
          id: iklan.id,
          iklan,
          judulIklan: iklan.title,
          status: getStatusIklan(iklan.status_id),
          statusIklan: iklan.status,
          userId: iklan.user_id ?? iklan.user?.id,
          user: iklan.user,
          userName: iklan.user.name,
          email: iklan.user.email,
          jenisRefund: getJenisRefund(iklan.jenis_refund),
          action: {},
        };
      }) ?? [],
    [getJenisRefund, iklans?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Tanggal',
        accessor: 'createdAt',
      },
      {
        Header: 'Judul Iklan',
        accessor: 'judulIklan',
      },
      {
        Header: 'Jenis Refund',
        accessor: 'jenisRefund',
      },
      {
        Header: 'Email Penjual',
        accessor: 'email',
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
                href={`/admin/iklan/${row.original.id}`}
              >
                <FiSearch />
              </ButtonLink>
            </Tooltip>
            <Tooltip interactive={false} content='Edit'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
                onClick={() => {
                  setIklan(row.original.iklan);
                  reset();
                  setIsModalOpen(true);
                }}
              >
                <FiEdit2 />
              </Button>
            </Tooltip>
            <Tooltip interactive={false} content='Hapus'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
                onClick={() => onClickDelete(row.original.id)}
                disabled={delBtnDisabled}
              >
                <FiTrash2 />
              </Button>
            </Tooltip>
          </>
        ),
      },
    ],
    [theme, delBtnDisabled, reset, onClickDelete]
  );

  return (
    <>
      <Seo templateTitle='Admin | Iklan' />
      <AnimatePage>
        <DashboardLayout>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-3xl'>Data Iklan</h1>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <span>Show</span>
              <Select
                styles={customSelectStyles}
                className={clsxm('py-0')}
                options={maxEntriesOpts}
                defaultValue={maxEntriesOpts[0]}
                onChange={(
                  val: SingleValue<{ label: string; value: number }>
                ) => setMaxPerPage(val?.value ?? 10)}
              />{' '}
              <span>entries</span>
            </div>
            <TableSearch
              setFilter={(s: string) => {
                setCurPage(0);
                setFilter(s);
              }}
            />
          </div>
          {iklans && (
            <>
              <ReactTable data={data} columns={columns} withFooter={false} />
              <div className='w-full rounded-lg bg-neutral-100 py-2 px-8 dark:bg-neutral-800 dark:text-neutral-100'>
                Showing {iklans.data.pagination.from + 1} to{' '}
                {iklans.data.pagination.to} of {iklans.data.pagination.total}{' '}
                entries
              </div>
            </>
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
              pageCount={iklans?.data.pagination.lastPage ?? 1}
              onPageChange={({ selected }) => setCurPage(selected)}
            />
          </div>
          <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-10'
              onClose={() => setIsModalOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-black bg-opacity-25' />
              </Transition.Child>
              <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Dialog.Panel className='w-full max-w-md transform overflow-visible rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg font-medium leading-6 text-gray-900'
                      >
                        {iklan?.title}
                      </Dialog.Title>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                          <div>
                            <label>Status Iklan</label>
                            <Controller
                              control={control}
                              defaultValue={
                                iklan?.status_id ?? statusIklanOpts[0].value
                              }
                              name='status'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={statusIklanOpts}
                                  value={statusIklanOpts.find(
                                    (c) => c.value === value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.status?.message}
                          </p>
                        </div>
                        <div>
                          <ButtonGradient
                            disabled={updateBtnDisabled}
                            onClick={() => handleSubmit(onSubmit)()}
                            className='text-black'
                          >
                            Update Iklan
                          </ButtonGradient>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
