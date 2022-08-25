import axios from 'axios';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import Modal from 'react-responsive-modal';
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
import ReactTable from '@/components/ReactTable';
import Seo from '@/components/Seo';
import TableSearch from '@/components/TableSearch';
import Tooltip from '@/components/Tooltip';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import clsxm from '@/lib/clsxm';
import toastPromiseError from '@/lib/toastPromiseError';
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      axios.post<{ data: Bank; message: string; success: boolean }>(
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
          render: toastPromiseError(undefined, 'Gagal tambah bank!'),
        },
      }
    );
  };

  const onSubmit2: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      axios.put<{ data: Bank; message: string; success: boolean }>(
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
            setOpen(false);
            return 'Berhasil update bank';
          },
        },
        error: {
          render: toastPromiseError(undefined, 'Gagal update bank!'),
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
        toast.promise(axios.delete(`${API_URL}/master/bank/${id}`), {
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
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Aksi',
        accessor: 'action',
        disableSortBy: true,
        Cell: ({ row }) => (
          <>
            <Tooltip interactive={false} content='Toggle status'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
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
                disabled={updBtnDisabled}
              >
                <FiEdit2 />
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
          </>
        ),
      },
    ],
    [onClickDelete, setValue, theme, updBtnDisabled]
  );

  if (error) {
    router.push('/');
  }

  return (
    <>
      <Seo templateTitle='Admin | Invoice' />
      <AnimatePage>
        <DashboardLayout superAdmin>
          <div className='flex justify-between'>
            <TableSearch
              setFilter={(s: string) => {
                setCurPage(0);
                setFilter(s);
              }}
            />
            <Button
              variant={theme === 'dark' ? 'dark' : 'light'}
              className='text-green-500 hover:text-green-600'
              onClick={() => setOpen(true)}
              disabled={updBtnDisabled}
            >
              <FiPlus />
            </Button>
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
          <Modal open={open} onClose={onCloseModal} center>
            <div className='row justify-content-center'>
              <div className='col-xxl-6 col-xl-7 col-lg-8'>
                <div className='login-wrapper pos-rel wow fadeInUp mb-40'>
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
                            <p className='text-red-500'>
                              {errors.name?.message}
                            </p>
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
            </div>
          </Modal>
          <Modal open={open2} onClose={onCloseModal2} center>
            <div className='row justify-content-center'>
              <div className='col-xxl-6 col-xl-7 col-lg-8'>
                <div className='login-wrapper pos-rel wow fadeInUp mb-40'>
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
                            <p className='text-red-500'>
                              {errors.name?.message}
                            </p>
                          </div>
                          <div className='col-md-12'>
                            <div className='single-input-unit'>
                              <label htmlFor='rekening_name'>
                                Nama Rekening
                              </label>
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
            </div>
          </Modal>
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
