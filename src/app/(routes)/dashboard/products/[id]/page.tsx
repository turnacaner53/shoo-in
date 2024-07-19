import EditForm from '@/components/dashboard/EditForm';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

async function getProduct(productId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!data) return notFound();

  return data;
}

const ProductEdit = async ({ params }: { params: { id: string } }) => {
  const data = await getProduct(params.id);
  return <EditForm data={data} />;
};

export default ProductEdit;
