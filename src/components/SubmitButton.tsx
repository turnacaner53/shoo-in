'use client';

import { useFormStatus } from 'react-dom';

import { Loader2, ShoppingBag, Trash2 } from 'lucide-react';

import { Button } from './ui/button';

interface ButtonProps {
  buttonText?: string;
  loadingText?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
}

const SubmitButton = ({
  buttonText = 'Submit',
  loadingText = 'Loading',
  variant = 'default',
}: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          {loadingText}
        </Button>
      ) : (
        <Button variant={variant} type='submit'>
          {buttonText}
        </Button>
      )}
    </>
  );
};

export default SubmitButton;

export function ShoppingBagButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size='lg' className='mt-5 w-full'>
          <Loader2 className='mr-4 h-5 w-5 animate-spin' />
          Please Wait
        </Button>
      ) : (
        <Button type='submit' size='lg' className='mt-5 w-full'>
          <ShoppingBag className='mr-4 h-5 w-5' /> Add to Cart
        </Button>
      )}
    </>
  );
}

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant='link'
          size='icon'
          className='font-medium text-primary duration-200 hover:bg-primary hover:text-white'
        >
          <Loader2 className='ml-2 h-5 w-5 animate-spin' />
        </Button>
      ) : (
        <Button
          type='submit'
          variant='link'
          size='icon'
          className='font-medium text-primary duration-200 hover:bg-primary hover:text-white'
        >
          <Trash2 className='h-5 w-5' />
        </Button>
      )}
    </>
  );
}

export function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size='lg' className='mt-4 w-full'>
          <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please Wait
        </Button>
      ) : (
        <Button type='submit' size='lg' className='mt-4 w-full'>
          Checkout
        </Button>
      )}
    </>
  );
}
