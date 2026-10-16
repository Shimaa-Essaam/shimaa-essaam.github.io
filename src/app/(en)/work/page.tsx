import { WorkRoute, workMetadata } from '@/components/routes';

export const metadata = workMetadata('en');
export default function Page() {
  return <WorkRoute lang="en" />;
}
