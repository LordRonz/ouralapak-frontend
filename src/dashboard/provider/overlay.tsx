import { useToggle } from '@/dashboard/provider/context';
import clsxm from '@/lib/clsxm';

// The overlay will only be visible on small screens to emphasize the focus on the side navigation when it is open.
const Overlay = () => {
  const { open } = useToggle();
  return (
    <div
      className={clsxm(
        open &&
          '!lg:hidden !fixed !left-0 !top-0 !z-30 !h-screen !w-screen !bg-light !opacity-40 dark:!bg-black'
      )}
    />
  );
};

export default Overlay;
