'use client';

import AdminSidebar from './AdminSidebar';
import { useEffect, useState } from 'react';

export default function ClientAdminLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex min-h-screen bg-base-200">
      <AdminSidebar />
      <main
        className={`flex-1 transition-all duration-300 ${
          isMobile ? 'pl-[3rem] pt-[1.2rem]' : 'pl-0 pt-[2rem]'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
