import { HomeRoute, homeMetadata } from '@/components/routes';

export const metadata = homeMetadata('ar');
export default function Page() {
  return <HomeRoute lang="ar" />;
}
