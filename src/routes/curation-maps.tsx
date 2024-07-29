import { createFileRoute } from '@tanstack/react-router'
import { CurationMap } from '@/pages/curationMap'
import { ErrorBoundary } from 'react-error-boundary'

import { Suspense, useState } from 'react'
import { Alert, Spinner } from 'flowbite-react'
export const Route = createFileRoute('/curation-maps')({
  component: () => {
    return (
      <ErrorBoundary
        fallback={
          <Alert color="failure">
            <span className="font-medium">서비스를 이용할 수 없습니다.</span>
          </Alert>
        }
      >
        <Suspense fallback={<></>}>
          <CurationMap></CurationMap>
        </Suspense>
      </ErrorBoundary>
    )
  },
})
