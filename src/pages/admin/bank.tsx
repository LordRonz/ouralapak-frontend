import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
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
import XButton from '@/components/Common/XButton';
import ReactTable from '@/components/ReactTable';
import Seo from '@/components/Seo';
import TableSearch from '@/components/TableSearch';
import Tooltip from '@/components/Tooltip';
import { maxEntriesOpts } from '@/constant/admin';
import { API_URL } from '@/constant/config';
import { customSelectStyles } from '@/constant/select';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import clsxm from '@/lib/clsxm';
import customAxios from '@/lib/customAxios';
import toastPromiseError from '@/lib/toastPromiseError';
import CheckMark from '@/svgs/checkmark.svg';
import Edit from '@/svgs/edit.svg';
import Trash from '@/svgs/trash.svg';
import XMark from '@/svgs/xmark.svg';
import Bank from '@/types/bank';
import Pagination from '@/types/pagination';

const MySwal = withReactContent(Swal);

type IFormInput = {
  name: string;
  rekening_name: string;
  rekening_number: string;
  is_active: boolean;
};

const IndexPage = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [updBtnDisabled] = useState(false);

  const [curPage, setCurPage] = useState(0);

  const [filter, setFilter] = useState<string>();

  const [activeId, setActiveId] = useState<number>();

  const [maxPerPage, setMaxPerPage] = useState(10);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

  const [open2, setOpen2] = useState(false);

  const onCloseModal2 = () => setOpen2(false);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const {
    data: banks,
    error,
    mutate,
  } = useSWR<{
    data: {
      data: Bank[];
      pagination: Pagination;
    };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/master/bank`,
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

  const isActiveOpts = [
    {
      value: true,
      label: 'Aktif',
    },
    {
      value: false,
      label: 'Nonaktif',
    },
  ];

  const onToggleStatus = React.useCallback(
    async (is_active: boolean, id: number) => {
      const { isConfirmed } = await MySwal.fire({
        title: `Yakin ingin ubah status bank dari ${
          is_active ? 'aktif' : 'nonaktif'
        } jadi ${is_active ? 'nonaktif' : 'aktif'}?`,
        text: 'Tindakan ini bisa diubah nantinya!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update',
        ...mySwalOpts(theme),
      });

      const payload = {
        is_active: !is_active,
      };

      if (isConfirmed) {
        toast.promise(
          customAxios.put(`${API_URL}/master/bank/${id}`, payload),
          {
            pending: {
              render: () => {
                return 'Loading';
              },
            },
            success: {
              render: () => {
                mutate();
                return 'Berhasil update bank!';
              },
            },
            error: {
              render: toastPromiseError(undefined, 'Gagal update bank!'),
            },
          }
        );
      }
    },
    [mutate, theme]
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      customAxios.post<{ data: Bank; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/master/bank`,
        }),
        data
      ),
      {
        pending: {
          render: () => {
            return 'Loading';
          },
        },
        success: {
          render: () => {
            mutate();
            setOpen(false);
            return 'Berhasil tambah bank';
          },
        },
        error: {
          render: toastPromiseError(() => setOpen(false), 'Gagal tambah bank!'),
        },
      }
    );
  };

  const onSubmit2: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      customAxios.put<{ data: Bank; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/master/bank/${activeId}`,
        }),
        data
      ),
      {
        pending: {
          render: () => {
            return 'Loading';
          },
        },
        success: {
          render: () => {
            mutate();
            setOpen2(false);
            return 'Berhasil update bank';
          },
        },
        error: {
          render: toastPromiseError(
            () => setOpen2(false),
            'Gagal update bank!'
          ),
        },
      }
    );
  };

  const onClickDelete = React.useCallback(
    async (id: number) => {
      const { isConfirmed } = await MySwal.fire({
        title: 'Yakin ingin hapus bank ini?',
        text: 'Tindakan ini tidak bisa dibatalkan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        ...mySwalOpts(theme),
      });

      if (isConfirmed) {
        toast.promise(customAxios.delete(`${API_URL}/master/bank/${id}`), {
          pending: {
            render: () => {
              return 'Loading';
            },
          },
          success: {
            render: () => {
              mutate();
              return 'Berhasil hapus bank!';
            },
          },
          error: {
            render: toastPromiseError(undefined, 'Gagal hapus bank!'),
          },
        });
      }
    },
    [mutate, theme]
  );

  const data = React.useMemo(
    () =>
      banks?.data.data.map((bank) => {
        return {
          id: bank.id,
          rekening_name: bank.rekening_name,
          rekening_number: bank.rekening_number,
          status: bank.is_active ? 'Aktif' : 'Nonaktif',
          is_active: bank.is_active,
          name: bank.name,
          jenis: bank.method === 'va' ? 'Virtual Account' : 'Manual',
          action: {},
          bank,
        };
      }) ?? [],
    [banks?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Nama',
        accessor: 'name',
      },
      {
        Header: 'Nama Rek.',
        accessor: 'rekening_name',
      },
      {
        Header: 'Nomor Rek.',
        accessor: 'rekening_number',
      },
      {
        Header: 'Jenis',
        accessor: 'jenis',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
          <>
            <div
              className={clsxm(
                'rounded-xl px-4 py-2',
                row.original.is_active
                  ? 'bg-green-200 text-green-600'
                  : 'bg-red-200 text-red-600'
              )}
            >
              {row.original.status}
            </div>
          </>
        ),
      },
      {
        Header: 'Aksi',
        accessor: 'action',
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
            <div className='flex items-center justify-center gap-x-3'>
              <Tooltip interactive={false} content='Update'>
                <div
                  className='cursor-pointer'
                  onClick={() =>
                    onToggleStatus(!!row.original.is_active, row.original.id)
                  }
                >
                  {row.original.is_active ? <XMark /> : <CheckMark />}
                </div>
              </Tooltip>
              <Tooltip interactive={false} content='Update'>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    setOpen2(true);
                    const { is_active, name, rekening_name, rekening_number } =
                      row.original.bank;
                    setValue('is_active', !!is_active);
                    setValue('name', name);
                    setValue('rekening_name', rekening_name);
                    setValue('rekening_number', rekening_number);
                    setActiveId(row.original.id);
                  }}
                >
                  <Edit />
                </div>
              </Tooltip>
              <Tooltip interactive={false} content='Hapus'>
                <div
                  className='cursor-pointer'
                  onClick={() => onClickDelete(row.original.id)}
                >
                  <Trash />
                </div>
              </Tooltip>
            </div>
          </>
        ),
      },
    ],
    [onClickDelete, onToggleStatus, setValue]
  );

  if (error) {
    router.push('/');
  }

  return (
    <>
      <Seo templateTitle='Admin | Invoice' />
      <AnimatePage>
        <DashboardLayout superAdmin>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-3xl'>Data Bank</h1>
            <Button onClick={() => setOpen(true)} disabled={updBtnDisabled}>
              Add Bank
            </Button>
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
          {banks && (
            <ReactTable data={data} columns={columns} withFooter={false} />
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
              pageCount={banks?.data.pagination.lastPage ?? 1}
              onPageChange={({ selected }) => setCurPage(selected)}
            />
          </div>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              modal: 'rounded-xl p-0 overflow-y-auto',
              root: 'overflow-y-auto',
              modalContainer: 'overflow-y-auto',
            }}
            closeIcon={<XButton />}
          >
            <div className='row justify-content-center gap-y-6'>
              <div className='login-wrapper wow fadeInUp relative'>
                <div className=' login-inner'>
                  <div className='login-content'>
                    <h4>Tambah Bank</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='row gap-y-6'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Nama</label>
                            <input
                              type='text'
                              placeholder='Masukkan Nama Bank'
                              autoFocus
                              {...register('name', {
                                required: 'Nama bank harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>{errors.name?.message}</p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Nama Rekening</label>
                            <input
                              type='text'
                              placeholder='Masukkan Nama Rekening'
                              autoFocus
                              {...register('rekening_name', {
                                required: 'Nama rekening harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.rekening_name?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Nomor Rekening</label>
                            <input
                              type='text'
                              placeholder='Masukkan Nomor Rekening'
                              autoFocus
                              {...register('rekening_number', {
                                required: 'Nomor rekening harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.rekening_number?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='jenis_pembayaran'>
                              Jenis Pembayaran
                            </label>
                            <Controller
                              control={control}
                              defaultValue={isActiveOpts[0].value}
                              name='is_active'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={isActiveOpts}
                                  value={isActiveOpts.find(
                                    (c) => c.value === value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='login-btn mt-4'>
                        <ButtonGradient className='text-white' type='submit'>
                          Tambah
                        </ButtonGradient>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            open={open2}
            onClose={onCloseModal2}
            center
            classNames={{
              modal: 'rounded-xl p-0 overflow-y-auto',
              root: 'overflow-y-auto',
              modalContainer: 'overflow-y-auto',
            }}
          >
            <div className='row justify-content-center gap-y-6'>
              <div className='login-wrapper wow fadeInUp relative'>
                <div className=' login-inner'>
                  <div className='login-content'>
                    <h4>Update Bank</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit2)}
                    >
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='name'>Nama</label>
                            <input
                              type='text'
                              placeholder='Masukkan Nama Bank'
                              autoFocus
                              {...register('name')}
                            />
                          </div>
                          <p className='text-red-500'>{errors.name?.message}</p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='rekening_name'>Nama Rekening</label>
                            <input
                              type='text'
                              placeholder='Masukkan Nama Rekening'
                              autoFocus
                              {...register('rekening_name')}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.rekening_name?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='rekening_number'>
                              Nomor Rekening
                            </label>
                            <input
                              type='text'
                              placeholder='Masukkan Nomor Rekening'
                              autoFocus
                              {...register('rekening_number')}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.rekening_number?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='is_active'>Status</label>
                            <Controller
                              control={control}
                              defaultValue={isActiveOpts[0].value}
                              name='is_active'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={isActiveOpts}
                                  value={isActiveOpts.find(
                                    (c) => c.value === value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='login-btn mt-4'>
                        <ButtonGradient className='text-white' type='submit'>
                          Update
                        </ButtonGradient>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
