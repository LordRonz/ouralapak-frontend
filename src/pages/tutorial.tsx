import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import Header from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';
import Tutorial from '@/components/Tutorial/InvoiceMain';

const TutorialPage = () => {
  return (
    <>
      <Seo templateTitle='Tutorial' />
      <AnimatePage>
        <Header />
        <Tutorial />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default TutorialPage;
