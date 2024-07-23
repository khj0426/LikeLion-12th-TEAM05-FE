import { createRoute } from '@tanstack/react-router';
import { Route as ParentRoute } from '@/routes/curation-maps';
export const Route = createRoute({
  getParentRoute: () => ParentRoute,
  path: '/curation-maps/$id',
  component: () => <CurationMap />,
});

const CurationMap = () => {
  const { id } = Route.useParams();
  return <div>{id}</div>;
};
