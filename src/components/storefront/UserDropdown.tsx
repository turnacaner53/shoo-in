import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface UserDropdownProps {
  email: string;
  name: string;
  userImage: string;
}

const UserDropdown = ({ email, name, userImage }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
          <Avatar className='h-10 w-10 border border-black text-black'>
            {userImage && <AvatarImage src={userImage} alt='User Image' />}
            <AvatarFallback>
              <span className='text-gray-700'>
                {name.slice(0, 2).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='flex flex-col space-y-1'>
          <p className='text-sm font-medium leading-none'>{name}</p>
          <p className='text-xs leading-none text-muted-foreground'>{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {email === process.env.ADMIN_EMAIL && (
            <Link href='/dashboard'>Admin Dashboard</Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>Logout</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
