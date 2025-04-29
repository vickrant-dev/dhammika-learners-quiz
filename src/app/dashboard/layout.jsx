'use client';

import DashboardSidebar from '@/app/Components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="pl-[282px] mr-10 w-full">{children}</main>
    </div>
  );
}
