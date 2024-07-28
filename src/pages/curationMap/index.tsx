import Heart from '../../../public/heart.svg?react'
import { Button, Input } from '@/_components'
import { Link } from '@tanstack/react-router'
import { useGetCuration, useGetQurationBySearch } from '@/_hooks/query'
import { useInfinityQueryObserver } from '@/_hooks'
import { useState, useRef } from 'react'
import { Card } from 'flowbite-react'

export const CurationMap = () => {
  const { data, fetchNextPage } = useGetCuration()
  const { target } = useInfinityQueryObserver({
    threshold: 0.1,
    fetchNextPage: fetchNextPage,
  })
  console.log(data)
  const [query, setQuery] = useState('')
  const { data: queryCurationData } = useGetQurationBySearch(query)
  console.log

  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <main className="relative flex flex-col gap-[25px] w-[80%] ml-[150px]">
      <h1 className="font-bold text-2xl">🌄 산책로 큐레이션 지도 </h1>
      <div className="flex items-center w-full max-w-[600px]">
        <Input
          ref={inputRef}
          placeholder="다른 사람이 만든 산책로를 검색해보세요. ex)파주 맛집 산책로"
          className="flex-grow mr-2"
        />
        <Button
          variant={'primary'}
          onClick={() => setQuery(inputRef.current?.value ?? '')}
        >
          검색
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-w-[1200px]">
        {data?.pages?.flat()?.map((item, index) => (
          <div key={index} className="flex gap-[15px] p-4">
            {!query &&
              item?.response?.data?.curations?.map((curation) => (
                <Link
                  to={`/curation-maps/${curation.id + ''}`}
                  params={{
                    curationid: curation.id + '',
                  }}
                  key={curation.id}
                  className="cursor-pointer w-full h-[180px]"
                >
                  <Card className="max-w-[350px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {curation.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {curation.content}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {curation.likeCount}
                      <Heart />
                    </p>
                  </Card>
                </Link>
              ))}
            {query && (
              <div>
                {queryCurationData?.curations?.map((curation) => (
                  <Link
                    to={`/curation-maps/${curation.id + ''}`}
                    search={{ id: curation.id }}
                    key={curation.id}
                    className="cursor-pointer w-full h-[180px] bg-WHITE rounded-md flex flex-col justify-center items-center text-LIGHT_SLATE p-[5px]"
                  >
                    <div className="text-xl font-bold w-full overflow-hidden whitespace-nowrap text-ellipsis">
                      {curation.name}
                    </div>
                    <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
                      {curation.content}
                    </div>
                    <span>{curation.likeCount}개의 좋아요가 있어요💜</span>
                  </Link>
                ))}
              </div>
            )}
            <div ref={target}></div>
          </div>
        ))}
      </div>
    </main>
  )
}
