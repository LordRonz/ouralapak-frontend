import axios from 'axios';
import { useRouter } from 'next/router';
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
import ButtonLink from '@/components/links/ButtonLink';
import ReactTable from '@/components/ReactTable';
import Seo from '@/components/Seo';
import Tooltip from '@/components/Tooltip';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import DashboardLayout from '@/dashboard/layout';
import formatDateStrId from '@/lib/formatDateStrId';
import getStatusIklan from '@/lib/getStatusIklan';
import InvoiceAdmin from '@/types/invoiceAdmin';
import Pagination from '@/types/pagination';

const MySwal = withReactContent(Swal);

const IndexPage = () => {
  const { theme } = useTheme();

  const [delBtnDisabled, setDelBtnDisabled] = React.useState(false);

  const router = useRouter();

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

  const [mounted, setMounted] = useState(false);

  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: iklans, error } = useSWR<{
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
          iklanId: invoice.iklan_id,
          jenisInvoice: invoice.jenis_invoice,
          jenisPembayaran: invoice.jenis_pembayaran,
          judulIklan: invoice.iklan.title,
          noInvoice: invoice.no_invoice,
          status: getStatusIklan(invoice.iklan.status),
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
              <ButtonLink
                variant={theme === 'dark' ? 'dark' : 'light'}
                className='hover:text-ywllow-600 text-yellow-500'
                href={`/admin/iklan/edit/${row.original.iklanId}`}
              >
                <FiEdit2 />
              </ButtonLink>
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
    [delBtnDisabled, onClickDelete, theme]
  );

  return (
    <>
      <Seo templateTitle='Admin | Iklan' />
      <AnimatePage>
        <DashboardLayout>
          {iklans && (
            <ReactTable
              data={data}
              columns={columns}
              pageCount={iklans?.data.pagination.lastPage}
              onPageChange={({ selected }) => setCurPage(selected)}
            />
          )}
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
