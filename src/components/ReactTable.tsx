/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import * as React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import {
  Column,
  PluginHook,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table';

import clsxm from '@/lib/clsxm';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props<T extends object = {}> = {
  data: readonly T[];
  columns: readonly Column<T>[];
  options?: Omit<TableOptions<T>, 'data' | 'columns'>;
  plugins?: PluginHook<T>[];
  className?: string;
  withFooter?: boolean;
  setFilter?: (s: string) => void;
  noSort?: number[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
const ReactTable = <T extends object>({
  data,
  columns,
  options,
  plugins = [],
  className,
  noSort,
  withFooter = true,
}: Props<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable<T>(
    { ...options, data, columns },
    useGlobalFilter,
    useSortBy,
    ...plugins
  );

  return (
    <div className={clsx('flex w-full flex-col', className)}>
      <div className='-my-2 mt-2 !overflow-x-auto'>
        <div className='inline-block min-w-full py-2 align-middle'>
          <div className='overflow-hidden border-b border-gray-200 shadow-sm dark:!border-gray-800 sm:rounded-lg'>
            <table
              {...getTableProps()}
              className='min-w-full divide-y divide-gray-200 !font-table dark:!divide-gray-800'
            >
              <thead className='bg-gray-50 dark:!bg-gray-700'>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column: any, i) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={column.id}
                        scope='col'
                        className='group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:!text-gray-200'
                      >
                        <div
                          className={clsxm(
                            'relative flex items-center gap-4 py-1',
                            'justify-start text-left',
                            (column.id.toLowerCase() === 'status' ||
                              column.id.toLowerCase() === 'action') &&
                              'justify-center text-center'
                          )}
                        >
                          <p className='m-0'>{column.render('Header')}</p>
                          {!(noSort && noSort.some((v) => v == i)) && (
                            <span className='flex flex-col items-center justify-center'>
                              {column.isSorted ? (
                                <>
                                  {column.isSortedDesc ? (
                                    <GoTriangleDown
                                      className={clsx(
                                        'transition-opacity',
                                        'text-base text-gray-700 dark:!text-gray-200'
                                      )}
                                    />
                                  ) : (
                                    <GoTriangleUp
                                      className={clsx(
                                        '-mt-1 transition-opacity',
                                        'text-base text-gray-700 dark:!text-gray-200'
                                      )}
                                    />
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows?.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={index}
                      className={clsx(
                        index % 2 === 0
                          ? 'bg-white dark:!bg-dark'
                          : 'bg-gray-50 dark:!bg-gray-800'
                      )}
                    >
                      {row?.cells?.map((cell, i) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={clsxm(
                              'max-w-xs overflow-hidden text-ellipsis whitespace-nowrap px-6 py-4 text-left text-sm text-gray-700',
                              i === 0
                                ? 'text-gray-900 dark:!text-gray-50'
                                : 'text-gray-500  dark:!text-gray-200',
                              (cell.column.id.toLowerCase() === 'status' ||
                                cell.column.id.toLowerCase() === 'action') &&
                                'text-center'
                            )}
                            key={i}
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {withFooter && (
                <tfoot className='bg-gray-50 dark:!bg-gray-700'>
                  {footerGroups.map((footerGroup, index) => (
                    <tr
                      {...footerGroup.getFooterGroupProps()}
                      key={index}
                      className='group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:!text-gray-200'
                    >
                      {footerGroup.headers.map((column) => (
                        <td
                          {...column.getFooterProps()}
                          className={clsx(
                            'px-6 py-3 text-sm font-medium uppercase tracking-wider text-gray-500 dark:!text-gray-200',
                            'text-center'
                          )}
                          key={column.id}
                        >
                          {column.render('Footer')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
