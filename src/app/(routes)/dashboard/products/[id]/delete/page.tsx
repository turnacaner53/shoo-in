import SubmitButton from '@/components/SubmitButton';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { deleteProduct } from '../../actions';

const DeleteProduct = ({ params }: { params: { id: string } }) => {
  return (
    <div className='flex h-[80vh] w-full items-center justify-center'>
      <Card className='max-w-xl'>
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will perma nently delete the
            product.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex w-full justify-between'>
          <Button variant='secondary' asChild>
            <Link href='/dashboard/products'>Cancel</Link>
          </Button>
          <form action={deleteProduct}>
            <input type='hidden' name='productId' value={params.id} />
            <SubmitButton
              variant='destructive'
              buttonText='Delete Product'
              loadingText='Deleting...'
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteProduct;
