'use server';

import prisma from '@/lib/db';
import { bannerSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL)
    return redirect('/dashboard/banner');

  const submission = parseWithZod(formData, { schema: bannerSchema });

  if (submission.status !== 'success') return submission.reply();

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect('/dashboard/banner');
}

export async function deleteBanner( formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL)
    return redirect('/dashboard/banner');

  const bannerId = formData.get('bannerId') as string;

  await prisma.banner.delete({ where: { id: bannerId } });

  redirect('/dashboard/banner');
}
