import clsxm from '@/lib/clsxm';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

const ButtonGradient = ({
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type='button'
      className={clsxm(
        'relative inline-block h-12 overflow-hidden rounded-md bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-[length:200%_100%] px-9 text-base font-semibold leading-10 transition-all duration-300 hover:bg-100',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonGradient;
