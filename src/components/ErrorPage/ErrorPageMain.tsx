import Link from 'next/link';
import React from 'react';

import Breadcrumbs from '@/components/Common/PageTitle';

const ErrorPageMain = () => {
  return (
    <main>
      <Breadcrumbs breadcrumbTitle='404 Error' breadcrumbSubTitle='404 Error' />

      <section className='error-404-area pt-130 pb-90'>
        <div className='container'>
          <div className='row justify-content-center wow fadeInUp'>
            <div className='col-lg-8'>
              <div className='error-404-wrapper pos-rel mb-40'>
                <div className=' error-404-inner'>
                  <div className='error-404-content text-center'>
                    <div className='error-404-img mb-30'>
                      <img
                        src='assets/img/shape/error-404.png'
                        alt='error-img'
                      />
                    </div>
                    <h4>Ooops! Page not Found</h4>
                    <p className='mb-30'>
                      Maybe this page has broken or not created. Come back to
                      the Homepage
                    </p>
                    <div className='error-404-btn'>
                      <Link href='/'>
                        <a className='fill-btn'>Back to Homepage</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ErrorPageMain;
