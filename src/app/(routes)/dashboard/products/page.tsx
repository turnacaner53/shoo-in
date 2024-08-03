import prisma from '@/lib/db';
import { formatPrice } from '@/lib/utils';
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

async function getProducts() {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return data;
}

const ProductsPage = async () => {
  noStore();
  const data = await getProducts();

  return (
    <>
      <div className='flex items-center justify-end'>
        <Button asChild className='flex items-center gap-x-2'>
          <Link href='/dashboard/products/create'>
            <PlusCircle className='h-5 w-5' />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      width={64}
                      height={64}
                      src={product.images[0]}
                      className='h-16 w-16 rounded-md object-cover'
                      alt='product image'
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  {/* <TableCell>{product.createdAt.toLocaleDateString()}</TableCell> */}
                  <TableCell>
                    {new Intl.DateTimeFormat('tr-TR').format(product.createdAt)}
                  </TableCell>
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
                          <Link href={`/dashboard/products/${product.id}`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/products/${product.id}/delete`}
                          >
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

export default ProductsPage;
