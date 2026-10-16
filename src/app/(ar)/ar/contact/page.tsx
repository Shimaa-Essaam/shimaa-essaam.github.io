import { ContactRoute, contactMetadata } from '@/components/routes';

export const metadata = contactMetadata('ar');
export default function Page() {
  return <ContactRoute lang="ar" />;
}
