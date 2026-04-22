'use client';
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from './NotificationProvider';
import { UserProvider } from './UserProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NotificationProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </NotificationProvider>
    </SessionProvider>
  );
}
