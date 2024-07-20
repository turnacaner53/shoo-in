import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';
import NavbarLinks from './NavbarLinks';
import UserDropdown from './UserDropdown';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8'>
      <div className='flex items-center'>
        <Link href='/'>
          <h1 className='text-xl font-bold text-black lg:text-3xl'>
            Shoo-<span className='text-primary'>IN</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>

      <div className='flex items-center'>
        {user ? (
          <>
            <Link href='/bag' className='group mr-2 flex items-center p-2'>
              <ShoppingBag className='h-6 w-6 text-gray-600 group-hover:text-primary' />
              <span className='ml-2 font-medium text-gray-600 group-hover:text-primary'>
                4
              </span>
            </Link>

            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ??
                `https://avatar.vercel.sh/rauchg.svg${user.given_name}.svg?text=${user.given_name?.slice(0, 2).toUpperCase()}`
              }
            />
          </>
        ) : (
          <div className='hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2'>
            <Button variant='ghost' asChild>
              <LoginLink>Sign In</LoginLink>
            </Button>
            <span className='h-6 w-px bg-gray-200'></span>
            <Button variant='ghost' asChild>
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
