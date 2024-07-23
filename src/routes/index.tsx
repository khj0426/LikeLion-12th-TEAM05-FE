import MainBanner from '../../public/mainbanner.svg?react';
import { createFileRoute } from '@tanstack/react-router';
import { Carousel } from 'flowbite-react';

export const Route = createFileRoute('/')({
  component: () => (
    <div className="text-WHITE h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel className="text-WHITE bg-PRIMARY w-[80%] m-auto">
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
    </div>
  ),
});
