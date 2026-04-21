'use client';
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useUser } from '@/components/UserProvider';
import { useRouter } from 'next/navigation';
import GlobalErrorBanner from '@/components/GlobalErrorBanner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    // If we've determined the user is not authenticated, boot them to root
    if (!isAuthenticated && typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Immediate protection during the render cycle
  if (typeof window !== 'undefined' && !isAuthenticated && localStorage.getItem('isLoggedIn') !== 'true') {
     return null;
  }

  return (
    <DashboardLayout>
      <GlobalErrorBanner />
      {children}
    </DashboardLayout>
  );
}
