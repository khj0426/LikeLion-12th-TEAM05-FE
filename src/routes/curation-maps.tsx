import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/curation-maps')({
  component: () => <div>Hello /curation-maps!</div>,
});
