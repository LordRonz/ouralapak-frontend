import axios from 'axios';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import Modal from 'react-responsive-modal';
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
import toastPromiseError from '@/lib/toastPromiseError';
import Config from '@/types/config';
import Pagination from '@/types/pagination';

const MySwal = withReactContent(Swal);

type IFormInput = {
  key: string;
  value: string;
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
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const {
    data: configs,
    error,
    mutate,
  } = useSWR<{
    data: {
      data: Config[];
      pagination: Pagination;
    };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/master/config`,
          query: {
            page: curPage + 1,
            ...(filter && { search: filter }),
          },
        })
      : null
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      axios.post<{ data: Config; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/master/config`,
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
            return 'Berhasil tambah config';
          },
        },
        error: {
          render: toastPromiseError(undefined, 'Gagal tambah config!'),
        },
      }
    );
  };

  const onSubmit2: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      axios.put<{ data: Config; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/master/config/${activeId}`,
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
            return 'Berhasil update config';
          },
        },
        error: {
          render: toastPromiseError(undefined, 'Gagal update config!'),
        },
      }
    );
  };

  const onClickDelete = React.useCallback(
    async (id: number) => {
      const { isConfirmed } = await MySwal.fire({
        title: 'Yakin ingin hapus config ini?',
        text: 'Tindakan ini tidak bisa dibatalkan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        ...mySwalOpts(theme),
      });

      if (isConfirmed) {
        toast.promise(axios.delete(`${API_URL}/master/config/${id}`), {
          pending: {
            render: () => {
              return 'Loading';
            },
          },
          success: {
            render: () => {
              mutate();
              return 'Berhasil hapus config!';
            },
          },
          error: {
            render: toastPromiseError(undefined, 'Gagal hapus config!'),
          },
        });
      }
    },
    [mutate, theme]
  );

  const data = React.useMemo(
    () =>
      configs?.data.data.map((config) => {
        return {
          id: config.id,
          key: config.key,
          value: config.value,
          action: {},
          config,
        };
      }) ?? [],
    [configs?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Key',
        accessor: 'key',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
      {
        Header: 'Aksi',
        accessor: 'action',
        Cell: ({ row }) => (
          <>
            <Tooltip interactive={false} content='Toggle status'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
                onClick={() => {
                  setOpen2(true);
                  const { key, value } = row.original.config;
                  setValue('key', key);
                  setValue('value', value);
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
      <Seo templateTitle='SuperAdmin | Config' />
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
          {configs && (
            <ReactTable data={data} columns={columns} withFooter={false} />
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
              pageCount={configs?.data.pagination.lastPage ?? 1}
              onPageChange={({ selected }) => setCurPage(selected)}
            />
          </div>
          <Modal open={open} onClose={onCloseModal} center>
            <div className='row justify-content-center'>
              <div className='col-xxl-6 col-xl-7 col-lg-8'>
                <div className='login-wrapper pos-rel wow fadeInUp mb-40'>
                  <div className=' login-inner'>
                    <div className='login-content'>
                      <h4>Tambah Config</h4>
                      <form
                        className='login-form'
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className='row gap-y-6'>
                          <div className='col-md-12'>
                            <div className='single-input-unit'>
                              <label htmlFor='key'>Key</label>
                              <input
                                type='text'
                                placeholder='Masukkan Key'
                                autoFocus
                                {...register('key', {
                                  required: 'Key harus diisi',
                                })}
                              />
                            </div>
                            <p className='text-red-500'>
                              {errors.key?.message}
                            </p>
                          </div>
                          <div className='col-md-12'>
                            <div className='single-input-unit'>
                              <label htmlFor='value'>Value</label>
                              <input
                                type='text'
                                placeholder='Masukkan Value'
                                autoFocus
                                {...register('value', {
                                  required: 'Key harus diisi',
                                })}
                              />
                            </div>
                            <p className='text-red-500'>
                              {errors.value?.message}
                            </p>
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
                      <h4>Update Config</h4>
                      <form
                        className='login-form'
                        onSubmit={handleSubmit(onSubmit2)}
                      >
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='single-input-unit'>
                              <label htmlFor='key'>Key</label>
                              <input
                                type='text'
                                placeholder='Masukkan Key'
                                autoFocus
                                {...register('key')}
                              />
                            </div>
                            <p className='text-red-500'>
                              {errors.key?.message}
                            </p>
                          </div>
                          <div className='col-md-12'>
                            <div className='single-input-unit'>
                              <label htmlFor='is_active'>Value</label>
                              <input
                                type='text'
                                placeholder='Masukkan Value'
                                autoFocus
                                {...register('value')}
                              />
                            </div>
                            <p className='text-red-500'>
                              {errors.value?.message}
                            </p>
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
