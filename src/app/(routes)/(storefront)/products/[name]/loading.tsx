import { LoadingProductCard } from '@/components/storefront/ProductCard';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <Skeleton className='my-5 h-10 w-56' />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
