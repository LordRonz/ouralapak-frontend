// Import Swiper styles
import 'swiper/css/bundle';

import Link from 'next/link';
import React from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const ExploreCategorySlider = () => {
  const categoryList = [
    {
      categoryTitle: 'All Items',
      categoryImage: 'assets/img/svg-icon/021-star.svg',
    },
    {
      categoryTitle: 'Creative Artworks',
      categoryImage: 'assets/img/svg-icon/014-artwork.svg',
    },
    {
      categoryTitle: 'Videos',
      categoryImage: 'assets/img/svg-icon/015-video.svg',
    },
    {
      categoryTitle: 'Music',
      categoryImage: 'assets/img/svg-icon/016-music.svg',
    },
    {
      categoryTitle: 'Games',
      categoryImage: 'assets/img/svg-icon/017-video-game.svg',
    },
    {
      categoryTitle: 'Software',
      categoryImage: 'assets/img/svg-icon/018-software.svg',
    },
    {
      categoryTitle: 'Photography',
      categoryImage: 'assets/img/svg-icon/019-photography.svg',
    },
    {
      categoryTitle: 'Cartoons',
      categoryImage: 'assets/img/svg-icon/020-laughing.svg',
    },
  ];

  return (
    <div className='row wow fadeInUp'>
      <div className='col-lg-12'>
        <div className='categories-bar mb-30 relative'>
          <div className='swiper-container categories-bar-active'>
            {categoryList && (
              <div className='swiper-wrapper'>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={'auto'}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                  }}
                  navigation={{
                    nextEl: '.categories-bar-button-next',
                    prevEl: '.categories-bar-button-prev',
                  }}
                >
                  {categoryList.map((ExploreCategorySlider, num) => (
                    <SwiperSlide key={num}>
                      <div className='category-item'>
                        <Link href='/explore-arts'>
                          <a>
                            <img
                              src={ExploreCategorySlider.categoryImage}
                              alt='icon-img'
                            />{' '}
                            {ExploreCategorySlider.categoryTitle}
                          </a>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
          <div className='categories-nav'>
            <div className='categories-bar-button-prev'>
              <i className='fal fa-angle-left'></i>
            </div>
            <div className='categories-bar-button-next'>
              <i className='fal fa-angle-right'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategorySlider;
