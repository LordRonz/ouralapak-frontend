import axios from 'axios';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi';
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
import Tooltip from '@/components/Tooltip';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import formatDateStrId from '@/lib/formatDateStrId';
import getStatusIklan, { StatusIklanEnum } from '@/lib/getStatusIklan';
import { JenisInvoice, StatusInvoice } from '@/types/invoice';
import InvoiceAdmin from '@/types/invoiceAdmin';
import Pagination from '@/types/pagination';

const MySwal = withReactContent(Swal);

const IndexPage = () => {
  const { theme } = useTheme();

  const [delBtnDisabled, setDelBtnDisabled] = React.useState(false);
  const [mounted, setMounted] = useState(false);
  const [curPage, setCurPage] = useState(0);
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
          },
        })
      : null
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
              mutate();
              return 'Berhasil hapus invoice!';
            },
          },
          error: {
            render: () => {
              setDelBtnDisabled(false);
              return 'Gagal menghapus invoice!';
            },
          },
        });
      }
    },
    [mutate, theme]
  );

  const onClickUpdate = React.useCallback(
    async (inv: InvoiceAdmin) => {
      const { isConfirmed } = await MySwal.fire({
        title: `Yakin ingin ubah status invoice ${
          inv.jenis_invoice === JenisInvoice.PEMBELI ? 'pembeli' : 'penjual'
        } jadi ${
          inv.status === StatusInvoice.SUDAH_DIBAYAR
            ? 'sudah dibayar'
            : 'menunggu pembayaran'
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
            : StatusIklanEnum.SELESAI,
      };

      if (isConfirmed) {
        toast.promise(
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
              render: () => {
                setDelBtnDisabled(false);
                return 'Gagal update invoice!';
              },
            },
          }
        );
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
          jenisPembayaran: invoice.jenis_pembayaran.rekening_name,
          judulIklan: invoice.iklan.title,
          noInvoice: invoice.no_invoice,
          status: getStatusIklan(invoice.status),
          updatedAt: invoice.updated_at,
          updatedBy: invoice.updated_by,
          userId: invoice.user_id ?? invoice.user?.id,
          user: invoice.user,
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
        Header: 'Nomor Invoice',
        accessor: 'noInvoice',
      },
      {
        Header: 'Metode Pembayaran',
        accessor: 'jenisPembayaran',
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
            <Tooltip interactive={false} content='Edit'>
              <Button
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='text-red-500 hover:text-red-600'
                onClick={() => onClickUpdate(row.original.invoice)}
                disabled={delBtnDisabled}
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
    [delBtnDisabled, onClickDelete, onClickUpdate, theme]
  );

  return (
    <>
      <Seo templateTitle='Admin | Invoice' />
      <AnimatePage>
        <DashboardLayout>
          {invoices && (
            <ReactTable data={data} columns={columns} withFooter={false} />
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
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
