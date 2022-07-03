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
import Select from 'react-select';
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
import Tooltip from '@/components/Tooltip';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import { clsxm } from '@/lib/clsxm';
import formatDateStrId from '@/lib/formatDateStrId';
import getStatusIklan, { statusIklanArray } from '@/lib/getStatusIklan';
import useAuthHeader from '@/services/authHeader';
import type InvoiceAdmin from '@/types/invoiceAdmin';
import type Pagination from '@/types/pagination';

const MySwal = withReactContent(Swal);

type IFormInput = {
  status?: number;
};

const IndexPage = () => {
  const { theme } = useTheme();

  const [delBtnDisabled, setDelBtnDisabled] = React.useState(false);

  const [iklan, setIklan] = useState<{
    created_at: string;
    id: number;
    status: number;
    title: string;
    updated_at: string;
  }>();

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [curPage, setCurPage] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: iklans,
    error,
    mutate,
  } = useSWR<{
    data: {
      data: InvoiceAdmin[];
      pagination: Pagination;
    };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/admin/invoice`,
          query: {
            page: curPage + 1,
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
              mutate();
              return 'Berhasil update iklan';
            },
          },
          error: {
            render: () => {
              setUpdateBtnDisabled(false);
              return 'Gagal update iklan!';
            },
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
              setDelBtnDisabled(false);
              return 'Berhasil hapus iklan!';
            },
          },
          error: {
            render: () => {
              setDelBtnDisabled(false);
              return 'Gagal menghapus iklan!';
            },
          },
        });
      }
    },
    [theme]
  );

  if (error) {
    router.push('/');
  }

  const data = React.useMemo(
    () =>
      iklans?.data.data.map((invoice) => {
        return {
          biayaAdmin: invoice.biaya_admin,
          biayaPenjualan: invoice.biaya_penjualan,
          createdAt: formatDateStrId(invoice.created_at),
          createdBy: invoice.created_by,
          expiredAt: invoice.expired_at,
          id: invoice.id,
          iklan: invoice.iklan,
          iklanId: invoice.iklan_id,
          jenisInvoice: invoice.jenis_invoice,
          jenisPembayaran: invoice.jenis_pembayaran,
          judulIklan: invoice.iklan.title,
          noInvoice: invoice.no_invoice,
          status: getStatusIklan(invoice.iklan.status),
          statusIklan: invoice.iklan.status,
          updatedAt: invoice.updated_at,
          updatedBy: invoice.updated_by,
          userId: invoice.user_id ?? invoice.user?.id,
          user: invoice.user,
          action: {},
        };
      }) ?? [],
    [iklans?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Tanggal',
        accessor: 'createdAt',
      },
      {
        Header: 'Status',
        accessor: 'status', // accessor is the "key" in the data
      },
      {
        Header: 'Judul Iklan',
        accessor: 'judulIklan',
      },
      {
        Header: 'Nomor Invoice',
        accessor: 'noInvoice',
      },
      {
        Header: 'Aksi',
        accessor: 'action',
        Cell: ({ row }) => (
          <>
            <Tooltip interactive={false} content='Lihat'>
              <ButtonLink
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-green-500 hover:text-green-600'
                href={`/admin/iklan/${row.original.iklanId}`}
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
                onClick={() => onClickDelete(row.original.iklanId)}
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
          {iklans && (
            <>
              <ReactTable data={data} columns={columns} withFooter={false} />
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
                                iklan?.status ?? statusIklanOpts[0].value
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
