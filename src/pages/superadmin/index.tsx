import Content from '@/components/content';
import DashboardLayout from '@/dashboard/layout';

const IndexPage = () => {
  return (
    <DashboardLayout superAdmin>
      <Content title='Super Admin' />
    </DashboardLayout>
  );
};

export default IndexPage;
