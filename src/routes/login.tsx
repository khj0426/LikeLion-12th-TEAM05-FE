import { createFileRoute } from '@tanstack/react-router'

import { LoginForm } from '@/pages/login/loginForm'

export const Route = createFileRoute('/login')({
  component: () => <LoginForm onSubmit={() => {}}></LoginForm>,
})
