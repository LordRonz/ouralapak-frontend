import Image from 'next/image';
import { useTheme } from 'next-themes';
import { stringifyUrl } from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import Modal from 'react-responsive-modal';
import { SingleValue } from 'react-select';
import Select from 'react-select';
import { Column } from 'react-table';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSWR from 'swr';

import AnimatePage from '@/components/AnimatePage';
import ButtonGradient from '@/components/buttons/ButtonGradient';
import PaginationComponent from '@/components/Common/Pagination';
import XButton from '@/components/Common/XButton';
import UnstyledLink from '@/components/links/UnstyledLink';
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
import getWaLink from '@/lib/getWhatsappLink';
import toastPromiseError from '@/lib/toastPromiseError';
import CheckMark from '@/svgs/checkmark.svg';
import Detail from '@/svgs/detail.svg';
import Whatsapp from '@/svgs/whatsapp.svg';
import XMark from '@/svgs/xmark.svg';
import Pagination from '@/types/pagination';
import User from '@/types/user';

const MySwal = withReactContent(Swal);

const IndexPage = () => {
  const { theme } = useTheme();

  const [, setUpdBtnDisabled] = React.useState(false);
  const [mounted, setMounted] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [filter, setFilter] = useState<string>();
  const [maxPerPage, setMaxPerPage] = useState(10);
  const [lightboxImg, setLightboxImg] = useState<string>();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);

  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: users, mutate } = useSWR<{
    data: {
      data: User[];
      pagination: Pagination;
    };
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/admin/user`,
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

  const onClickUpdate = React.useCallback(
    async (user: User) => {
      const { isConfirmed } = await MySwal.fire({
        title: `Yakin ingin ubah status user dari ${
          user.is_verified ? 'terverifikasi' : 'belum diverifikasi'
        } jadi ${user.is_verified ? 'belum diverifikasi' : 'terverifikasi'}?`,
        text: 'Tindakan ini bisa diubah nantinya!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update',
        ...mySwalOpts(theme),
      });

      const payload = {
        is_verified: Number(!user.is_verified),
      };

      if (isConfirmed) {
        toast.promise(
          customAxios.put(`${API_URL}/admin/user/${user.id}`, payload),
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
                return 'Berhasil update user!';
              },
            },
            error: {
              render: toastPromiseError(() => {
                setUpdBtnDisabled(false);
              }, 'Gagal update user!'),
            },
          }
        );
      }
    },
    [mutate, theme]
  );

  const data = React.useMemo(
    () =>
      users?.data.data.map((user, i) => {
        return {
          index: i,
          id: user.id,
          email: user.email,
          username: user.username,
          noHp: user.phone,
          status: user.is_verified ? 'Verified' : 'Unverified',
          isVerified: user.is_verified,
          blacklist: user.is_blacklist,
          active: user.is_active,
          igUsername: user.ig_username,
          name: user.name,
          action: {},
          user,
        };
      }) ?? [],
    [users?.data.data]
  );

  const columns = React.useMemo<Column<typeof data[number]>[]>(
    () => [
      {
        Header: 'Email',
        accessor: 'email',
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
        accessor: 'status',
        Cell: ({ row }) => (
          <>
            <div
              className={clsxm(
                'rounded-xl px-4 py-2',
                row.original.isVerified
                  ? 'bg-[#51BB25] !bg-opacity-[0.18] text-[#51BB25]'
                  : 'bg-[#DC3545] !bg-opacity-[0.18] text-[#DC3545]'
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
                  onClick={() => onClickUpdate(row.original.user)}
                >
                  {row.original.isVerified ? <XMark /> : <CheckMark />}
                </div>
              </Tooltip>
              <Tooltip interactive={false} content='Detail'>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                    setSelectedUser(row.original.index);
                    setOpen(true);
                  }}
                >
                  <Detail />
                </div>
              </Tooltip>
              <Tooltip interactive={false} content='Whatsapp'>
                <UnstyledLink
                  href={
                    row.original.noHp !== null
                      ? getWaLink(row.original.noHp)
                      : '#'
                  }
                >
                  <Whatsapp />
                </UnstyledLink>
              </Tooltip>
            </div>
          </>
        ),
      },
    ],
    [onClickUpdate]
  );

  return (
    <>
      <Seo templateTitle='Admin | Akun Penjual' />
      <AnimatePage>
        <DashboardLayout>
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-3xl'>Data Akun Penjual</h1>
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
          {users && (
            <>
              <ReactTable data={data} columns={columns} withFooter={false} />
              <div className='w-full rounded-lg bg-neutral-100 py-2 px-8 dark:bg-neutral-800 dark:text-neutral-100'>
                Showing {users.data.pagination.from + 1} to{' '}
                {users.data.pagination.to} of {users.data.pagination.total}{' '}
                entries
              </div>
            </>
          )}
          <div className='flex items-center justify-center'>
            <PaginationComponent
              pageCount={users?.data.pagination.lastPage ?? 1}
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
            <div className='row gap-y-6'>
              <div className='py-2 !px-8'>
                <div className=' login-inner'>
                  <div className='login-content text-left'>
                    <h4>Detail Penjual</h4>
                  </div>
                  <div className='grid grid-cols-12 gap-x-4'>
                    <div className='col-span-4'>
                      <div className='grid grid-rows-5 gap-y-1'>
                        <div className='row-span-2'>
                          <Image
                            src={
                              users?.data.data[selectedUser].profile_picture
                                ? `${API_URL}/${users?.data.data[selectedUser].profile_picture}`
                                : '/images/pfp.jpg'
                            }
                            width={180}
                            height={180}
                            alt='Profil'
                            className='overflow-hidden rounded-xl'
                          />
                        </div>
                        <div>
                          <h5>Kartu Identitas 1</h5>
                          <ButtonGradient
                            className='text-primary-800'
                            onClick={() => {
                              if (!users?.data.data[selectedUser].identity_card)
                                return;
                              setLightboxImg(
                                `${API_URL}/${users?.data.data[selectedUser].identity_card}`
                              );
                              setLightboxOpen(true);
                            }}
                            disabled={
                              !users?.data.data[selectedUser].identity_card
                            }
                          >
                            Show
                          </ButtonGradient>
                        </div>
                        <div>
                          <h5>Kartu Identitas 2</h5>
                          <ButtonGradient
                            className='text-primary-800'
                            onClick={() => {
                              if (
                                !users?.data.data[selectedUser]
                                  .identity_card_validation
                              )
                                return;
                              setLightboxImg(
                                `${API_URL}/${users?.data.data[selectedUser].identity_card_validation}`
                              );
                              setLightboxOpen(true);
                            }}
                            disabled={
                              !users?.data.data[selectedUser]
                                .identity_card_validation
                            }
                          >
                            Show
                          </ButtonGradient>
                        </div>
                        <div>
                          <h5>Kartu Identitas 3</h5>
                          <ButtonGradient
                            className='text-primary-800'
                            onClick={() => {
                              if (
                                !users?.data.data[selectedUser]
                                  .identity_card_validation_mask
                              )
                                return;
                              setLightboxImg(
                                `${API_URL}/${users?.data.data[selectedUser].identity_card_validation_mask}`
                              );
                              setLightboxOpen(true);
                            }}
                            disabled={
                              !users?.data.data[selectedUser]
                                .identity_card_validation_mask
                            }
                          >
                            Show
                          </ButtonGradient>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-8 h-full'>
                      <div className='grid h-full grid-rows-5 gap-y-1 text-black'>
                        <div>
                          <h5>Nama</h5>
                          <div className='rounded-lg border border-[#C9D1DD] bg-neutral-100 p-2'>
                            {users?.data.data[selectedUser].name}
                          </div>
                        </div>
                        <div>
                          <h5>Email</h5>
                          <div className='rounded-lg border border-[#C9D1DD] bg-neutral-100 p-2'>
                            {users?.data.data[selectedUser].email}
                          </div>
                        </div>
                        <div>
                          <h5>Username</h5>
                          <div className='rounded-lg border border-[#C9D1DD] bg-neutral-100 p-2'>
                            {users?.data.data[selectedUser].username}
                          </div>
                        </div>
                        <div>
                          <h5>No. Handphone</h5>
                          <div className='rounded-lg border border-[#C9D1DD] bg-neutral-100 p-2'>
                            {users?.data.data[selectedUser].phone}
                          </div>
                        </div>
                        <div>
                          <h5>Instagram</h5>
                          <div className='rounded-lg border border-[#C9D1DD] bg-neutral-100 p-2'>
                            {users?.data.data[selectedUser].ig_username}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {lightboxOpen && lightboxImg && (
                <Lightbox
                  mainSrc={lightboxImg}
                  onCloseRequest={() => setLightboxOpen(false)}
                />
              )}
            </div>
          </Modal>
        </DashboardLayout>
      </AnimatePage>
    </>
  );
};

export default IndexPage;
