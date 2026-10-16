import { ContactRoute, contactMetadata } from '@/components/routes';

export const metadata = contactMetadata('en');
export default function Page() {
  return <ContactRoute lang="en" />;
}
