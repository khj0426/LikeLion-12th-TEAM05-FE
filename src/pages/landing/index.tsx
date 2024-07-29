import { useGetPopluarCurations, useGetPopluarCurators } from '@/_hooks/query'
import { Link } from '@tanstack/react-router'
import { Card } from 'flowbite-react'
import { useGetRecentCuration } from '@/_hooks/query'

export const RecentCurations = () => {
  const { data: recentCurations } = useGetRecentCuration()
  return (
    <div className="flex flex-wrap gap-6">
      {recentCurations?.map((curation) => (
        <Card
          key={curation.id}
          className="w-64 max-h-[300px] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Link to={`/curation-maps/${curation.id}`}>
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
              {curation.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
              {curation.content}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {curation.likeCount}개의 좋아요가 있어요! 😚
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export const PopluarCurations = () => {
  const { data: popularCurations } = useGetPopluarCurations()

  return (
    <div className="flex flex-wrap gap-6">
      {popularCurations?.curations?.map((curation) => (
        <Card
          className="w-64 max-h-[300px] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          key={curation.id}
        >
          <Link to={`/curation-maps/${curation.id}`}>
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
              {curation.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
              {curation.content}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {curation.likeCount}개의 좋아요가 있어요! 😚
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export const PopluarCurators = () => {
  const { data: popularCurators } = useGetPopluarCurators()
  return (
    <div className="flex flex-wrap gap-6">
      {popularCurators?.userPopular?.map((user) => (
        <Card
          className="w-64 max-h-[300px] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          key={user.name}
        >
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
            {user.curationCount}개의 큐레이션을 만들었어요 😊!
          </p>
        </Card>
      ))}
    </div>
  )
}
