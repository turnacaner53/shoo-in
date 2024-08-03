import prisma from '@/lib/db';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function getBanners() {
  const data = await prisma.banner.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return data;
}

const BannerPage = async () => {
  noStore();
  const banners = await getBanners();

  return (
    <>
      <div className='flex items-center justify-end'>
        <Button asChild className='flex gap-x-2'>
          <Link href='/dashboard/banner/create'>
            <PlusCircle className='h-5 w-5' />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription className='tracking-tight'>
            Manage your banners and view sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className='text-end'>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <Image
                      alt='banner image'
                      src={banner.imageString}
                      width={64}
                      height={64}
                      className='rounde-lg h-16 w-16 object-cover'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>{banner.title}</TableCell>
                  <TableCell className='text-end'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size='icon' variant='ghost'>
                          <MoreHorizontal className='h-5 w-5' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/banner/${banner.id}/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default BannerPage;
