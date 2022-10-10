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
import FeePayment from '@/types/feePayment';
import Pagination from '@/types/pagination';

const MySwal = withReactContent(Swal);

type IFormInput = {
  id_bank: number;
  price: number;
  type: number;
  fee_flat: number;
  fee_percent: number;
  name: string;
  rekening_number: string | null;
  is_active: number;
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
    data: feePayments,
    error,
    mutate,
  } = useSWR<{
    data: {
      data: FeePayment[];
      pagination: Pagination;
    };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/master/fee-payment`,
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

  const { data: banks } = useSWR<{
    data: { data: Bank[]; pagination: Pagination };
    message: string;
    success: boolean;
  }>(
    stringifyUrl({
      url: `${API_URL}/master/bank`,
      query: {
        perPage: 696969,
      },
    })
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

  const bankOpts = banks?.data.data
    .filter((b) => !!b.is_active)
    .map((b) => ({
      value: b.id,
      label: b.name,
    }));

  const feeAdminType = [
    {
      value: 0,
      label: 'Manual',
    },
    {
      value: 1,
      label: 'Ipaymu',
    },
  ];

  const onToggleStatus = React.useCallback(
    async (is_active: boolean, id: number) => {
      const { isConfirmed } = await MySwal.fire({
        title: `Yakin ingin ubah status fee Payment dari ${
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
          customAxios.put(`${API_URL}/master/fee-payment/${id}`, payload),
          {
            pending: {
              render: () => {
                return 'Loading';
              },
            },
            success: {
              render: () => {
                mutate();
                return 'Berhasil update feePayment!';
              },
            },
            error: {
              render: toastPromiseError(undefined, 'Gagal update feePayment!'),
            },
          }
        );
      }
    },
    [mutate, theme]
  );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      customAxios.post<{ data: FeePayment; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/master/fee-payment`,
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
            return 'Berhasil tambah feePayment';
          },
        },
        error: {
          render: toastPromiseError(
            () => setOpen(false),
            'Gagal tambah feePayment!'
          ),
        },
      }
    );
  };

  const onSubmit2: SubmitHandler<IFormInput> = async (data) => {
    await toast.promise(
      customAxios.put<{ data: FeePayment; message: string; success: boolean }>(
        stringifyUrl({
          url: `${API_URL}/master/fee-payment/${activeId}`,
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
            return 'Berhasil update feePayment';
          },
        },
        error: {
          render: toastPromiseError(
            () => setOpen2(false),
            'Gagal update feePayment!'
          ),
        },
      }
    );
  };

  const onClickDelete = React.useCallback(
    async (id: number) => {
      const { isConfirmed } = await MySwal.fire({
        title: 'Yakin ingin hapus feePayment ini?',
        text: 'Tindakan ini tidak bisa dibatalkan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        ...mySwalOpts(theme),
      });

      if (isConfirmed) {
        toast.promise(
          customAxios.delete(`${API_URL}/master/fee-payment/${id}`),
          {
            pending: {
              render: () => {
                return 'Loading';
              },
            },
            success: {
              render: () => {
                mutate();
                return 'Berhasil hapus feePayment!';
              },
            },
            error: {
              render: toastPromiseError(undefined, 'Gagal hapus feePayment!'),
            },
          }
        );
      }
    },
    [mutate, theme]
  );

  const data = React.useMemo(
    () =>
      feePayments?.data.data.map((feePayment) => {
        return {
          id: feePayment.id,
          feeFlat: feePayment.fee_flat,
          feePercent: `${feePayment.fee_percent} %`,
          rekening_number: feePayment.rekening_number,
          status: feePayment.is_active ? 'Aktif' : 'Nonaktif',
          is_active: feePayment.is_active,
          name: feePayment.name,
          jenis: feePayment.type === 0 ? 'Manual' : 'Ipaymu',
          action: {},
          feePayment,
        };
      }) ?? [],
    [feePayments?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Nama',
        accessor: 'name',
      },
      {
        Header: 'Fee Flat',
        accessor: 'feeFlat',
      },
      {
        Header: 'Fee Percentage',
        accessor: 'feePercent',
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
                    const {
                      is_active,
                      name,
                      fee_flat,
                      fee_percent,
                      rekening_number,
                      id_bank,
                      type,
                      price,
                    } = row.original.feePayment;
                    setValue('is_active', is_active);
                    setValue('id_bank', id_bank);
                    setValue('name', name);
                    setValue('fee_percent', fee_percent);
                    setValue('fee_flat', fee_flat);
                    setValue('rekening_number', rekening_number);
                    setValue('type', type);
                    setValue('price', price);
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

  if (!bankOpts) return;

  return (
    <>
      <Seo templateTitle='Admin | Fee Payment' />
      <AnimatePage>
        <DashboardLayout superAdmin>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-3xl'>Data Fee Payment</h1>
            <Button onClick={() => setOpen(true)} disabled={updBtnDisabled}>
              Add Fee Payment
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
          {feePayments && (
            <ReactTable data={data} columns={columns} withFooter={false} />
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
              pageCount={feePayments?.data.pagination.lastPage ?? 1}
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
                    <h4>Tambah Fee Payment</h4>
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
                              placeholder='Masukkan Nama FeePayment'
                              autoFocus
                              {...register('name', {
                                required: 'Nama feePayment harus diisi',
                              })}
                            />
                          </div>
                          <p className='text-red-500'>{errors.name?.message}</p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='id_bank'>Bank</label>
                            <Controller
                              control={control}
                              defaultValue={bankOpts[0].value}
                              name='id_bank'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={bankOpts}
                                  value={bankOpts.find(
                                    (c) => +c.value === +value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Fee Flat</label>
                            <input
                              type='number'
                              step='any'
                              onWheel={(e) =>
                                e.target instanceof HTMLElement &&
                                e.target.blur()
                              }
                              placeholder='0'
                              {...register('fee_flat', { valueAsNumber: true })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.fee_flat?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Fee Percent</label>
                            <input
                              type='number'
                              step='any'
                              onWheel={(e) =>
                                e.target instanceof HTMLElement &&
                                e.target.blur()
                              }
                              placeholder='0'
                              {...register('fee_percent', {
                                valueAsNumber: true,
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.fee_percent?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='is_active'>Status</label>
                            <Controller
                              control={control}
                              defaultValue={+isActiveOpts[0].value}
                              name='is_active'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={isActiveOpts}
                                  value={isActiveOpts.find(
                                    (c) => +c.value === +value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='is_active'>Type</label>
                            <Controller
                              control={control}
                              defaultValue={feeAdminType[1].value}
                              name='type'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={feeAdminType}
                                  value={feeAdminType.find(
                                    (c) => +c.value === +value
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
                    <h4>Update FeePayment</h4>
                    <form
                      className='login-form'
                      onSubmit={handleSubmit(onSubmit2)}
                    >
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Nama</label>
                            <input
                              type='text'
                              placeholder='Masukkan Nama FeePayment'
                              autoFocus
                              {...register('name')}
                            />
                          </div>
                          <p className='text-red-500'>{errors.name?.message}</p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='id_bank'>Bank</label>
                            <Controller
                              control={control}
                              defaultValue={bankOpts[0].value}
                              name='id_bank'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={bankOpts}
                                  value={bankOpts.find(
                                    (c) => +c.value === +value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Price</label>
                            <input
                              type='number'
                              step='any'
                              onWheel={(e) =>
                                e.target instanceof HTMLElement &&
                                e.target.blur()
                              }
                              placeholder='0'
                              {...register('price', { valueAsNumber: true })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.price?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Fee Flat</label>
                            <input
                              type='number'
                              step='any'
                              onWheel={(e) =>
                                e.target instanceof HTMLElement &&
                                e.target.blur()
                              }
                              placeholder='0'
                              {...register('fee_flat', { valueAsNumber: true })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.fee_flat?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='email'>Fee Percent</label>
                            <input
                              type='number'
                              step='any'
                              onWheel={(e) =>
                                e.target instanceof HTMLElement &&
                                e.target.blur()
                              }
                              placeholder='0'
                              {...register('fee_percent', {
                                valueAsNumber: true,
                              })}
                            />
                          </div>
                          <p className='text-red-500'>
                            {errors.fee_percent?.message}
                          </p>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='is_active'>Status</label>
                            <Controller
                              control={control}
                              defaultValue={+isActiveOpts[0].value}
                              name='is_active'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={isActiveOpts}
                                  value={isActiveOpts.find(
                                    (c) => +c.value === +value
                                  )}
                                  onChange={(val) => onChange(val?.value)}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='single-input-unit'>
                            <label htmlFor='is_active'>Type</label>
                            <Controller
                              control={control}
                              defaultValue={feeAdminType[1].value}
                              name='type'
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  className={clsxm('py-3 pt-0')}
                                  options={feeAdminType}
                                  value={feeAdminType.find(
                                    (c) => +c.value === +value
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
