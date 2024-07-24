import { Input } from '@/_components';
import { Link } from '@tanstack/react-router';
import { useGetCuration } from '@/_hooks/query';
import { useInfinityQueryObserver } from '@/_hooks';

export const CurationMap = () => {
  const { data, fetchNextPage, hasNextPage } = useGetCuration();
  const { target } = useInfinityQueryObserver({
    threshold: 0.1,
    hasNextPage,
    fetchNextPage: fetchNextPage,
  });

  return (
    <main className="relative flex flex-col gap-[25px] w-[80%] ml-[150px]">
      <h1 className="font-bold text-2xl">🌄 산책로 큐레이션 지도 </h1>
      <Input placeholder="다른 사람이 만든 산책로를 검색해보세요. ex)파주 맛집 산책로" />

      <div className="grid grid-cols-2 gap-3 w-full max-w-[1200px]">
        {data?.pages?.flat()?.map((item, index) => (
          <div key={index} className="flex gap-[50px] w-[300px]">
            {item?.response?.data?.curations?.map((curation) => (
              <Link
                to={`/curation-maps`}
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
        ))}
      </div>

      <div ref={target}></div>
    </main>
  );
};
