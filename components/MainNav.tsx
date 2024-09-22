'use client';
import { NavItem } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react';
import MobileNav from './MobileNav';

interface MainNavProps {
  items: NavItem[];
  children?: React.ReactNode;
}

const MainNav = ({ items }: MainNavProps) => {
  const [showMobile, setShowMobile] = useState<boolean>(false);
  return (
    <div className="flex items-center md:gap-10">
      <Link href={'/'} className="hidden md:flex items-center space-x-2">
        <span className="font-bold hidden sm:inline-block">PostWriter</span>
      </Link>
      <nav className="md:flex gap-6 hidden">
        {items?.map((item, index) => (
          <Link
            href={item.href}
            className="text-lg sm:text-sm font-medium hover:text-foreground/80"
            key={index}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <button className="md:hidden" onClick={() => setShowMobile(!showMobile)}>
        <span>メニュー</span>
      </button>
      {showMobile && <MobileNav items={items} />}
    </div>
  );
};

export default MainNav;
