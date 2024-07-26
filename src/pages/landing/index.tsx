import { useGetPopluarCurations } from '@/_hooks/query'
import { Link } from '@tanstack/react-router'
import { Card } from 'flowbite-react'
import { useGetRecentCuration } from '@/_hooks/query'

export const RecentCurations = () => {
  const { data: recentQurations } = useGetRecentCuration()
  return (
    <div className="flex gap-[15px]">
      {recentQurations?.map((curation) => (
        <Card key={curation.id} className="max-w-sm cursor-pointer">
          <Link to={`/curation-maps/${curation.id}`}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {curation.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {curation.content}
            </p>
            <div>{curation.likeCount}</div>
          </Link>
        </Card>
      ))}
    </div>
  )
}
export const PopluarCurations = () => {
  const { data: popularCurations } = useGetPopluarCurations()

  return (
    <div className="flex gap-[15px]">
      {popularCurations?.curations?.map((curation) => (
        <Card className="max-w-sm cursor-pointer" key={curation.id}>
          <Link to={`/curation-maps/${curation.id}`}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {curation.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {curation.content}
            </p>
            <div>{curation.likeCount}</div>
          </Link>
        </Card>
      ))}
    </div>
  )
}
