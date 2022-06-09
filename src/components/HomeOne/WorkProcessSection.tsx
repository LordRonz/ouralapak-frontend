import Link from 'next/link';
import React from 'react';

const WorkProcessSection = () => {
  const WorkProcessItem = [
    {
      WorkProcessStep: 'Step',
      WorkProcessImage: 'assets/img/shape/connect-icon.png',
      WorkProcessTitle: 'Connect your wallet',
      WorkProcessDesc:
        'NFTs are the latest and greatest application of blockchain technology, and marketplace has become theplatform for NFT.',
      WorkProcessLink: '/wallet-connect',
    },
    {
      WorkProcessStep: 'Step',
      WorkProcessImage: 'assets/img/shape/create-collection.png',
      WorkProcessTitle: 'Create Collection',
      WorkProcessDesc:
        'Oction is the premier marketplace for which are digital items you can truly own.Digital Items have existed like this.',
      WorkProcessLink: '/explore-arts',
    },
    {
      WorkProcessStep: 'Step',
      WorkProcessImage: 'assets/img/shape/list-icon.png',
      WorkProcessTitle: 'List them to sale',
      WorkProcessDesc:
        'List the collection & artworks to the blockchain network acts as the decentralized ledger that tracks the ownership.',
      WorkProcessLink: '/upload',
    },
  ];

  return (
    <section className='work-process-area pt-110 pb-100'>
      <div className='container'>
        <div className='row wow fadeInUp'>
          <div className='col-lg-12'>
            <div className='section-title1 pos-rel mb-40 text-center'>
              <h2 className='section-main-title1'>Create and sell your NFTs</h2>
              <p>
                Here are a few reasons why you should choose Oction for sell
                your NFT
              </p>
            </div>
          </div>
        </div>
        <div className='work-processes'>
          {WorkProcessItem && (
            <div className='row wow fadeInUp'>
              {WorkProcessItem.map((WorkProcessSection, num) => (
                <div key={num} className='col-lg-4 col-md-6'>
                  <div className='work-process-single mb-30 pos-rel'>
                    <div className='step'>
                      {WorkProcessSection.WorkProcessStep}
                    </div>
                    <div className='work-process-content'>
                      <div className='process-icon mb-40'>
                        <img
                          src={WorkProcessSection.WorkProcessImage}
                          alt='img'
                        />
                      </div>
                      <h4 className='process-title'>
                        <Link href={WorkProcessSection.WorkProcessLink}>
                          <a>{WorkProcessSection.WorkProcessTitle}</a>
                        </Link>
                      </h4>
                      <p>{WorkProcessSection.WorkProcessDesc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
