import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import clsxm from '@/lib/clsxm';

export type MainCardProp = {
  image?: string;
  title?: string;
  content?: string;
  slug: string;
  price: string;
};

const MainCard = ({ slug, image, title, content, price }: MainCardProp) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-10% 0px',
  });

  return (
    <a
      href={`/collection/${slug}`}
      target='_blank'
      className='text-xl font-semibold'
      rel='noopener noreferrer'
    >
      <div
        ref={ref}
        className={clsxm(
          'relative transform overflow-hidden rounded-lg bg-gray-300 transition duration-200 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800',
          'opacity-0 transition duration-500 ease-out motion-reduce:opacity-100',
          'ring-primary-300 hover:ring',
          inView && 'opacity-100'
        )}
      >
        {image && (
          <div className='relative h-72 overflow-hidden rounded-b-lg'>
            <Image alt={title} src={image} layout='fill' objectFit='cover' />
          </div>
        )}
        <div className='px-4 pt-4 pb-6'>
          {title}
          <p className='text-sm'>{content}</p>
          <div className='mt-4 flex justify-end text-primary-600 dark:text-primary-200'>{`Rp. ${price}`}</div>
        </div>
      </div>
    </a>
  );
};

export default MainCard;
