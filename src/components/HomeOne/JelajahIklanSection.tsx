import React from 'react';

import { IklanHome } from '@/types/iklan';

import IklanCardSingle from '../Cards/IklanCardSingle';

const JelajahIklanSection = ({ iklans }: { iklans: IklanHome[] }) => {
  return (
    <section className='artworks-area artworks-area-bg pt-110 pb-100 z-index-1'>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-4'>
            <div className='section-title1'>
              <h2 className='section-main-title1 mb-40'>Jelajahi Akun</h2>
            </div>
          </div>
          <div className='col-lg-8'>
            <form action='#' className='artwork-filter-row mb-40'>
              <div className='common-select-arrow common-select-arrow-40 white-bg'>
                <select
                  name='s-t-select'
                  id='s-t-select'
                  className='sale-type-select'
                >
                  <option value='1'>Sale Type</option>
                  <option value='2'>Fixed</option>
                  <option value='3'>Auction</option>
                  <option value='3'>On sale</option>
                </select>
              </div>
              <div className='common-select-arrow common-select-arrow-40 white-bg'>
                <select
                  name='cat-select'
                  id='cat-select'
                  className='category-select'
                >
                  <option value='1'>Category</option>
                  <option value='2'>3D Artwork</option>
                  <option value='3'>Video</option>
                  <option value='3'>Animation</option>
                  <option value='3'>Games</option>
                  <option value='3'>Software</option>
                  <option value='3'>Photography</option>
                </select>
              </div>
              <div className='common-select-arrow common-select-arrow-40 white-bg'>
                <select
                  name='st-select'
                  id='st-select'
                  className='status-select'
                >
                  <option value='1'>Status</option>
                  <option value='2'>New</option>
                  <option value='3'>Featured</option>
                </select>
              </div>
              <div className='common-select-arrow common-select-arrow-40 white-bg'>
                <select
                  name='pr-select'
                  id='pr-select'
                  className='price-select'
                >
                  <option value='1'>Price</option>
                  <option value='2'>High</option>
                  <option value='3'>Medium</option>
                  <option value='3'>Low</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className='row wow fadeInUp'>
          {iklans.map((iklan, index) => (
            <IklanCardSingle iklan={iklan} key={`${iklan.id}${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JelajahIklanSection;
