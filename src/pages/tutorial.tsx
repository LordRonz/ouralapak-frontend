import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import Seo from '@/components/Seo';
import Tutorial from '@/components/Tutorial/InvoiceMain';

const TutorialPage = () => {
  return (
    <>
      <Seo templateTitle='Tutorial' />
      <AnimatePage>
        <HeaderIklan />
        <Tutorial />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default TutorialPage;
