import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import ColorModeToggle from '@/components/ColorModeToggle';
import { mySwalOpts } from '@/constant/swal';
import { useToggle } from '@/dashboard/provider/context';

const MySwal = withReactContent(Swal);

const TopNavigation = () => {
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
            <div className='group !relative !flex !h-full !w-full !items-center lg:!w-64'>
              <div className='!absolute !flex !h-10 !w-auto !cursor-pointer !items-center !justify-center !p-3 !pr-2 !text-sm !uppercase !text-gray-500 sm:!hidden'>
                <svg
                  fill='none'
                  className='!relative !h-5 !w-5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <svg
                className='!pointer-events-none !absolute !left-0 !ml-4 !hidden !h-4 !w-4 !fill-current !text-gray-500 group-hover:!text-gray-400 sm:!block'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
              </svg>
              <input
                type='text'
                className='!block !w-full !rounded-2xl !bg-gray-100 !py-1.5 !pl-10 !pr-4 !leading-normal !text-gray-400 !ring-opacity-90 focus:!border-transparent focus:!outline-none focus:!ring-2 focus:!ring-blue-500'
                placeholder='Search'
              />
              <div className='!absolute !right-0 !mr-2 !hidden !h-auto !rounded-2xl !border !border-gray-300 !px-2 !py-1 !text-xs !text-gray-400 md:!block'>
                +
              </div>
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
                <img src='/assets/img/profile/profile4.jpg' alt='profile-img' />
                <div className='profile-verification verified'>
                  <i className='fas fa-check'></i>
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
