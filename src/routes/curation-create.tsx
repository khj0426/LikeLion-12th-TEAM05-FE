import { createFileRoute } from '@tanstack/react-router';
import { CurationCreate } from '@/pages/curationCreate';

export const Route = createFileRoute('/curation-create')({
  component: () => <CurationCreate />,
});
