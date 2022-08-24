import axios from 'axios';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Select, { SingleValue } from 'react-select';
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
import { selectPrimaryTheme } from '@/constant/colors';
import { API_URL } from '@/constant/config';
import { customSelectStyles } from '@/constant/select';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import clsxm from '@/lib/clsxm';
import formatDateStrId from '@/lib/formatDateStrId';
import { StatusIklanEnum } from '@/lib/getStatusIklan';
import toastPromiseError from '@/lib/toastPromiseError';
import { getStatusInvoice, JenisInvoice, StatusInvoice } from '@/types/invoice';
import InvoiceAdmin from '@/types/invoiceAdmin';
import Pagination from '@/types/pagination';

const MySwal = withReactContent(Swal);

const IndexPage = () => {
  const { theme } = useTheme();

  const [delBtnDisabled, setDelBtnDisabled] = React.useState(false);
  const [mounted, setMounted] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [filter, setFilter] = useState<string>();
  const [jenisInvoice, setJenisInvoice] = useState(JenisInvoice.PENJUAL);
  const [maxPerPage, setMaxPerPage] = useState(10);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: invoices, mutate } = useSWR<{
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
            ...(filter && { search: filter }),
            orderBy: 'created_at',
            orderDir: 'DESC',
            jenis_invoice: jenisInvoice,
            perPage: maxPerPage,
          },
        })
      : null
  );

  const onClickUpdate = React.useCallback(
    async (inv: InvoiceAdmin) => {
      if (inv.status === StatusInvoice.EXPIRED) {
        return;
      }
      const { isConfirmed } = await MySwal.fire({
        title: `Yakin ingin ubah status invoice ${
          inv.jenis_invoice === JenisInvoice.PEMBELI ? 'pembeli' : 'penjual'
        } jadi ${
          inv.status === StatusInvoice.SUDAH_DIBAYAR
            ? 'menunggu pembayaran'
            : 'sudah dibayar'
        }?`,
        text: 'Tindakan ini bisa diubah nantinya!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update',
        ...mySwalOpts(theme),
      });

      const payload = {
        status_invoice:
          inv.status === StatusInvoice.SUDAH_DIBAYAR
            ? StatusInvoice.MENUNGGU_PEMBAYARAN
            : StatusInvoice.SUDAH_DIBAYAR,
        status_iklan:
          inv.jenis_invoice === JenisInvoice.PENJUAL
            ? inv.status === StatusInvoice.SUDAH_DIBAYAR
              ? StatusIklanEnum.MENUNGGU_PEMBAYARAN
              : StatusIklanEnum.MENUNGGU_KONFIRMASI
            : inv.status === StatusInvoice.SUDAH_DIBAYAR
            ? StatusIklanEnum.MENUNGGU_PEMBAYARAN_PEMBELI
            : StatusIklanEnum.PROSES_REKBER,
      };

      if (isConfirmed) {
        const res = await toast.promise(
          axios.put(
            `${API_URL}/admin/invoice-${
              inv.jenis_invoice === JenisInvoice.PEMBELI ? 'pembeli' : 'penjual'
            }/${inv.id}`,
            payload
          ),
          {
            pending: {
              render: () => {
                setDelBtnDisabled(true);
                return 'Loading';
              },
            },
            success: {
              render: () => {
                setDelBtnDisabled(false);
                mutate();
                return 'Berhasil update invoice!';
              },
            },
            error: {
              render: toastPromiseError(() => {
                setDelBtnDisabled(false);
              }, 'Gagal update invoice!'),
            },
          }
        );
        console.log(res);
      }
    },
    [mutate, theme]
  );

  const data = React.useMemo(
    () =>
      invoices?.data.data.map((invoice) => {
        return {
          biayaAdmin: invoice.biaya_admin,
          biayaPenjualan: invoice.biaya_penjualan,
          createdAt: formatDateStrId(invoice.created_at),
          createdBy: invoice.created_by,
          expiredAt: invoice.expired_at,
          id: invoice.id,
          invoice: invoice,
          iklanId: invoice.iklan_id,
          jenisInvoice: invoice.jenis_invoice,
          jenisPembayaran: invoice.jenis_pembayaran.name,
          judulIklan: invoice.iklan.title,
          noInvoice: invoice.no_invoice,
          status: getStatusInvoice(invoice.status),
          statusCode: invoice.status,
          updatedAt: invoice.updated_at,
          updatedBy: invoice.updated_by,
          userId: invoice.user_id ?? invoice.user?.id,
          user: invoice.user,
          email: invoice.user.email,
          action: {},
        };
      }) ?? [],
    [invoices?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Tanggal',
        accessor: 'createdAt',
      },
      {
        Header: 'No. Invoice',
        accessor: 'noInvoice',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Status',
        accessor: 'status', // accessor is the "key" in the data
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
                href={`/admin/invoice/${row.original.id}`}
              >
                <FiSearch />
              </ButtonLink>
            </Tooltip>
            <Button
              variant={theme === 'dark' ? 'dark' : 'light'}
              className='h-8 text-yellow-500 hover:text-yellow-600'
              onClick={() => onClickUpdate(row.original.invoice)}
              disabled={
                delBtnDisabled ||
                row.original.statusCode === StatusInvoice.EXPIRED
              }
            >
              {row.original.statusCode === StatusInvoice.MENUNGGU_PEMBAYARAN
                ? 'Sudah Dibayar'
                : row.original.statusCode === StatusInvoice.SUDAH_DIBAYAR
                ? 'Menunggu Pembayaran'
                : 'Expired'}
            </Button>
          </>
        ),
      },
    ],
    [delBtnDisabled, onClickUpdate, theme]
  );

  const filterOpts = [
    {
      label: 'Penjualan',
      value: JenisInvoice.PENJUAL,
    },
    {
      label: 'Pembelian',
      value: JenisInvoice.PEMBELI,
    },
  ];

  const maxEntriesOpts = [
    {
      label: '10',
      value: 10,
    },
    {
      label: '25',
      value: 25,
    },
    {
      label: '50',
      value: 50,
    },
    {
      label: '100',
      value: 100,
    },
  ];

  console.log(invoices);

  return (
    <>
      <Seo templateTitle='Admin | Invoice' />
      <AnimatePage>
        <DashboardLayout>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-3xl'>Data Invoice</h1>
            <Select
              styles={customSelectStyles}
              className={clsxm('py-3 pt-0')}
              options={filterOpts}
              defaultValue={filterOpts[0]}
              theme={selectPrimaryTheme}
              onChange={(val: SingleValue<{ label: string; value: number }>) =>
                setJenisInvoice(val?.value ?? JenisInvoice.PENJUAL)
              }
            />
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
          {invoices && (
            <>
              <ReactTable data={data} columns={columns} withFooter={false} />
              <div className='w-full rounded-lg bg-neutral-100 py-2 px-8 dark:bg-neutral-800 dark:text-neutral-100'>
                Showing {invoices.data.pagination.from + 1} to{' '}
                {invoices.data.pagination.to} of{' '}
                {invoices.data.pagination.total} entries
              </div>
            </>
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
              forcePage={curPage}
              pageCount={invoices?.data.pagination.lastPage ?? 1}
              onPageChange={({ selected }) => setCurPage(selected)}
            />
          </div>
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
