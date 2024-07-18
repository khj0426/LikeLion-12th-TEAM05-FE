import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/curation-maps/$id')({
  beforeLoad: async ({ params }) => {
    params.id;
  },
  component: () => <div>Hello /curation-maps/$id!</div>,
});
