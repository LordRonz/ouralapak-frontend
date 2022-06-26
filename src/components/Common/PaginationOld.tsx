import React from 'react';

const Pagination = () => {
  return (
    <div className='basic-pagination mb-30 mt-20'>
      <ul>
        <li>
          <a className='prev page-numbers' href='#'>
            <i className='fal fa-angle-left'></i>
          </a>
        </li>
        <li>
          <span aria-current='page' className='page-numbers current'>
            01
          </span>
        </li>
        <li>
          <a className='page-numbers' href='#'>
            02
          </a>
        </li>
        <li>
          <a className='next page-numbers' href='#'>
            <i className='fal fa-angle-right'></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
