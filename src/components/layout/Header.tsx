/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import * as React from 'react';

import Accent from '@/components/Accent';
import ColorModeToggle from '@/components/ColorModeToggle';
import UnstyledLink from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

export const links = [
  { href: '/explore', label: 'Explore' },
  { href: '/login', label: 'Login' },
];

const Header = () => {
  const { theme, setTheme } = useTheme();

  //#region  //*=========== Route Functionality ===========
  const router = useRouter();
  /** Ex: /projects/petrolida-2021 -> ['', 'projects', 'petrolida-2021'] */
  const arrOfRoute = router.route.split('/');
  const baseRoute = '/' + arrOfRoute[1];
  //#endregion  //*======== Route Functionality ===========

  //#region  //*=========== Scroll Shadow ===========
  const [onTop, setOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Scroll Shadow ===========

  return (
    <header
      className={clsxm(
        'sticky top-0 z-50 transition-shadow',
        !onTop && 'shadow-lg'
      )}
    >
      <a
        href='#skip-nav'
        className={clsxm(
          'rounded-sm p-2 transition',
          'font-medium text-dark dark:text-white',
          'bg-light dark:bg-dark',
          'group dark:hover:text-primary-300',
          'focus:outline-none focus:ring focus:ring-primary-300',
          'absolute top-4 left-4 z-[1000]',
          '-translate-y-16 focus:translate-y-0'
        )}
      >
        <Accent>Skip to content</Accent>
      </a>
      <div className='h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400' />
      <div className='bg-neutral-200 transition-colors dark:bg-neutral-800 dark:text-light'>
        <nav
          className={clsxm(
            'layout flex h-14 items-center justify-between py-2'
          )}
        >
          <Link href='/' passHref>
            <motion.a
              className='group relative z-50 flex items-center justify-center whitespace-nowrap font-bold transition duration-300 hover:transition md:text-xl'
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
            >
              <img
                alt='Ouralapak logo'
                src='/images/ouralapak_logo_long.png'
                width={180}
                height={38}
                className='inline opacity-100 transition duration-300'
              />
            </motion.a>
          </Link>
          <ul className='text-md flex items-center justify-between space-x-3 md:space-x-4 md:text-lg'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className={clsxm(
                    'rounded-sm py-2 transition-colors',
                    'font-bold text-black dark:text-light',
                    'group dark:hover:text-primary-300',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                    href === baseRoute && 'font-bold'
                  )}
                >
                  <span
                    className={clsxm(
                      'transition-colors',
                      'bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0',
                      href === baseRoute &&
                        'bg-primary-300/50 font-extrabold dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent'
                    )}
                  >
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
            <li>
              <ColorModeToggle value={theme} onChange={setTheme} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
