"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Discover', path: '/discover' },
    { label: 'Genres', path: '/genres' },
    { label: 'Popular', path: '/popular' },
  ];

  return (
    <nav className="bg-black border-r  text-white w-48 min-h-screen p-4">
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
  );
};

export default Sidebar;
