// src/app/admin/page.js
'use client';

import dynamic from 'next/dynamic';

const AdminSchedule = dynamic(() => import('@/app/Components/Admin/Admin_Schedule'), {
  ssr: false, // Optional, disables server-side rendering for this component
  loading: () => <p className='flex items-center justify-center text-lg font-medium h-[100vh]'>Loading...</p>, // Optional loading indicator
});

export default AdminSchedule