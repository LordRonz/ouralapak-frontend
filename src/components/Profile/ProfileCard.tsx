import Link from 'next/link';
import { useRouter } from 'next/router';
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
};

const ProfileCard = ({
  user,
  handleLogout,
  withEdit = false,
}: ProfileCardProp) => {
  const router = useRouter();

  return (
    <div className='col-lg-3 col-md-8'>
      <div className='creator-info-details wow fadeInUp mb-40'>
        <div className='creator-img-name'>
          <div className='profile-img pos-rel'>
            <img
              src={
                user?.profile_picture
                  ? `${API_URL}${user?.profile_picture}`
                  : `https://robohash.org/${
                      user?.username || 'AMOGUS'
                    }?set=set4`
              }
              alt='profile-img'
            />
          </div>
          {withEdit && (
            <Tooltip
              trigger='click'
              interactive
              position='right-end'
              html={
                <div className='flex flex-col'>
                  <Button className='px-1 text-xs'>Upload Foto</Button>
                  <Button className='bg-rose-400 text-xs hover:bg-rose-500'>
                    Hapus Foto
                  </Button>
                </div>
              }
            >
              <button className='rounded-full p-1 ring-2 ring-primary-200'>
                <FaPencilAlt className='text-xl' />
              </button>
            </Tooltip>
          )}
          <div className='creator-name-id'>
            <h4 className='artist-name pos-rel'>
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
        <div className='profile-setting-list'>
          <ul>
            <li className={clsxm(router.pathname === '/profile' && 'active')}>
              <Link href='/profile'>
                <a>
                  <i className='flaticon-account'></i>Profil
                </a>
              </Link>
            </li>
            <li className={clsxm(router.pathname === '/seller' && 'active')}>
              <Link href='/seller'>
                <a>
                  <i className='flaticon-newspaper'></i>Iklan
                </a>
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleLogout()}
                className='space-x-4 hover:text-primary-500'
              >
                <i className='flaticon-logout'></i>
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
