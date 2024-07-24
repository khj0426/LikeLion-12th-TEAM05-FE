import MainBannerSecond from '../../public/mainbanner_2.svg?react';
import MainBanner from '../../public/mainbanner.svg?react';

import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, Carousel } from 'flowbite-react';

import { PopluarCurations } from '@/pages/landing';
import { Spinner } from 'flowbite-react';
import { Button } from '@/_components';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
export const Route = createFileRoute('/')({
  component: () => {
    return (
      <div className="text-WHITE h-56 sm:h-64 xl:h-80 2xl:h-96 bg-PRIMARY dark:bg-[#0E0E2C]">
        <Carousel className="my-[50px] text-WHITE bg-PRIMARY w-[80%] mx-auto">
          <MainBanner />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>

        <section className="flex flex-col gap-[25px] w-[80%] m-auto">
          <h2 className="font-bold text-2xl">👼인기 있는 큐레이터</h2>
          <h3 className="text-xl">지금 인기 있는 큐레이터를 만나보세요!</h3>
          <Card className="max-w-[150px]">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              ㅁㄴㅇ
            </p>
          </Card>
        </section>

        <section className="my-[120px] mx-auto flex flex-col gap-[25px] w-[80%] ">
          <h2 className="font-bold text-2xl">🌹이런 산책로는 어떠세요?</h2>
          <h3 className="text-xl">
            다른 큐레이터가 추천한 산책로를 만나보세요
          </h3>
          <ErrorBoundary fallback={<></>}>
            <Suspense
              fallback={
                <Spinner aria-label="Extra large spinner example" size="xl" />
              }
            >
              <PopluarCurations></PopluarCurations>
            </Suspense>
          </ErrorBoundary>
        </section>

        <section className="my-[120px] mx-auto flex flex-col gap-[25px] w-[80%] ">
          <h2 className="font-bold text-2xl">🌐최근 만들어진 산책로</h2>
          <h3 className="text-xl">최근 만들어진 산책로 큐레이션들이에요.</h3>
          <Card className="max-w-[150px]">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              ㅁㄴㅇ
            </p>
          </Card>
        </section>

        <section className="flex flex-col items-center justify-center w-[80%] mx-auto my-20">
          <MainBannerSecond />
          <div className="mt-4 flex gap-[25px]">
            <Button variant={'primary'} shape="rounded" size="xl">
              <Link to="/curation-maps">큐레이션 지도 보러 가기</Link>
            </Button>
            <Button variant={'secondary'} shape="rounded" size="xl">
              내 주변 지도 보러 가기
            </Button>
          </div>
        </section>
      </div>
    );
  },
});
