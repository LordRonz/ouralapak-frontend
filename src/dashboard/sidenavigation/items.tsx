import Link from 'next/link';
import { useRouter } from 'next/router';

import data from '@/dashboard/sidenavigation/data';
import clsxm from '@/lib/clsxm';

const style = {
  title: `mx-4 text-sm`,
  section: `font-thin pl-5 text-white mb-6 uppercase lg:pl-6`,
  active: `border-l-4 border-white lg:border-l-0 lg:border-r-4`,
  link: `flex items-center text-gray-200 justify-start my-9 px-3 w-full hover:text-white`,
};

const SidenavItems = () => {
  const { asPath } = useRouter();
  return (
    <ul className='md:pl-6'>
      <li>
        {data.map((section) => (
          <div className='mb-12' key={section.section}>
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
