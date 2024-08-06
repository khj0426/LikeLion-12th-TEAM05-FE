import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/oauth2/code/google')({
  component: () => {
    const searchParams = new URLSearchParams(window.location.href)

    const code = searchParams.get('code')
    const scope = searchParams.get('scope')
    const authuser = searchParams.get('authuser')

    return (
      <div>
        <h1>Hello /login/oauth2/code/google!</h1>
        <p>Code: {code}</p>
        <p>Scope: {scope}</p>
        <p>Auth User: {authuser}</p>
      </div>
    )
  },
})
