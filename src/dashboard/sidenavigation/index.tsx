import { useToggle } from '@/dashboard/provider/context';
import SidenavHeader from '@/dashboard/sidenavigation/header';
import SidenavItems from '@/dashboard/sidenavigation/items';
import clsxm from '@/lib/clsxm';

const style = {
  mobilePosition: {
    left: '!left-0',
    right: '!right-0',
  },
  close: `!hidden`,
  container: `!pb-32 lg:!pb-6 !w-60`,
  open: `!w-8/12 !absolute !z-40 sm:!w-5/12`,
  default: `dark:!bg-[#0e141b] !bg-white !h-screen !overflow-y-auto !top-0 lg:!block lg:!relative lg:!w-64 lg:!z-auto !text-dark`,
};

type SideNavigationProps = {
  mobilePosition: 'left' | 'right';
  superAdmin?: boolean;
};

const SideNavigation = ({ mobilePosition }: SideNavigationProps) => {
  const { open, ref } = useToggle();
  return (
    <>
      <aside
        ref={ref}
        className={clsxm(
          style.default,
          style.mobilePosition[mobilePosition],
          open ? style.open : style.close,
          'scrollbar'
        )}
      >
        <div className={style.container}>
          <SidenavHeader />
          <SidenavItems />
        </div>
      </aside>
      <style jsx>{`
        .scrollbar::-webkit-scrollbar {
          width: 0;
          background: transparent; /* make scrollbar transparent */
        }
        /* make scrollbar transparent on Firefox, IE and Edge*/
        .scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default SideNavigation;
