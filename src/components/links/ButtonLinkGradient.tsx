import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

const enum ButtonVariant {
  primary,
  secondary,
  outline,
  tertiary,
}

export type ButtonLinkGradientProps = {
  readonly variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

const ButtonLinkGradient = ({
  children,
  className,
  variant = 'primary',
  ...rest
}: ButtonLinkGradientProps) => {
  return (
    <UnstyledLink
      type='button'
      className={clsxm(
        'relative inline-block h-10 overflow-hidden rounded-md bg-gradient-to-r bg-[length:200%_100%] px-9 text-base font-semibold !leading-10 text-white transition-all duration-300 hover:bg-100',
        variant === 'primary' &&
          'from-primary-300 via-primary-400 to-primary-500',
        variant === 'secondary' &&
          'from-secondary-300 via-secondary-400 to-secondary-500',
        variant === 'tertiary' &&
          'from-tertiary-300 via-tertiary-400 to-tertiary-500',
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
    </UnstyledLink>
  );
};

export default ButtonLinkGradient;
