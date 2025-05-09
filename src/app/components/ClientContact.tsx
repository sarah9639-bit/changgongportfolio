'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled inside a client component is allowed
const Contact = dynamic(() => import('./Contact'), { ssr: false });

export default function ClientContact() {
  return <Contact />;
} 