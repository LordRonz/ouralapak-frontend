import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

type Props = {
  buttonClassName?: string;
  className?: string;
  iconClassName?: string;
};

const ColorModeToggle = ({
  buttonClassName,
  className,
  iconClassName,
}: Props): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={clsxm('h-8 w-8', className)}>
      <button
        aria-label='Color mode toggle'
        className={clsxm(
          'flex h-full w-full items-center justify-center rounded-full transition-colors hover:bg-gray-400 dark:hover:bg-gray-500',
          buttonClassName
        )}
        type='button'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {mounted && (
          <>
            <FiSun
              className={clsxm(
                theme !== 'light' && 'hidden',
                'text-2xl',
                iconClassName
              )}
            />
            <FiMoon
              className={clsxm(
                theme !== 'dark' && 'hidden',
                'text-2xl',
                iconClassName
              )}
            />
          </>
        )}
      </button>
    </div>
  );
};

export default React.memo(ColorModeToggle);
