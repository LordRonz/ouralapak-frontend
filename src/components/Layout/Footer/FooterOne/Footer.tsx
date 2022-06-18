import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='footer1-bg'>
      <section className='footer-area footer-area1 footer-area1-bg pt-100 pb-50'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='footer-widget footer1-widget footer1-widget1 mb-40'>
                <div className='footer-logo mb-30'>
                  <Link href='/'>
                    <a className='logo-bb'>
                      <img
                        src='images/ouralapak_logo_long.png'
                        alt='logo-img'
                      />
                    </a>
                  </Link>
                  <Link href='/'>
                    <a className='logo-bw'>
                      <img
                        src='images/ouralapak_logo_long.png'
                        alt='logo-img'
                      />
                    </a>
                  </Link>
                </div>
                <p className='mb-35'>
                  We provide one-stop solutions for all IT items; your bliss is
                  just a click away. Star Tech trusts in quality client
                </p>
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
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='footer-widget footer1-widget footer1-widget2 mb-40'>
                <div className='footer-widget-title'>
                  <h4>Layanan</h4>
                </div>
                <ul>
                  <li>
                    <Link href='/iklan'>
                      <a>Jual Akun</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/beli-akun'>
                      <a>Beli Akun</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/rekber'>
                      <a>Jasa Rekber</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='footer-widget footer1-widget footer1-widget3 mb-40 '>
                <div className='footer-widget-title'>
                  <h4>Explore Artworks</h4>
                </div>
                <ul>
                  <li>
                    <Link href='/explore-arts'>
                      <a>3D Artworks</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/explore-arts'>
                      <a>Photography</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/explore-arts'>
                      <a>Flat Illustration</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/explore-arts'>
                      <a>Painting</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/explore-arts'>
                      <a>Intro Videos</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className='footer-widget footer1-widget footer1-widget4 mb-40 '>
                <div className='footer-widget-title'>
                  <h4>Insight Community</h4>
                </div>
                <ul>
                  <li>
                    <Link href='/forum'>
                      <a>Global Partners</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/forum'>
                      <a>Forum</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/explore-arts'>
                      <a>Virtual World</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/forum'>
                      <a>Community</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/explore-arts'>
                      <a>Brand Assets</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
