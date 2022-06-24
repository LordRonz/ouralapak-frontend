import Link from 'next/link';
import React from 'react';

import CustomLink from '@/components/links/CustomLink';

const Footer = () => {
  return (
    <footer className='footer1-bg'>
      <section className='footer-area footer-area1 footer-area1-bg pt-100 pb-50'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='footer-widget footer1-widget footer1-widget1 mb-40'>
                <div className='footer-logo mb-30'>
                  <Link href='/'>
                    <a className='logo-bb'>
                      <img
                        src='/images/ouralapak_logo_long.png'
                        alt='logo-img'
                      />
                    </a>
                  </Link>
                  <Link href='/'>
                    <a className='logo-bw'>
                      <img
                        src='/images/ouralapak_logo_long.png'
                        alt='logo-img'
                      />
                    </a>
                  </Link>
                </div>
                <p className='mb-35'>
                  We provide one-stop solutions for all IT items; your bliss is
                  just a click away. Star Tech trusts in quality client
                </p>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='footer-widget footer1-widget footer1-widget2 mb-40'>
                <div className='footer-widget-title'>
                  <h4>Layanan</h4>
                </div>
                <ul>
                  <li>
                    <CustomLink className='border-none' href='/seller'>
                      Jual Akun
                    </CustomLink>
                  </li>
                  <li>
                    <CustomLink className='border-none' href='/beli-akun'>
                      Beli Akun
                    </CustomLink>
                  </li>
                  <li>
                    <CustomLink className='border-none' href='/rekber'>
                      Jasa Rekber
                    </CustomLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='footer-widget footer1-widget footer1-widget3 mb-40 '>
                <div className='footer-widget-title'>
                  <h4>Sosial Media</h4>
                </div>
                <div className='social__links footer__social'>
                  <ul>
                    <li>
                      <a href='#'>
                        <i className='fab fa-facebook-f'></i>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <i className='fab fa-twitter'></i>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <i className='fab fa-instagram'></i>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <i className='fab fa-linkedin-in'></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
