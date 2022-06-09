import Link from 'next/link';
import React from 'react';

const FooterTwo = () => {
  return (
    <footer className='footer2-bg'>
      <div className='copyright-area copyright2-area'>
        <div className='c-container-1 container'>
          <div className='copyright2-inner'>
            <div className='row align-items-center'>
              <div className='col-lg-4 col-md-4 order-md-2'>
                <div className='footer-logo text-center'>
                  <Link href='/'>
                    <a className='logo-bb'>
                      <img
                        src='assets/img/logo/oction-logo.png'
                        alt='logo-img'
                      />
                    </a>
                  </Link>
                  <Link href='/'>
                    <a className='logo-bw'>
                      <img
                        src='assets/img/logo/oction-logo-bw.png'
                        alt='logo-img'
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className='col-lg-4 col-md-4 order-md-1'>
                <div className='copyright-text copyright2-text text-md-start text-center'>
                  © Copyrighted & Designed by{' '}
                  <a href='https://themeforest.net/user/bdevs'>BDevs</a>
                </div>
              </div>
              <div className='col-lg-4 col-md-4 order-md-3'>
                <div className='social__links footer__social text-md-end text-center'>
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
      </div>
    </footer>
  );
};

export default FooterTwo;
