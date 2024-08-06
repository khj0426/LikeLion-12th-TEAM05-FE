import { useGetPopluarCurations, useGetPopluarCurators } from '@/_hooks/query'
import { Link } from '@tanstack/react-router'
import { Card, Pagination } from 'flowbite-react'
import { useGetRecentCuration } from '@/_hooks/query'
import { useState } from 'react'

export const RecentCurations = () => {
  const [currentPage, setCurrenPage] = useState(1)
  const { data: recentCurations } = useGetRecentCuration({
    page: currentPage - 1,
  })

  return (
    <div className="flex flex-wrap gap-6">
      {recentCurations?.pages.map((page) =>
        page.response?.map((res) => (
          <Card
            key={res.id}
            className="w-64 max-h-[300px] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link
              to={`/curation-detail`}
              search={{
                id: res.id,
              }}
            >
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                {res.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
                {res.content}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                {res.likeCount}개의 좋아요가 있어요! 😚
              </div>
            </Link>
          </Card>
        )),
      )}
      {recentCurations?.pages.length !== 0 && (
        <Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={100}
          onPageChange={(page) => setCurrenPage(() => page)}
          showIcons
        />
      )}
    </div>
  )
}

export const PopluarCurations = () => {
  const [currentPage, setCurrenPage] = useState(1)
  const { data: popularCurations } = useGetPopluarCurations({
    page: currentPage - 1,
  })

  return (
    <div>
      <div className="flex flex-wrap gap-6">
        {popularCurations?.pages.map((page) =>
          page.response?.map((curation) => (
            <Card
              className="w-64 max-h-[300px] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={curation.id}
            >
              <Link
                to={`/curation-detail`}
                search={{
                  id: curation.id,
                }}
              >
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
          )),
        )}
      </div>
      {popularCurations?.pages.length !== 0 && (
        <Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={102} // 총 페이지 수 설정
          onPageChange={(page) => setCurrenPage(page)}
          showIcons
        />
      )}
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
