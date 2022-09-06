import 'swiper/css/bundle';

import React from 'react';
import { useSelector } from 'react-redux';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ExploreArtsSingle from '@/components/ExploreArts/ExploreArtsSingle';
import { RootState } from '@/redux/store';

const LiveOctionSlider = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className='auction-wrapper relative'>
      <div className='swiper-container auction-active'>
        <div className='swiper-wrapper'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              500: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            navigation={{
              nextEl: '.auction-button-next',
              prevEl: '.auction-button-prev',
            }}
          >
            <SwiperSlide>
              {products.slice(49, 50).map((product) => (
                <ExploreArtsSingle key={product.id} product={product} />
              ))}
            </SwiperSlide>
            <SwiperSlide>
              {products.slice(50, 51).map((product) => (
                <ExploreArtsSingle key={product.id} product={product} />
              ))}
            </SwiperSlide>
            <SwiperSlide>
              {products.slice(51, 52).map((product) => (
                <ExploreArtsSingle key={product.id} product={product} />
              ))}
            </SwiperSlide>
            <SwiperSlide>
              {products.slice(52, 53).map((product) => (
                <ExploreArtsSingle key={product.id} product={product} />
              ))}
            </SwiperSlide>
            <SwiperSlide>
              {products.slice(48, 49).map((product) => (
                <ExploreArtsSingle key={product.id} product={product} />
              ))}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className='auction-nav'>
        <div className='auction-button-prev square-nav-btn'>
          <i className='fal fa-long-arrow-left'></i>
        </div>
        <div className='auction-button-next square-nav-btn'>
          <i className='fal fa-long-arrow-right'></i>
        </div>
      </div>
    </div>
  );
};

export default LiveOctionSlider;
