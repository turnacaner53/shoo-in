import prisma from '@/lib/db';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

async function getHeroContent() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return data;
}

export default async function Hero() {
  const data = await getHeroContent();
  return (
    <Carousel opts={{ align: 'start', loop: true }}>
      <CarouselContent>
        {data.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className='relative h-[60vh] lg:h-[80vh]'>
              <Image
                src={banner.imageString}
                alt='Banner Image'
                fill
                className='h-full w-full rounded-xl object-cover'
              />
              <div className='absolute left-8 top-6 rounded-xl bg-black bg-opacity-75 p-6 text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:text-primary/80'>
                <h1 className='text-xl font-bold lg:text-4xl'>
                  {banner.title}
                </h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='ml-16' />
      <CarouselNext className='mr-16' />
    </Carousel>
  );
}
