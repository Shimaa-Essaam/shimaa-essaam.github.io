import { ProjectRoute, projectMetadata, projectParams, type ProjectParams } from '@/components/routes';

export const dynamicParams = false;
export const generateStaticParams = projectParams;
export const generateMetadata = (props: ProjectParams) => projectMetadata('ar', props);
export default function Page(props: ProjectParams) {
  return <ProjectRoute lang="ar" {...props} />;
}
