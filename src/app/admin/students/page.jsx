// src/app/admin/page.js
'use client';

import dynamic from 'next/dynamic';

const AdminStudent = dynamic(() => import('@/app/Components/Admin/Admin_Student'), {
  ssr: false, // Optional, disables server-side rendering for this component
  loading: () => <p className='flex items-center justify-center text-lg font-medium h-[100vh]'>Loading...</p>, // Optional loading indicator
});

export default AdminStudent