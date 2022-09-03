import Link from 'next/link';
import { useRouter } from 'next/router';

import data, { dataSuperAdmin } from '@/dashboard/sidenavigation/data';
import clsxm from '@/lib/clsxm';

const style = {
  title: `!mx-4 !text-sm`,
  section: `!pl-5 dark:!text-white !text-black !mb-6 !uppercase lg:!pl-6`,
  active: `!border-l-4 !border-primary-300`,
  link: `!flex !items-center dark:!text-gray-200 !justify-start !my-9 !px-3 !w-full dark:hover:!text-white`,
};

const SidenavItems = ({ superAdmin }: { superAdmin?: boolean }) => {
  const { asPath } = useRouter();
  return (
    <ul className='md:!pl-6'>
      <li>
        {(superAdmin ? dataSuperAdmin : data).map((section) => (
          <div className='!mb-12' key={section.section}>
            <div className={style.section}>{section.section}</div>
            {section.content.map((item) => (
              <Link href={item.link} key={item.title}>
                <a
                  className={clsxm(
                    style.link,
                    item.link === asPath && style.active
                  )}
                >
                  <div
                    className={clsxm(
                      'flex',
                      item.link === asPath &&
                        'rounded  bg-primary-300 px-2 py-1'
                    )}
                  >
                    <span>{item.icon}</span>
                    <span className={style.title}>{item.title}</span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ))}
      </li>
    </ul>
  );
};

export default SidenavItems;
