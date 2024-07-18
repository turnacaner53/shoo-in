import { ReactNode } from 'react';

const FormErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className='text-sm text-red-500'>{children}</p>;
};

export default FormErrorMessage;
