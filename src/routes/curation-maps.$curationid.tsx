import { createFileRoute } from '@tanstack/react-router'
import { Route as ParentRoute } from './curation-maps'

export const Route = createFileRoute('/curation-maps/$curationid')({
  // Or in a component
  component: PostComponent,
})

function PostComponent() {
  alert('아')
  const { curationid } = Route.useParams()
  return <div>Post ID: {curationid}</div>
}
