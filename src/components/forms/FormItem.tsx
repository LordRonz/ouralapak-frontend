import * as React from 'react';

import clsxm from '@/lib/clsxm';

type FormItemProps = {
  errorMessage?: string;
  children: React.ReactNode;
  innerClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const FormItem = ({
  className,
  innerClassName,
  children,
  errorMessage,
  ...rest
}: FormItemProps) => {
  return (
    <div className={clsxm('grid grid-rows-3', className)} {...rest}>
      <div className={clsxm('row-span-2 space-y-2', innerClassName)}>
        {children}
      </div>
      <p className='text-red-500'>{errorMessage}</p>
    </div>
  );
};

export default FormItem;
