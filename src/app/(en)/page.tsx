import { HomeRoute, homeMetadata } from '@/components/routes';

export const metadata = homeMetadata('en');
export default function Page() {
  return <HomeRoute lang="en" />;
}
