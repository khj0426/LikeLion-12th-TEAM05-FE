import { createFileRoute } from '@tanstack/react-router'

import { LoginForm } from '@/pages/login/loginForm'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: () => <LoginForm onSubmit={() => {}}></LoginForm>,
})
