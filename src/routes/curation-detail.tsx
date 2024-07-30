import { createFileRoute } from '@tanstack/react-router'
import { useParams } from '@tanstack/react-router'
import { useCurationDetailInfo, getCurationDetail } from '@/_hooks/query'

export const Route = createFileRoute('/curation-detail')({
  loader: async () => {
    const id = Number(window.location.href.split('id=')[1])
    const getCurationDetailRes = await getCurationDetail({
      curationId: id + '',
    })
    console.log(getCurationDetailRes)
    return { id }
  },
  component: () => {
    return <div></div>
  },
})
