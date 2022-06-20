import clsxm from '@/lib/clsxm';

const enum ButtonVariant {
  primary,
  secondary,
  outline,
}

export type ButtonProps = {
  readonly variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithoutRef<'button'>;

const ButtonGradient = ({
  children,
  className,
  disabled,
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type='button'
      className={clsxm(
        'relative inline-block h-12 overflow-hidden rounded-md bg-gradient-to-r bg-[length:200%_100%] px-9 text-base font-semibold leading-10 transition-all duration-300 hover:bg-100',
        variant === 'primary' &&
          'from-primary-300 via-primary-400 to-primary-500',
        variant === 'secondary' &&
          'from-secondary-300 via-secondary-400 to-secondary-500',
        variant === 'outline' && [
          'text-primary-500',
          'border border-primary-500',
          'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
        ],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonGradient;
