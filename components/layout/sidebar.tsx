"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { sidebarItems } from '@/lib/constants';
import { ModeToggle } from '@/components/theme/toggle-theme';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/auth-modal';


const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` flex z-50 duration-50 ${isOpen ? 'w-40' : 'w-0'}`}>
      <nav className={`text-foreground flex items-center relative z-20 h-screen duration-50 w-40
      ${isOpen ? 'translate-x-0 left-0' : '-translate-x-full'}
        `}
      >
        <div className={`h-[100vh] px-4 py-3 bg-background flex flex-col gap-5 z-20 w-full relative border-r border-neutral-700
           `}>
          <div className='w-full flex justify-center relative left-8'>
            <ModeToggle />
          </div>
          <ul className='relative text-sm flex flex-col gap-1'>
            {sidebarItems.map((item) => (
              <li key={item.path} className="mb-4">
                <Link href={item.path}>
                  <span
                    className={`px-3 py-1 rounded-xl hover:underline font-normal
                      ${pathname === item.path ? 'underline font-bold' : ''}`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
            <li className="mb-4">
              <AuthModal />
            </li>
          </ul>
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


