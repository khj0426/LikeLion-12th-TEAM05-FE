import Heart from '../../../public/heart.svg?react'
import { Button, Input } from '@/_components'
import { Link } from '@tanstack/react-router'
import { useGetCuration, useGetQurationBySearch } from '@/_hooks/query'
import { useInfinityQueryObserver } from '@/_hooks'
import { useState, useRef } from 'react'
import { Card } from 'flowbite-react'

export const CurationMap = () => {
  const { data, fetchNextPage, hasNextPage } = useGetCuration()
  const { target } = useInfinityQueryObserver({
    threshold: 0.1,
    fetchNextPage: fetchNextPage,
    hasNextPage,
  })
  const [query, setQuery] = useState('')
  const { data: queryCurationData } = useGetQurationBySearch(query)

  const inputRef = useRef<HTMLInputElement | null>(null)

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
        {data?.pages?.flat()?.map((item, index) =>
          item?.response?.data?.curations?.map((curation) => (
            <Link
              to={`/curation-maps/${curation.id + ''}`}
              params={{
                curationid: curation.id + '',
              }}
              key={curation.id}
              className="flex-shrink-0"
            >
              <Card className="w-[350px] h-[200px] shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4 flex flex-col justify-between">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {curation.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                  {curation.content}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center">
                  {curation.likeCount} <Heart className="ml-1" />
                </p>
              </Card>
            </Link>
          )),
        )}
        {queryCurationData?.curations?.map((curation) => (
          <Link
            to={`/curation-maps/${curation.id + ''}`}
            search={{ id: curation.id }}
            key={curation.id}
            className="flex-shrink-0"
          >
            <Card className="w-[350px] h-[200px] shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4 flex flex-col justify-between">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {curation.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                {curation.content}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400 flex items-center">
                {curation.likeCount} <Heart className="ml-1" />
              </p>
            </Card>
          </Link>
        ))}
      </div>
      <div ref={target} className="h-10"></div>
    </main>
  )
}
