import { createFileRoute } from '@tanstack/react-router';
import { CurationMap } from '@/pages/curationMap';

export const Route = createFileRoute('/curation-maps')({
  component: () => <CurationMap />,
});
