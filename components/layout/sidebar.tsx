"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { sidebarItems } from '@/lib/constants';
import { ModeToggle } from '@/components/theme/toggle-theme';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/auth-modal';
import LogoutModal from '@/components/auth/logout-modal';

const Sidebar = ({ session }: { session: any }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsLogged(!!session);
  }, [session])

  return (
    <div className={` flex z-50 duration-50 ${isOpen ? 'w-40' : 'w-0'}`}>
      <nav className={`text-foreground flex items-center relative z-20 h-screen duration-50 w-40
      ${isOpen ? 'translate-x-0 left-0' : '-translate-x-full'}
        `}
      >
        <div className={`h-[100vh] px-4 py-3 bg-background flex flex-col justify-between gap-5 z-20 w-full relative border-r border-neutral-700
           `}>

          <ul className='relative text-sm flex flex-col gap-1 mt-16'>
            {sidebarItems.filter((item) => session ? item : item.label !== "Profile").map((item) => (
              <li key={item.path} className="mb-7">
                <Link href={item.path === "/user" ? `${item.path}/${session.user.id}` : item.path} className='flex items-center gap-3 ml-3'>
                  <item.icon size={17}/>
                  <span
                    className={`px-3 py-1 rounded-xl hover:underline font-normal
                      ${pathname === item.path ? 'underline font-bold' : ''}`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}

          </ul>
          <div className="mb-4 flex justify-evenly items-center">
            {isLogged ? (
              <LogoutModal />
            ) : (
              <AuthModal isOpen={false} label='Login' />
            )}
            <div className='w-full flex justify-center relative '>
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
      <Button
        onClick={toggleSidebar}
        variant="outline"
        size="icon"
        className={`fixed z-50 top-3 left-5 cursor-pointer bg-background/40 rounded-md`}
      >
        <IoMenu className='text-foreground' />
      </Button>
    </div>
  );
};

export default Sidebar;


