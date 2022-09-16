import React from 'react';
import ReactPaginate from 'react-paginate';
import { ReactPaginateProps } from 'react-paginate';

import clsxm from '@/lib/clsxm';

type PaginationProps = {
  pageCount: number;
  pageRangeDisplayed?: number;
  currentPage?: number;
  onPageChange?: (selectedItem: { selected: number }) => void;
  containerClassName?: string;
} & ReactPaginateProps;

const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
  containerClassName,
  pageRangeDisplayed = 5,
}: PaginationProps) => {
  return (
    <div className={clsxm('basic-pagination mb-30 mt-20', containerClassName)}>
      <ReactPaginate
        breakLabel='...'
        nextLabel={<i className='fal fa-angle-right'></i>}
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        forcePage={currentPage}
        previousLabel={<i className='fal fa-angle-left'></i>}
        renderOnZeroPageCount={() => null}
        pageLinkClassName='page-numbers'
        activeLinkClassName='current'
        previousLinkClassName='prev'
        nextLinkClassName='next'
      />
    </div>
  );
};

export default Pagination;
