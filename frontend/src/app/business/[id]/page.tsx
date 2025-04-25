import { generateStaticParams } from './generate-static-parameters';
import { BusinessUser } from '@/shared/components/business-user/business-user';

export { generateStaticParams };

const BusinessUserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <BusinessUser id={id} />;
};

export default BusinessUserPage;
