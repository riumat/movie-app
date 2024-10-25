"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronCircleLeft } from "react-icons/fa";
import { sidebarItems } from '@/utils/constants';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { SiThemoviedatabase } from "react-icons/si";



const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative flex duration-300`}>
      <nav className={`text-white flex items-center relative h-screen duration-300 ${isOpen ? 'translate-x-0 w-48' : '-translate-x-full w-0 '}`}>
        <div className={`h-[100vh] p-4 bg-gradient-to-r from-neutral-950 to-neutral-900  z-50 border-r border-neutral-50/30 transition-transform duration-300 ${isOpen ? 'translate-x-0 w-48' : '-translate-x-full '} `}>
          <div className='w-full flex justify-center'>
            <SiThemoviedatabase size={40} className="text-white mb-4" />
          </div>
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.path} className="mb-4">
                <Link href={item.path}>
                  <span
                    className={`block px-5 py-2 rounded-xl hover:bg-gradient-to-r from-neutral-50 to-neutral-50/80 hover:text-neutral-950 duration-300 text-sm ${pathname === item.path ? 'bg-gradient-to-r from-neutral-50 to-neutral-50/80 text-neutral-950' : ''
                      }`}
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
        className={`absolute top-1/2 left-[177px]  transform -translate-y-1/2 text-neutral-950 hover:text-neutral-800  border-black border rounded-full shadow-[0_0_5px_#dbfffb] bg-neutral-50 text-[34px] z-50 transition-all duration-300 ${isOpen ? '' : 'translate-x-[-177px] rotate-180 duration-300 '}`}
      >
        <MdOutlineKeyboardArrowLeft size={30} />
      </button>
    </div>
  );
};

export default Sidebar;
