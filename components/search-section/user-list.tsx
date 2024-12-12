import AuthModal from '@/components/auth/auth-modal';
import { formatMinutes } from '@/lib/functions';
import Link from 'next/link';
import React from 'react';

interface User {
  username: string;
  [key: string]: any; // allows for other properties in the user object
}

interface UserListProps {
  users: User[];
  session: any;
}

const UserList: React.FC<UserListProps> = ({ users, session }) => {
  const userList = users.filter(user => user.user_id !== session?.user.id).sort((a, b) => (b.watchtime - a.watchtime));
  return (
    <div className=" w-[24%] bg-background/95 text-foreground rounded-lg pt-5 px-3 flex flex-col gap-10">
      <h2 className='text-2xl font-bold text-center'>Users</h2>
      {session ? (
        users.length === 0 ? (
          <p className='text-center'>No users found</p>
        ) : (
          <ul className="flex flex-col gap-2 items-start ml-3">
            {userList.map((user, index) => (
              <li key={index} className="w-full px-3 py-3 rounded-lg hover:bg-secondary/50">
                <Link href={`/user/${user.user_id}`} className='flex items-center gap-2'>
                  <p className='font-bold'>{user.username}</p>
                  <p className='font-extralight text-sm'>{formatMinutes(user.watchtime)} watched</p>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <AuthModal isOpen={false} label='Login to see other users' />
      )}

    </div>
  );
};

export default UserList;