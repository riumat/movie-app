"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronCircleLeft } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
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
    <div className={`relative flex duration-100 `}>
      <nav className={`text-white flex items-center relative h-screen duration-300 ${isOpen ? 'translate-x-0 w-36' : '-translate-x-full w-0 '}`}>
        <div className={`h-[100vh] p-4 bg-gradient-to-r from-neutral-900 to-neutral-950  z-50 border-r border-neutral-50/30 transition-transform duration-300 ${isOpen ? 'translate-x-0 w-48' : '-translate-x-full '} `}>
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
        className={`absolute top-2 left-3 cursor-pointer z-20  ${isOpen ? '' : ' '}`}
      >
        <IoMenu size={27} />
      </button>
    </div>
  );
};

export default Sidebar;
