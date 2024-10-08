'use client';
import { SidebarNavItem } from '@/types';
import Link from 'next/link';
import React from 'react';
import { Icon as Icons } from './icon';
import { usePathname } from 'next/navigation';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

const DashboardNav = ({ items }: DashboardNavProps) => {
  const path = usePathname();
  return (
    <nav>
      {items.map((item, index) => {
        if (!items.length) {
          return null;
        }
        const Icon = Icons[item.icon || 'aroowRight'];
        return (
          <Link key={index} href={item.href!}>
            <span
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                path === item.href ? 'bg-accent' : 'bg-transparent'
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
