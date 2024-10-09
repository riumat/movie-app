"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Discover', path: '/discover' },
    { label: 'Genres', path: '/genres' },
    { label: 'Popular', path: '/popular' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <nav className={`text-white w-48 min-h-[98vh] p-4 bg-gradient-to-b from-black to-teal-950/90 rounded m-2 absolute inset-0 top-0  z-50 border-2 border-teal-200/40 shadow-[0_0_10px_#2dd4bf] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="text-2xl font-bold mb-8 text-center">moviedb</div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-4">
              <Link href={item.path}>
                <span
                  className={`block p-2 rounded hover:bg-slate-200 hover:text-slate-950 duration-200 ${pathname === item.path ? 'bg-slate-200 text-slate-950' : ''
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
        className={`absolute top-1/2 left-[188px] transform -translate-y-1/2 text-black border-black border rounded-full shadow-[0_0_10px_#2dd4bf] bg-teal-200 text-[34px] z-50 transition-all duration-300 ${isOpen ? '' : 'translate-x-[-192px] '}`}
      >
        {isOpen ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
      </button>
    </div>
  );
};

export default Sidebar;
