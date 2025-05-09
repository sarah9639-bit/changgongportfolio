'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled inside a client component is allowed
const Services = dynamic(() => import('./Services'), { ssr: false });

export default function ClientServices() {
  return <Services />;
} 