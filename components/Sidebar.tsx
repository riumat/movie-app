"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { sidebarItems } from '@/utils/constants';
import { SiThemoviedatabase } from "react-icons/si";


const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` flex z-20 duration-50 ${isOpen ? 'w-40' : 'w-0'}`}>
      <nav className={`text-white flex items-center relative z-20 h-screen duration-50 w-40
      ${isOpen ? 'translate-x-0 left-0' : '-translate-x-full'}
        `}
      >
        <div className={`h-[100vh] p-4 bg-neutral-950 flex flex-col gap-5 z-20 w-full relative border-r border-neutral-700
           `}>
          <div className='w-full flex justify-center relative left-4'>
            <SiThemoviedatabase
              size={27}
              className="text-white mb-4"
            />
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
          </ul>
        </div>
      </nav>
      <button
        onClick={toggleSidebar}
        className={`fixed top-[14px] left-5 cursor-pointer z-20 bg-neutral-950/15 rounded-md p-1 outline-none ${isOpen ? '' : ' '}`}
      >
        <IoMenu size={23} className='text-neutral-200' />
      </button>
    </div>
  );
};

export default Sidebar;
