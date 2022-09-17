import clsxm from '@/lib/clsxm';

export type StyledInputFileProps = {
  labelClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

const StyledInputFile = ({
  onChange,
  className,
  labelClassName,
  key = Date.now(),
  children,
}: StyledInputFileProps) => {
  return (
    <label
      className={clsxm(
        'file-input !rounded-lg !bg-[#87A4E9] text-white',
        labelClassName
      )}
    >
      <input
        type='file'
        onChange={onChange}
        className={clsxm('hidden', className)}
        value={undefined}
        key={key}
      />
      {children}
    </label>
  );
};

export default StyledInputFile;
