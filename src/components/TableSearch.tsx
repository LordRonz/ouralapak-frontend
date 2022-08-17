import { HiSearch } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

type TableSearchProp = {
  setFilter?: (s: string) => void;
};

const TableSearch = ({ setFilter }: TableSearchProp) => {
  return (
    <div>
      <label className='sr-only text-gray-500'>Filter</label>
      <div className='relative'>
        <input
          placeholder='Find...'
          className={clsxm(
            'w-full rounded-md dark:!bg-dark sm:max-w-xs',
            'px-6 py-2 pl-9',
            'placeholder-gray-400',
            'text-sm md:text-base',
            'border border-gray-300 dark:!border-gray-600',
            'dark:!focus:border-primary-300 focus:border-primary-300 focus:outline-none'
          )}
          onChange={(e) => setFilter && setFilter(e.target.value)}
        />
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'>
          <HiSearch className='text-xl text-gray-400' />
        </div>
      </div>
    </div>
  );
};

export default TableSearch;
