'use server';

import prisma from '@/lib/db';
import { productSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) return redirect('/');

  const submission = parseWithZod(formData, { schema: productSchema });

  if (submission.status !== 'success') return submission.reply();

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(',').map((url) => url.trim()),
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
    },
  });

  redirect('/dashboard/products');
}
