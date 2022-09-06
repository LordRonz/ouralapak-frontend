import dynamic from 'next/dynamic';
import React from 'react';
const LiveOctionSlider = dynamic(
  () => import('../Elements/Slider/LiveOctionSlider'),
  {
    ssr: false,
  }
);

const LiveOctionSection = () => {
  return (
    <section className='live-auction-area pb-100 pt-80'>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-8'>
            <div className='section-title1 relative'>
              <div className='live-blink'></div>
              <h2 className='section-main-title1 pl-35 mb-40'>Live Bids</h2>
            </div>
          </div>
        </div>
        <div className='row wow fadeInUp'>
          <div className='col-lg-12'>
            <div className='auction-wrapper relative'>
              <LiveOctionSlider />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveOctionSection;
