import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import ColorModeToggle from '@/components/ColorModeToggle';
import { API_URL } from '@/constant/config';
import { mySwalOpts } from '@/constant/swal';
import { useToggle } from '@/dashboard/provider/context';
import Roles from '@/types/roles';
import User from '@/types/user';

const MySwal = withReactContent(Swal);

const TopNavigation = ({ user }: { user?: User }) => {
  const { theme } = useTheme();
  const { toggle } = useToggle();
  const [isActive11, setActive11] = useState(true);
  const [, , removeToken] = useLocalStorage('token');
  const router = useRouter();
  const handleToggle11 = () => {
    setActive11(!isActive11);
  };
  const handleLogout = async () => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Yakin ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      ...mySwalOpts(theme),
    });
    if (isConfirmed) {
      removeToken();
      router.push('/login');
    }
  };
  return (
    <header className='!relative !z-10 !h-20 !items-center bg-white dark:!bg-[#0e141b]'>
      <div className='!flex-center !relative !mx-auto !flex !h-full !flex-col !justify-center !px-3'>
        <div className='lg:!max-w-68 !sm:pr-2 !relative !flex !w-full !items-center !pl-1 sm:!ml-0'>
          <div className='container !relative !left-0 !flex w-3/4'>
            <div className='group !relative !flex !h-full !w-12 !items-center'>
              <button
                type='button'
                aria-expanded='false'
                aria-label='Toggle sidenav'
                onClick={toggle}
                className='!text-4xl !text-black focus:!outline-none dark:!text-white lg:!hidden'
              >
                &#8801;
              </button>
            </div>
          </div>
          <div className='!relative !ml-5 !flex !w-1/4 !items-center !justify-end !p-1 sm:!right-auto sm:!mr-0'>
            <ColorModeToggle />
            <div className='profile-item profile-item-header d-none d-md-inline-block pos-rel ml-20'>
              <div
                className={`profile-img pos-rel ${
                  isActive11 ? '' : 'show-element'
                }`}
                onClick={handleToggle11}
              >
                <div className='profile-action'>
                  <ul>
                    <li>
                      <Link href='/profile'>
                        <a>
                          <i className='fal fa-user'></i>Profile
                        </a>
                      </Link>
                    </li>
                    <li>
                      <button
                        className='hover:text-primary-400'
                        onClick={() => handleLogout()}
                      >
                        <a>
                          <i className='fal fa-sign-out'></i>Logout
                        </a>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className='flex w-48 items-center justify-center gap-x-3'>
                  <img
                    src={
                      user?.profile_picture
                        ? `${API_URL}/${user?.profile_picture}`
                        : `/images/pfp.jpg`
                    }
                    alt='profile-img'
                    className='!rounded-xl'
                  />
                  <div className='w-full !overflow-hidden !text-ellipsis !whitespace-nowrap'>
                    <p className='!m-0 font-extrabold dark:!text-white'>
                      {user?.name}
                    </p>
                    <div className='flex items-center justify-start gap-x-1'>
                      <p className='!m-0 !text-ellipsis dark:!text-white'>
                        {user?.role.includes('SU' as Roles)
                          ? 'Super Admin'
                          : 'Admin'}
                      </p>
                      <MdOutlineKeyboardArrowDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
