import React from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '@/components/Common/PageTitle';
import PaginationOld from '@/components/Common/PaginationOld';
import ThemeChanger from '@/components/Common/ThemeChanger';
import ExploreCategorySlider from '@/components/Elements/Slider/ExploreCategorySlider';
import ExploreArtsBar from '@/components/ExploreArts/ExploreArtsBar';
import ExploreArtsSingle from '@/components/ExploreArts/ExploreArtsSingle';
import { RootState } from '@/redux/store';

const ExploreArtsMain = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <main>
      <ThemeChanger />

      <Breadcrumbs
        breadcrumbTitle='Explore Artworks'
        breadcrumbSubTitle='Explore'
      />

      <section className='artworks-area pt-130 pb-90'>
        <div className='container'>
          <ExploreCategorySlider />
          <ExploreArtsBar />
          <div className='row wow fadeInUp'>
            {products.slice(0, 24).map((product) => (
              <ExploreArtsSingle key={product.id} product={product} />
            ))}
          </div>
          <div className='row wow fadeInUp'>
            <div className='col-12'>
              <PaginationOld />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExploreArtsMain;
