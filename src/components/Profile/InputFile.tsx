import { useRef } from 'react';

import clsxm from '@/lib/clsxm';

import ButtonGradient from '../buttons/ButtonGradient';

export type StyledInputFileProps = {
  containerClassName?: string;
  fileName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

const InputFile = ({
  onChange,
  className,
  containerClassName,
  key = Date.now(),
  fileName = 'File belum dipilih',
  children,
}: StyledInputFileProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref?.current?.click();
  };

  return (
    <div
      className={clsxm(
        'file-input flex items-center gap-x-2',
        containerClassName
      )}
    >
      <ButtonGradient onClick={handleClick}>Pilih File</ButtonGradient>
      <input
        type='file'
        onChange={onChange}
        className={clsxm('hidden', className)}
        value={undefined}
        key={key}
        ref={ref}
      />
      <span className='text-neutral-500 dark:text-neutral-400'>{fileName}</span>
      {children}
    </div>
  );
};

export default InputFile;
