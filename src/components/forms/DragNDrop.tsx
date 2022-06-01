import type { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import clsxm from '@/lib/clsxm';

export type DragNDropProps = {
  readonly className?: string;
  readonly rootProps: DropzoneRootProps;
  readonly inputProps: DropzoneInputProps;
} & React.ComponentPropsWithoutRef<'input'> &
  Pick<React.ComponentPropsWithRef<'div'>, 'ref'>;

const DragNDrop = ({
  children,
  className,
  ref,
  rootProps,
  inputProps,
  ...rest
}: DragNDropProps) => {
  return (
    <>
      <div
        ref={ref}
        {...rootProps}
        className={clsxm(
          'relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-primary-400 p-14 text-center text-2xl dark:border-primary-100',
          className
        )}
      >
        {children}
      </div>
      <input type='file' className='hidden' {...rest} {...inputProps} />
    </>
  );
};

export default DragNDrop;
