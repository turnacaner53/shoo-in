'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '../ui/button';

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrev = () => {
    setMainImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setMainImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='grid items-start gap-6 md:gap-3'>
      <div className='relative overflow-hidden rounded-lg'>
        <Image
          src={images[mainImageIndex]}
          alt='Product Image'
          width={600}
          height={600}
          className='h-[600px] w-[600px] object-cover'
        />

        <div className='absolute inset-0 flex items-center justify-between px-4'>
          <Button onClick={handlePrev} variant='secondary' size='icon'>
            <ChevronLeft className='h-6 w-6' />
          </Button>
          <Button onClick={handleNext} variant='secondary' size='icon'>
            <ChevronRight className='h-6 w-6' />
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-5 gap-4'>
        {images.map((image, index) => (
          <div
            className={cn(
              index === mainImageIndex
                ? 'border-2 border-primary'
                : 'border border-gray-200',
                'relative overflow-hidden rounded-lg cursor-pointer'
            )}
            key={index}
            onClick={() => setMainImageIndex(index)}
          >
            <Image
              src={image}
              alt='Product Image'
              width={100}
              height={100}
              className='rounded-md'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
