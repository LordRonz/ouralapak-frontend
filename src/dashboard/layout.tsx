import DashboardProvider from '@/dashboard/provider/context';
import Overlay from '@/dashboard/provider/overlay';
import SideNavigation from '@/dashboard/sidenavigation';
import TopNavigation from '@/dashboard/topnavigation';

/*	w-[calc(100%-16rem)] class get the remain width of the main component from lg:viewport by subtracting
(the total width by the width of the side navigation component which is w-64 = 16rem)*/

const style = {
  container: `dark:!bg-[#0e141b] !h-screen !overflow-hidden !relative`,
  mainContainer: `!flex !flex-col !h-screen !pl-0 !w-full !lg:space-y-4 !lg:w-[calc(100%-16rem)]`,
  main: `!h-screen !overflow-auto !pb-36 !pt-8 !px-2 !md:pb-8 !md:pt-4 !md:px-8 !lg:pt-0`,
};

const DashboardLayout = ({
  superAdmin = false,
  children,
}: {
  superAdmin?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <DashboardProvider>
      <div className={style.container}>
        <div className='!flex !items-start'>
          <Overlay />
          <SideNavigation mobilePosition='left' superAdmin={superAdmin} />
          <div className={style.mainContainer}>
            <TopNavigation />
            <main className={style.main}>{children}</main>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
