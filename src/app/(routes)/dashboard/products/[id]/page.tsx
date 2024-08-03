import EditForm from '@/components/dashboard/EditForm';
import prisma from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

async function getProduct(productId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!data) return notFound();

  return data;
}

const ProductEdit = async ({ params }: { params: { id: string } }) => {
  noStore();
  const data = await getProduct(params.id);
  return <EditForm data={data} />;
};

export default ProductEdit;
