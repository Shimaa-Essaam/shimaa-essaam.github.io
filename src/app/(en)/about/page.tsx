import { AboutRoute, aboutMetadata } from '@/components/routes';

export const metadata = aboutMetadata('en');
export default function Page() {
  return <AboutRoute lang="en" />;
}
