import Image from 'next/image';
import Link from 'next/link';

import all from '../../../public/all.jpeg';
import men from '../../../public/men.jpeg';
import women from '../../../public/women.jpeg';

export default function CategorySelection() {
  return (
    <div className='py-24 sm:py-32'>
      <div className='flex items-end justify-between'>
        <h2 className='text-2xl font-extrabold tracking-tight'>
          Shop by Category
        </h2>
        <Link
          className='text-sm font-semibold text-primary hover:text-primary/80'
          href='/products/all'
        >
          All Products &rarr;
        </Link>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8'>
        <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-xl sm:aspect-w-1 sm:row-span-2'>
          <Image
            src={all}
            alt='All Products Image'
            className='object-cover object-center'
          />
          <div className='bg-gradient-to-b from-transparent to-black opacity-55' />
          <div className='flex items-end p-6'>
            <Link href='/products/all'>
              <h3 className='font-semibold text-white'>All Products</h3>
              <p className='mt-1 text-sm text-white'>Shop Now</p>
            </Link>
          </div>
        </div>

        <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
          <Image
            src={men}
            alt='Products for men Image'
            className='object-cover object-bottom sm:absolute sm:inset-0 sm:h-full sm:w-full'
          />
          <div className='bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0' />
          <div className='flex items-end p-6 sm:absolute sm:inset-0'>
            <Link href='/products/men'>
              <h3 className='font-semibold text-white'>Products for Men</h3>
              <p className='mt-1 text-sm text-white'>Shop Now</p>
            </Link>
          </div>
        </div>

        <div className='group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full'>
          <Image
            src={women}
            alt='Women product image'
            className='object-cover object-bottom sm:absolute sm:inset-0 sm:h-full sm:w-full'
          />
          <div className='bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0' />
          <div className='flex items-end p-6 sm:absolute sm:inset-0'>
            <Link href='/products/women'>
              <h3 className='font-semibold text-white'>Products for Women</h3>
              <p className='mt-1 text-sm text-white'>Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
