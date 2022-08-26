import { useRouter } from 'next/router';

import AnimatePage from '@/components/AnimatePage';
import InvoiceMain from '@/components/Invoice/InvoiceMain';
import Footer from '@/components/Layout/Footer/FooterOne/Footer';
import HeaderIklan from '@/components/Layout/Header/HeaderIklan';
import Seo from '@/components/Seo';

const Invoice = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Seo templateTitle='Invoice' />
      <AnimatePage>
        <HeaderIklan />
        {slug && <InvoiceMain no_invoice={slug as string} />}
        <Footer />
      </AnimatePage>
    </>
  );
};

export default Invoice;
