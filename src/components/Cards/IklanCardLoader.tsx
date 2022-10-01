import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const IklanCardLoader = (props: IContentLoaderProps) => (
  <div className='col-span-6 md:col-span-3'>
    <ContentLoader viewBox='0 0 400 675' height='100%' width='100%' {...props}>
      <circle cx='30' cy='440' r='30' />
      <rect x='0' y='490' rx='4' ry='4' width='100' height='33' />
      <rect x='75' y='433' rx='4' ry='4' width='100' height='13' />
      <rect x='0' y='565' rx='4' ry='4' width='100' height='23' />
      <rect x='280' y='565' rx='4' ry='4' width='100' height='20' />
      <rect x='0' y='0' rx='5' ry='5' width='400' height='400' />
    </ContentLoader>
  </div>
);

IklanCardLoader.metadata = {
  name: 'AaronChristopher',
  github: 'lordronz',
  description: 'IklanCardLoader',
  filename: 'IklanCardLoader',
};

export default IklanCardLoader;
