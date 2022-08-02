import React from 'react';
import ReactPaginate from 'react-paginate';
import { ReactPaginateProps } from 'react-paginate';

type PaginationProps = {
  pageCount: number;
  pageRangeDisplayed?: number;
  currentPage?: number;
  onPageChange?: (selectedItem: { selected: number }) => void;
} & ReactPaginateProps;

const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
  pageRangeDisplayed = 5,
}: PaginationProps) => {
  return (
    <div className='basic-pagination mb-30 mt-20'>
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
