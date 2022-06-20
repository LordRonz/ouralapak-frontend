import { HiPencil } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

const EditButton = ({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      type='button'
      className={clsxm(
        'rounded-full p-1 ring-green-400 transition hover:bg-green-500 focus:outline-none focus-visible:ring group-hover:block',
        className
      )}
      {...rest}
    >
      {children}
      <HiPencil />
    </button>
  );
};

export default EditButton;
