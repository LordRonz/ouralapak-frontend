import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { Product } from '@/data/productData';
import { specificProduct } from '@/redux/features/productSlice';

const ExploreArtsSingle = ({ product }: { product: Product }) => {
  // distructure items
  const {
    id,
    wrapperClass,
    img,
    tag,
    featureClass,
    count,
    bid,
    share,
    report,
    profileImage,
    artistId,
    title,
    currentBid,
    price,
    activity,
  } = product;
  // dispatch
  const dispatch = useDispatch();
  // handleProductDetails
  const handleProductDetails = () => {
    dispatch(specificProduct(id));
  };

  return (
    <div className={wrapperClass}>
      <div className='art-item-single mb-30'>
        <div className='art-item-wraper'>
          <div className='art-item-inner'>
            <div className='art-item-img relative'>
              <div className={featureClass}>
                <i className='fas fa-star'></i>
                {tag}
              </div>
              <div className='art-action'>
                <button className='art-action-like'>
                  <i className='flaticon-heart'></i>
                </button>
                <div className='art-action-like-count'>{count}</div>
                <div className='art-action-collection'>
                  <i className='flaticon-plus-sign'></i>
                </div>
              </div>
              <a href='#' className='place-bid'>
                {bid}
              </a>
              <Link href='/art-details'>
                <a onClick={handleProductDetails}>
                  <img src={img} alt='art-img' />
                </a>
              </Link>
            </div>
            <div className='art-item-content relative'>
              <div className='art-3dots-menu'>
                <div className='art-3dots-action'>
                  <ul>
                    <li>
                      <a href='#'>
                        <i className='fal fa-share-alt'></i>
                        {share}
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <i className='fal fa-flag-alt'></i>
                        {report}
                      </a>
                    </li>
                  </ul>
                </div>
                <button className='art-3dots-icon'>
                  <i className='fal fa-ellipsis-v'></i>
                </button>
              </div>
              <div className='artist'>
                <div className='profile-img relative'>
                  <Link href='/creator-profile'>
                    <a>
                      <img src={profileImage} alt='profile-img' />
                    </a>
                  </Link>
                  <div className='profile-verification verified'>
                    <i className='fas fa-check'></i>
                  </div>
                </div>
                <div className='artist-id'>{artistId}</div>
              </div>
              <h4 className='art-name'>
                <Link href='/art-details'>
                  <a onClick={handleProductDetails}>{title}</a>
                </Link>
              </h4>
              <div className='art-meta-info'>
                <div className='art-meta-item'>
                  <div className='art-meta-type'>{currentBid}</div>
                  <div className='art-price'>{price}</div>
                </div>
                <div className='art-activity-btn'>
                  <Link href='/activity'>
                    <a className='art-activity'>
                      <i className='fal fa-waveform-path'></i>
                      {activity}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreArtsSingle;
