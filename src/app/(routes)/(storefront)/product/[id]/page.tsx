import FeaturedProducts from '@/components/storefront/FeaturedProducts';
import ImageSlider from '@/components/storefront/ImageSlider';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, StarIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getProduct(productId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  return (
    <>
      <div className='grid grid-cols-1 items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-24'>
        <ImageSlider images={product.images} />
        <div>
          <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
            {product.name}
          </h1>
          <p className='mt-3 text-2xl text-primary'>
            {formatPrice(product.price)}
          </p>
          <div className='mt-3 flex items-center gap-1'>
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
          </div>
          <p className='text-base text-gray-700 mt-6'>{product.description}</p>
          <Button className='max-w-3xl mt-5' size='lg'>
            <ShoppingBag className='mr-4 h-5 w-5' />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
