import { BusinessUser } from '@/shared/components/business-user/business-user';
import { generateStaticParams } from './generate-static-parameters';

export { generateStaticParams };

interface BusinessUserPageProps {
  params: Promise<{ id: string }>;
}

const BusinessUserPage = async ({ params }: BusinessUserPageProps) => {
  const resolvedParams = await params;

  if (!resolvedParams) {
    return <div>Error: Missing params</div>;
  }

  const { id } = resolvedParams;
  return <BusinessUser id={id} />;
};

export default BusinessUserPage;
