import Link from 'next/link';
import React from 'react';

const WalletSection = ({ walletSpacing = 'pt-110' }) => {
  const walletList = [
    {
      walletTitle: 'User Friendly',
      walletImage: 'assets/img/wallet/oc-wallet-1.png',
    },
    {
      walletTitle: 'Binance',
      walletImage: 'assets/img/wallet/oc-wallet-2.png',
    },
    {
      walletTitle: 'Formatic',
      walletImage: 'assets/img/wallet/oc-wallet-3.png',
    },
    {
      walletTitle: 'Autherum',
      walletImage: 'assets/img/wallet/oc-wallet-4.png',
    },
    {
      walletTitle: 'Coinbase',
      walletImage: 'assets/img/wallet/oc-wallet-5.png',
    },
  ];

  return (
    <section className={`oc-wallet-area ${walletSpacing && walletSpacing}`}>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-12'>
            <div className='section-title1 pos-rel mb-40 text-center'>
              <h2 className='section-main-title1'>Set Your Wallet</h2>
              <p>Here are a few reasons why you should choose Oction</p>
            </div>
          </div>
        </div>
        <div className='row wow fadeInUp justify-content-center'>
          <div className='col-xl-10'>
            {walletList && (
              <div className='row'>
                {walletList.map((WalletSection, num) => (
                  <div key={num} className='col-xl-2 wallet-col-width-20'>
                    <Link href='/wallet-connect'>
                      <a>
                        <div className='oc-wallet mb-30 text-center'>
                          <div className='oc-wallet-icon text-center'>
                            <img
                              src={WalletSection.walletImage}
                              alt='img not found'
                            />
                          </div>
                          <h5 className='oc-wallet-title'>
                            {WalletSection.walletTitle}
                          </h5>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
