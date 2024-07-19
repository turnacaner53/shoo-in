'use client';

import { useFormStatus } from 'react-dom';

import { Loader2 } from 'lucide-react';

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
