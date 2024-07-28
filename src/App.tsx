import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import '../index.css'

import { CurationSelectProvider } from '@/_context/curationSelectContext'
import { UserContextProvider } from '@/_context/userInfoContext'
import { Flowbite } from 'flowbite-react'
import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => console.error(error),
    }),
    defaultOptions: {
      queries: {
        suspense: true,
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  })

  root.render(
    <Flowbite>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CurationSelectProvider>
            <RouterProvider router={router} />
          </CurationSelectProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </Flowbite>,
  )
}
