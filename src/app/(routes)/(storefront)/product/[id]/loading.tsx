import { Skeleton } from '@/components/ui/skeleton';

export default function ProductLoading() {
  return (
    <div className='grid items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-24'>
      <div>
        <Skeleton className='h-[600px] w-full' />
        <div className='mt-6 grid grid-cols-5 gap-4'>
            <Skeleton className='w-[100px] h-[100px]' />
            <Skeleton className='w-[100px] h-[100px]' />
            <Skeleton className='w-[100px] h-[100px]' />
            <Skeleton className='w-[100px] h-[100px]' />
            <Skeleton className='w-[100px] h-[100px]' />
        </div>
      </div>

      <div className=''>
        <Skeleton className='w-56 h-12' />
        <Skeleton className='w-36 h-12 mt-4' />
        <Skeleton className='w-full h-60 mt-4' />
        <Skeleton className='w-full h-12 mt-4' />
      </div>
    </div>
  );
}
