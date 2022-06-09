import React from 'react';

const ExploreArtsBar = () => {
  return (
    <div className='row wow fadeInUp'>
      <div className='col-lg-12'>
        <form action='#' className='art-filter-row'>
          <div className='filter-by-search mb-30'>
            <div className='common-select-arrow common-select-arrow-50'>
              <select className='item-category-select'>
                <option value='1'>All Artworks</option>
                <option value='2'>Music</option>
                <option value='3'>Games</option>
                <option value='4'>Software</option>
                <option value='5'>Video</option>
                <option value='6'>Cartoon</option>
                <option value='7'>Scenary</option>
                <option value='8'>Art</option>
              </select>
            </div>
            <div className='filter-search-input'>
              <input type='text' placeholder='Search keyword' />
              <button>
                <i className='fal fa-search'></i>
              </button>
            </div>
          </div>
          <div className='filter-by-sale d-flex mb-30'>
            <div className='select-category-title'>
              <i className='flaticon-filter'></i> Filters by
            </div>
            <div className='common-select-arrow common-select-arrow-50'>
              <select className='sale-category-select'>
                <option value='1'>Auction</option>
                <option value='2'>Fixed</option>
                <option value='3'>On Sale</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExploreArtsBar;
