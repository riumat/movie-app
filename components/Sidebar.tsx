"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { sidebarItems } from '@/utils/constants';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <nav className={`text-white w-48 min-h-[98vh] p-4 bg-black rounded m-2 absolute inset-0 top-0  z-50 border border-teal-50/60 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="text-2xl font-bold mb-8 text-center">moviedb</div>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.path} className="mb-4">
              <Link href={item.path}>
                <span
                  className={`block p-2 rounded hover:bg-teal-50 hover:text-slate-950 duration-100 ${pathname === item.path ? 'bg-teal-50 text-slate-950' : ''
                    }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={toggleSidebar}
        className={`absolute top-1/2 left-[182px] transform -translate-y-1/2 text-black hover:text-teal-950  border-black border rounded-full shadow-[0_0_5px_#dbfffb] bg-teal-50 text-[34px] z-50 transition-all duration-300 ${isOpen ? '' : 'translate-x-[-180px] '}`}
      >
        {isOpen ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
      </button>
    </div>
  );
};

export default Sidebar;
