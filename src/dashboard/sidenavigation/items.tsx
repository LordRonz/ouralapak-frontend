import Link from 'next/link';
import { useRouter } from 'next/router';

import data, { dataSuperAdmin } from '@/dashboard/sidenavigation/data';
import clsxm from '@/lib/clsxm';

const style = {
  title: `!mx-4 !text-sm`,
  section: `!pl-5 dark:!text-white !text-black !mb-6 !uppercase !lg:pl-6`,
  active: `!border-l-4 !border-white !lg:border-l-0 !lg:border-r-4`,
  link: `!flex !items-center dark:!text-gray-200 !justify-start !my-9 !px-3 !w-full dark:hover:!text-white`,
};

const SidenavItems = ({ superAdmin = false }: { superAdmin?: boolean }) => {
  const { asPath } = useRouter();
  return (
    <ul className='md:!pl-6'>
      <li>
        {superAdmin
          ? dataSuperAdmin.map((section) => (
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
                      <span>{item.icon}</span>
                      <span className={style.title}>{item.title}</span>
                    </a>
                  </Link>
                ))}
              </div>
            ))
          : data.map((section) => (
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
                      <span>{item.icon}</span>
                      <span className={style.title}>{item.title}</span>
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
