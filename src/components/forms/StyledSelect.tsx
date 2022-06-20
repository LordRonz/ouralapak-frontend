import * as React from 'react';

import clsxm from '@/lib/clsxm';

type StyledSelectProps = {
  underline?: boolean;
} & React.ComponentPropsWithRef<'select'>;

const StyledSelect = (
  { className, children, underline = false, ...rest }: StyledSelectProps,
  ref: React.ForwardedRef<null>
) => {
  return (
    <select
      className={clsxm(
        'w-full rounded-md dark:!bg-dark',
        underline ? 'border-0 border-b-2' : 'border',
        'border-gray-800 dark:!border-gray-500',
        'dark:!focus:border-primary-300 transition-all duration-200 focus:border-primary-300 focus:outline-none focus:ring-0',
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </select>
  );
};

export default React.forwardRef(StyledSelect);
