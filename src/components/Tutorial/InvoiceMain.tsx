import { Disclosure } from '@headlessui/react';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

const Tutorial = () => {
  return (
    <main>
      <section className='pb-12'>
        <div className='items-center justify-center'>
          <div className='mx-[0.75rem] !mt-24 overflow-auto rounded-xl border border-primary-400 bg-white p-8 dark:!bg-neutral-800 md:!mx-16'>
            <h1 className='m-0 mb-4 text-[28px]'>
              Tutorial Pembelian dan Penjualan akun di Ouralapak
            </h1>
            <div className='flex flex-col gap-y-5'>
              <Disclosure>
                {({ open }) => (
                  <div className='rounded-lg border'>
                    <Disclosure.Button
                      className={clsxm(
                        'flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-xl font-medium text-[#525358] hover:bg-primary-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                        open && 'text-[#1E53A3]'
                      )}
                    >
                      <span>Cara Trading Akun Mobile Legends</span>
                      <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#B89C74]'>
                        <HiChevronDown
                          className={clsxm(
                            open && 'rotate-180 transform',
                            'h-5 w-5 text-white'
                          )}
                        />
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                      <ol className='list-decimal space-y-2 pl-4'>
                        <li className='list-decimal pr-8'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit
                        </li>
                        <li className='list-decimal pr-8'>
                          Sed do eiusmod tempor incididunt ut labore et dolore
                          magna aliqua. Ut enim ad minim veniam
                        </li>
                        <li className='list-decimal pr-8'>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </li>
                      </ol>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <div className='rounded-lg border'>
                    <Disclosure.Button
                      className={clsxm(
                        'flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-xl font-medium text-[#525358] hover:bg-primary-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                        open && 'text-[#1E53A3]'
                      )}
                    >
                      <span>Cara Trading Akun Mobile Legends</span>
                      <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#B89C74]'>
                        <HiChevronDown
                          className={clsxm(
                            open && 'rotate-180 transform',
                            'h-5 w-5 text-white'
                          )}
                        />
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                      <ol className='list-decimal space-y-2 pl-4'>
                        <li className='list-decimal pr-8'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit
                        </li>
                        <li className='list-decimal pr-8'>
                          Sed do eiusmod tempor incididunt ut labore et dolore
                          magna aliqua. Ut enim ad minim veniam
                        </li>
                        <li className='list-decimal pr-8'>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </li>
                      </ol>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <div className='rounded-lg border'>
                    <Disclosure.Button
                      className={clsxm(
                        'flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-xl font-medium text-[#525358] hover:bg-primary-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                        open && 'text-[#1E53A3]'
                      )}
                    >
                      <span>Cara Trading Akun Mobile Legends</span>
                      <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#B89C74]'>
                        <HiChevronDown
                          className={clsxm(
                            open && 'rotate-180 transform',
                            'h-5 w-5 text-white'
                          )}
                        />
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                      <ol className='list-decimal space-y-2 pl-4'>
                        <li className='list-decimal pr-8'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit
                        </li>
                        <li className='list-decimal pr-8'>
                          Sed do eiusmod tempor incididunt ut labore et dolore
                          magna aliqua. Ut enim ad minim veniam
                        </li>
                        <li className='list-decimal pr-8'>
                          Quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor
                          in reprehenderit in voluptate velit esse cillum dolore
                          eu fugiat nulla pariatur.
                        </li>
                      </ol>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tutorial;
