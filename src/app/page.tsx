import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Button asChild>
        <LoginLink>Login</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Signup</RegisterLink>
      </Button>
      <Link
        href='/dashboard'
        className={buttonVariants({
           
          className: '',
        })}
      >
        Dashboard
      </Link>
    </div>
  );
}
