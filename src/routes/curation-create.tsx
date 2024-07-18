import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/curation-create')({
  component: () => <div>Hello /curation-create!</div>
})