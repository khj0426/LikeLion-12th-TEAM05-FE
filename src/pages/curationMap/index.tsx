import Heart from '../../../public/heart.svg?react'
import { Button, Input } from '@/_components'
import { Link } from '@tanstack/react-router'
import { useGetCuration, useGetQurationBySearch } from '@/_hooks/query'
import { useInfinityQueryObserver } from '@/_hooks'
import { useLikeCuration } from '@/_hooks/mutation'
import { useNavigate } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { Card } from 'flowbite-react'
import Swal from 'sweetalert2'

export const CurationMap = () => {
  const hasLikeRef = useRef(false)
  const { mutate } = useLikeCuration()
  const {
    refetch: refetchCuration,
    data,
    fetchNextPage,
    hasNextPage,
  } = useGetCuration()
  const { target } = useInfinityQueryObserver({
    threshold: 0.1,
    fetchNextPage: fetchNextPage,
    hasNextPage,
  })
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { data: queryCurationData, refetch: refetchQurationByQuery } =
    useGetQurationBySearch(query)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleOnClickHeart = ({
    curationId,
  }: {
    curationId: number | undefined
  }) => {
    if (!curationId) {
      return
    }
    mutate(
      { curationId: curationId + '' },
      {
        onSuccess: (data) => {
          refetchCuration()
          refetchQurationByQuery()
          if (data.status === 'error') {
            Swal.fire('이미 좋아요를 눌렀습니다!')
            return
          }
          Swal.fire('좋아요를 눌렀어요')
        },
      },
    )
  }

  return (
    <main className="flex flex-col items-center gap-8 mx-auto flex-wrap px-8">
      <h1 className="font-bold text-2xl text-center">
        🌄 산책로 큐레이션 지도
      </h1>
      <div className="flex items-center w-[60%] mb-4">
        <Input
          ref={inputRef}
          placeholder="다른 사람이 만든 산책로를 검색해보세요. ex) 파주 맛집 산책로"
          className="flex-grow mr-2 p-2 border rounded"
        />
        <Button
          variant={'primary'}
          onClick={() => setQuery(inputRef.current?.value ?? '')}
        >
          검색
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {queryCurationData?.curations?.map((curation, index) => (
          <Card
            onClick={() =>
              navigate({
                to: '/curation-detail',
                search: { id: curation.id },
              })
            }
            key={index}
            className="w-[350px] h-[200px] shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4 flex flex-col justify-between"
          >
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {curation.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
              {curation.content}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center">
              {curation.likeCount}{' '}
              <Heart
                className="ml-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleOnClickHeart({ curationId: curation.id })
                }}
              />
            </p>
          </Card>
        ))}
        {!queryCurationData &&
          data?.pages?.flat()?.map((item, index) =>
            item?.response?.data?.curations?.map((curation) => (
              <div key={index}>
                <Card
                  className="w-[350px] h-[200px] shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4 flex flex-col justify-between"
                  onClick={() =>
                    navigate({
                      to: '/curation-detail',
                      search: { id: curation.id },
                    })
                  }
                >
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {curation.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                    {curation.content}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center">
                    {curation.likeCount}
                    <Heart
                      className="ml-1"
                      onClick={() =>
                        handleOnClickHeart({ curationId: curation.id })
                      }
                    />
                  </p>
                </Card>
              </div>
            )),
          )}
      </div>
      <div ref={target} className="h-10"></div>
    </main>
  )
}
