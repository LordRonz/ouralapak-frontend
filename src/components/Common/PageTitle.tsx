import Link from 'next/link';
import React from 'react';

type BreadcrumbsProp = {
  breadcrumbTitle?: string;
  breadcrumbSubTitle: string;
};

const Breadcrumbs = ({ breadcrumbSubTitle }: BreadcrumbsProp) => {
  return (
    <section className='page-title-area pt-3 pb-3'>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-12'>
            <div className='page-title'>
              <div className='breadcrumb-menu'>
                <nav className='breadcrumb-trail breadcrumbs'>
                  <ul className='trail-items'>
                    <li className='trail-item trail-begin'>
                      <Link href='/'>
                        <a>Home</a>
                      </Link>
                    </li>
                    <li className='trail-item trail-end'>
                      <span>{breadcrumbSubTitle}</span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;
