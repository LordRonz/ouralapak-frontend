import { useRouter } from 'next/router';

import AnimatePage from '@/components/AnimatePage';
import InvoiceBeli from '@/components/Invoice/InvoiceBeli';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderMain from '@/components/Layout/Header/Header';
import Seo from '@/components/Seo';

const Invoice = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Seo templateTitle='Invoice' />
      <AnimatePage>
        <HeaderMain />
        <InvoiceBeli no_invoice={slug as string} />
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Invoice;
