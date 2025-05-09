'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled inside a client component is allowed
const Work = dynamic(() => import('./Work'), { ssr: false });

export default function ClientWork() {
  return <Work />;
} 