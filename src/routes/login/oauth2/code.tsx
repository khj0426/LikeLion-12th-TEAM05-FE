import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/oauth2/code')({
  component: () => <div>Hello /login/oauth2/code!</div>,
})
