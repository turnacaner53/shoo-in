'use client';

import { useFormStatus } from 'react-dom';

import { Loader2 } from 'lucide-react';

import { Button } from './ui/button';

const SubmitButton = ({ buttonText }: { buttonText: string }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Loading
        </Button>
      ) : (
        <Button type='submit'>{buttonText}</Button>
      )}
    </>
  );
};

export default SubmitButton;
