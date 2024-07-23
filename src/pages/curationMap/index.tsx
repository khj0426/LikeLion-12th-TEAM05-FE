import { Input } from '@/_components';
import { Link } from '@tanstack/react-router';

export const CurationMap = () => {
  const mockData = [
    {
      id: 1,
      name: '양천구 산책로',
      content: '안양천 따라 걷는 산책로',
      likecount: 1,
    },
    {
      id: 2,
      name: '강서구 산책로',
      content: '강서구 산책로 설명',
      likecount: 2,
    },
    {
      id: 3,
      name: '화곡동 산책로',
      content: '화곡동 산책로 설명',
      likecount: 1,
    },
    {
      id: 4,
      name: '목동 산책로',
      content: '목동 산책로 설명',
      likecount: 1,
    },
    {
      id: 5,
      name: '가양동 산책로',
      content: '가양동 산책로 설명',
      likecount: 1,
    },
    {
      id: 6,
      name: '목4동 산책로',
      content: '목4동 산책로 설명',
      likecount: 3,
    },
    {
      id: 1,
      name: '양천구 산책로',
      content: '안양천 따라 걷는 산책로',
      likecount: 1,
    },
    {
      id: 2,
      name: '강서구 산책로',
      content: '강서구 산책로 설명',
      likecount: 2,
    },
    {
      id: 3,
      name: '화곡동 산책로',
      content:
        '화곡동 산책로 설명화곡동 산책로 설명화곡동 산책로 설명화곡동 산책로 설명화곡동 산책로 설명화곡동 산책로 설명화곡동 산책로 설명',
      likecount: 1,
    },
    {
      id: 4,
      name: '목동 산책로',
      content: '목동 산책로 설명',
      likecount: 1,
    },
    {
      id: 5,
      name: '가양동 산책로',
      content: '가양동 산책로 설명',
      likecount: 1,
    },
    {
      id: 6,
      name: '목4동 산책로',
      content: '목4동 산책로 설명',
      likecount: 3,
    },
  ];

  return (
    <main className="relative flex flex-col gap-[25px] w-[80%] ml-[150px]">
      <h1 className="font-bold text-2xl">🌄 산책로 큐레이션 지도 </h1>
      <Input placeholder="다른 사람이 만든 산책로를 검색해보세요. ex)파주 맛집 산책로"></Input>
      <div className="grid grid-cols-3 gap-4 w-full max-w-[1200px]">
        {mockData.map((item, index) => (
          <Link
            to={`/curation-maps`}
            search={{ id: item.id }}
            key={index}
            className="cursor-pointer w-[350px] h-[180px] bg-WHITE  rounded-md flex justify-evenly align-center flex-col text-LIGHT_SLATE p-2"
          >
            <div className="text-xl font-bold w-[320px] overflow-hidden whitespace-nowrap text-ellipsis">
              {item.name}
            </div>
            <div className=" w-[320px] overflow-hidden whitespace-nowrap text-ellipsis">
              {item.content}
            </div>
            <span>{item.likecount}개의 좋아요가 있어요💜</span>
          </Link>
        ))}
      </div>
    </main>
  );
};
