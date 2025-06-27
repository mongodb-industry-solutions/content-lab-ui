"use client";

import { MongoDBLogo } from '@leafygreen-ui/logo';
import { H1, Body } from '@leafygreen-ui/typography';
import Link from 'next/link';
import useMobile from '../hooks/useMobile';

const navItems = [
  {
    href: '/trending-topics',
    label: 'Trending Topics',
  },
  {
    href: '/drafts',
    label: 'Draft Writings',
  },
  {
    href: '/my-topics',
    label: 'My Topics',
  }
];

export default function Sidebar() {
  const isMobile = useMobile();
  
  return (
    <div className="min-h-screen bg-lg-green-dark2 flex flex-col gap-24">
      {/* MongoDB Logo and Title */}
      <div className="flex flex-col items-center gap-10">
        <MongoDBLogo 
          color="white" 
          height={isMobile ? 48 : 50}
          style={{ marginTop: '2rem' }} 
        />
        <H1 style={{ color: 'white', textAlign: 'center', fontSize: '3rem', lineHeight: '1.3' }}>
          The <br />
          Content <br />
          Lab
        </H1>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col items-center gap-6">
        {navItems.map((item) => {
          return (
            <Link 
              key={item.href}
              href={item.href}
              className="text-center rounded-full bg-lg-white w-4/5"
            >
              <Body style={{ padding: '16px', fontWeight: 'bold'}}>{item.label}</Body>
            </Link>
          );
        })}
      </div>
    </div>
  );}
