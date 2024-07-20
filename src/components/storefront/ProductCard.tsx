import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className='rounded-lg'>
      <Carousel className='mx-auto w-full'>
        <CarouselContent>
          {product.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className='relative h-[330px]'>
                <Image
                  src={item}
                  alt='Product Image'
                  fill
                  className='h-full w-full rounded-lg object-cover object-center'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='ml-16' />
        <CarouselNext className='mr-16' />
      </Carousel>

      <div className='mt-2 flex items-center justify-between px-2'>
        <h1 className='text-xl font-semibold'>{product.name}</h1>
        <h3 className='inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10'>
          {formatPrice(product.price)}
        </h3>
      </div>
      <p className='mt-2 line-clamp-2 text-sm text-gray-600'>
        {product.description}
      </p>

      <Button
        asChild
        variant='outline'
        className='mt-4 w-full border border-primary hover:bg-primary/50'
      >
        <Link href={`/product/${product.id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}
