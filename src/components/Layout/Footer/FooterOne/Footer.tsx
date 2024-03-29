import Link from 'next/link';
import queryString from 'query-string';
import React from 'react';
import useSWR from 'swr';

import CustomLink from '@/components/links/CustomLink';
import { API_URL } from '@/constant/config';
import Config from '@/types/config';

const Footer = () => {
  const { data: config } = useSWR<{
    data: Config;
    message: string;
    success: boolean;
  }>(() => `${API_URL}/master/config/4`);

  const getWaLink = () =>
    queryString.stringifyUrl({
      url: `https://wa.me/${config?.data?.value}`,
      query: {
        text: `Halo admin Oura Lapak,\n\nSaya ingin menggunakan jasa rekber Oura Lapak untuk pembelian akun di luar Oura Lapak. Boleh tanya-tanya dulu?`,
      },
    });

  return (
    <footer className='footer1-bg' id='footer'>
      <section className='footer-area footer-area1 footer-area1-bg pt-100 pb-50 !bg-neutral-900'>
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
                <p className='mb-35 text-white'>
                  We provide one-stop solutions for all IT items; your bliss is
                  just a click away. Star Tech trusts in quality client
                </p>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6 text-white'>
              <div className='footer-widget footer1-widget footer1-widget2 mb-40'>
                <div className='footer-widget-title'>
                  <h4 className='!font-black'>Layanan</h4>
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
                    <CustomLink className='border-none' href={getWaLink()}>
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
