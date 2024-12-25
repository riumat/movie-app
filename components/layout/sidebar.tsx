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
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Sidebar = ({ session }: { session: any }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)") ?? true;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsLogged(!!session);
  }, [session])

  if (!isMounted) {
    return null;
  }

  if (isDesktop) {
    return (
      <div className={` flex z-50 duration-50 ${isOpen ? 'w-40' : 'w-0'}`}>
        <div className={`text-foreground flex items-center relative z-20 h-screen duration-50 w-40
      ${isOpen ? 'translate-x-0 left-0' : '-translate-x-full'}
        `}
        >
          <div className={`h-[100vh] px-4 py-3 flex flex-col justify-between gap-5 z-20 w-full relative border-r border-neutral-700`}>

            <ul className='relative text-sm flex flex-col gap-1 mt-16'>
              {sidebarItems.filter((item) => session ? item : item.label !== "Profile").map((item) => (
                <li key={item.path} className="mb-7">
                  <Link href={item.path === "/user" ? `${item.path}/${session.user.id}` : item.path} className='flex items-center gap-2 ml-3'>
                    <item.icon size={17} />
                    <span
                      className={`px-3 py-1 rounded-xl hover:underline text-sm
                      ${pathname === item.path ? 'underline font-bold' : 'font-light'}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}

            </ul>
            <div className='flex flex-col gap-5 items-center'>
              {session && (
                <p className='text-sm font-extralight'>Logged as <span className='font-bold'>{session.user.name}</span></p>
              )}

              <div className="mb-4 flex justify-between items-center w-full ">
                {isLogged ? (
                  <LogoutModal />
                ) : (
                  <AuthModal isOpen={false} label='Login' />
                )}
                <ModeToggle />
              </div>

            </div>
          </div>
        </div>
        <Button
          onClick={toggleSidebar}
          variant="outline"
          size="icon"
          className={`fixed z-50 top-3 left-5 cursor-pointer bg-background/40 rounded-md`}
        >
          <IoMenu className='text-foreground z-50' />
        </Button>
      </div>
    )
  }

  return (
    <Sheet>
      <SheetTrigger
        onClick={toggleSidebar}
        className={`fixed z-50 top-3 left-5  w-9 h-9 lg:h-8 lg:w-8 cursor-pointer border border-input bg-background/80 shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg lg:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`}
      >
        <IoMenu className='text-foreground  z-50' />
      </SheetTrigger>
      <SheetContent side={'left'} className='max-w-[50%] p-0'>
        <div className={`h-[100vh] w-full px-4 py-3 flex flex-col justify-between gap-5 z-20  relative border-r border-neutral-700
           `}>

          <div className={`h-[100vh] content-[''] absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/slash_it.png')] bg-repeat opacity-30 -z-10 `} />
          <ul className='relative text-sm flex flex-col gap-1 mt-16'>
            {sidebarItems.filter((item) => session ? item : item.label !== "Profile").map((item) => (
              <li key={item.path} className="mb-7">
                <Link href={item.path === "/user" ? `${item.path}/${session.user.id}` : item.path} className='flex items-center gap-2 ml-3'>
                  <item.icon size={17} />
                  <span
                    className={`px-3 py-1 rounded-xl hover:underline text-sm
                      ${pathname === item.path ? 'underline font-bold' : 'font-light'}`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}

          </ul>
          <div className='flex flex-col gap-5 items-center'>
            {session && (
              <p className='text-sm font-extralight'>Logged as <span className='font-bold'>{session.user.name}</span></p>
            )}

            <div className="mb-4 flex justify-between items-center w-full ">
              {isLogged ? (
                <LogoutModal />
              ) : (
                <AuthModal isOpen={false} label='Login' />
              )}
              <ModeToggle />
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;



