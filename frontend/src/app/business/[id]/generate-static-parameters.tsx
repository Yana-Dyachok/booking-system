import { getUsersByRoleApi } from '@/api/user.api';
import { IBusinessUserPreview } from '@/shared/types';

export async function generateStaticParams() {
  const data = await getUsersByRoleApi();
  if (!data || data.items.length === 0) {
    console.error('No data found');
    return [];
  }

  return data.items.map((el: IBusinessUserPreview) => ({ id: el.id }));
}
