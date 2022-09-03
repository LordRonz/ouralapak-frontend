import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { API_URL } from '@/constant/config';
import DashboardProvider from '@/dashboard/provider/context';
import Overlay from '@/dashboard/provider/overlay';
import SideNavigation from '@/dashboard/sidenavigation';
import TopNavigation from '@/dashboard/topnavigation';
import Roles from '@/types/roles';
import User from '@/types/user';

/*	w-[calc(100%-16rem)] class get the remain width of the main component from lg:viewport by subtracting
(the total width by the width of the side navigation component which is w-64 = 16rem)*/

const style = {
  container: `dark:!bg-[#0e141b] !h-screen !overflow-hidden !relative`,
  mainContainer: `!flex !flex-col !h-screen !pl-0 !w-full lg:!space-y-4 lg:!w-[calc(100%-15rem)]`,
  main: `!h-screen !overflow-auto !pb-36 !pt-8 !px-2 md:!pb-8 md:!pt-4 md:!px-6 lg:!pt-0`,
};

const DashboardLayout = ({
  children,
}: {
  superAdmin?: boolean;
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const { data: profile, error } = useSWR<{
    data: User;
    message: string;
    success: boolean;
  }>(
    mounted
      ? stringifyUrl({
          url: `${API_URL}/profile`,
        })
      : null
  );

  if (error) {
    router.push('/');
  }

  return (
    <DashboardProvider>
      <div className={style.container}>
        <div className='!flex !items-start'>
          <Overlay />
          <SideNavigation
            mobilePosition='left'
            superAdmin={profile?.data.role.includes('SU' as Roles)}
          />
          <div className={style.mainContainer}>
            <TopNavigation user={profile?.data} />
            <main className={style.main}>{children}</main>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
