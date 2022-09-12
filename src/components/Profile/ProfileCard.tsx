import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tippy';

import Button from '@/components/buttons/Button';
import { API_URL } from '@/constant/config';
import clsxm from '@/lib/clsxm';
import User from '@/types/user';

export type ProfileCardProp = {
  user?: User;
  handleLogout: () => Promise<void>;
  withEdit?: boolean;
  setFile?: (f: FileList) => void;
};

const ProfileCard = ({
  user,
  handleLogout,
  withEdit = false,
  setFile,
}: ProfileCardProp) => {
  const router = useRouter();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current?.click();
  };

  const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && setFile) setFile(e.target.files);
  };

  return (
    <div className='col-lg-3 col-md-8 absolute top-36'>
      <div className='creator-info-details wow fadeInUp mb-40'>
        <div className='creator-img-name flex items-center justify-center rounded-t-lg py-4'>
          <div className='relative h-[70px] w-[70px]'>
            <img
              src={
                user?.profile_picture
                  ? `${API_URL}/${user?.profile_picture}`
                  : `/images/pfp.jpg`
              }
              alt='profile-img'
              className='overflow-hidden rounded-full'
            />
            {withEdit && setFile && (
              <Tooltip
                trigger='click'
                interactive
                position='right-end'
                html={
                  <div className='flex flex-col'>
                    <input
                      className='hidden'
                      type='file'
                      ref={inputFileRef}
                      onChangeCapture={onFileChangeCapture}
                    />
                    <Button
                      className='px-1 text-xs'
                      onClick={() => onBtnClick()}
                    >
                      Upload Foto
                    </Button>
                    <Button className='bg-rose-400 text-xs hover:bg-rose-500'>
                      Hapus Foto
                    </Button>
                  </div>
                }
              >
                <button className='absolute bottom-0 right-0 rounded-full bg-[#1E53A3] p-1 text-white ring-2'>
                  <FaPencilAlt className='text-sm' />
                </button>
              </Tooltip>
            )}
          </div>

          <div className='creator-name-id p-0'>
            <h4 className='artist-name relative'>
              {user?.name}
              {!!user?.is_verified && (
                <span className='profile-verification verified'>
                  <i className='fas fa-check'></i>
                </span>
              )}
            </h4>
            <div className='artist-id'>@{user?.username}</div>
          </div>
        </div>
        <div className='profile-setting-list  rounded-b-lg'>
          <ul>
            <li
              className={clsxm(
                router.pathname === '/profile' &&
                  'active relative bg-[rgba(184,_156,_116,_0.1)]',
                'py-2'
              )}
            >
              <Link href='/profile'>
                <a className='!text-[#B89C74]'>
                  <i className='flaticon-account ml-6 text-[#B89C74]'></i>Profil
                </a>
              </Link>
              <div
                className={clsxm(
                  router.pathname === '/profile' ? 'block' : 'hidden',
                  'absolute left-0 top-0 h-full w-2 bg-[#B89C74]'
                )}
              ></div>
            </li>
            <li
              className={clsxm(
                router.pathname === '/seller' &&
                  'active relative bg-[rgba(184,_156,_116,_0.1)]',
                'py-2'
              )}
            >
              <Link href='/seller'>
                <a className='!text-[#B89C74]'>
                  <i className='flaticon-newspaper ml-6 text-[#B89C74]'></i>
                  Iklan
                </a>
              </Link>
              <div
                className={clsxm(
                  router.pathname === '/seller' ? 'block' : 'hidden',
                  'absolute left-0 top-0 h-full w-2 bg-[#B89C74]'
                )}
              ></div>
            </li>
            <li className='py-2'>
              <button
                onClick={() => handleLogout()}
                className='space-x-4 hover:text-primary-500'
              >
                <i className='flaticon-logout ml-6'></i>
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
