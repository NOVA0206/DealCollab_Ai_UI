import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DealCollab AI",
  description: "AI-powered proposal analysis",
};

import { NotificationProvider } from '@/components/NotificationProvider';
import { UserProvider } from '@/components/UserProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';

/**
 * Security Shield: Suppress noise and interference from browser extensions 
 * (like MetaMask) that the app does not use.
 */
function ExtensionNoiseReducer() {
  if (typeof window !== 'undefined') {
    // 1. Explicitly nullify Web3 interfaces to prevent wallet popups
    // We use a getter to block attempts by extensions to re-inject
    try {
      Object.defineProperty(window, 'ethereum', {
        get() { return undefined; },
        set() { /* Block injection */ },
        configurable: false
      });
      Object.defineProperty(window, 'web3', {
        get() { return undefined; },
        set() { /* Block injection */ },
        configurable: false
      });
    } catch (e) {
      // Fallback for strict browsers
      (window as any).ethereum = undefined;
      (window as any).web3 = undefined;
    }

    // 2. Suppress console errors from extensions
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const msg = args[0]?.toString() || '';
      if (
        msg.includes('chrome-extension://') || 
        msg.includes('MetaMask') ||
        msg.includes('ethereum') ||
        msg.includes('web3')
      ) return;
      originalConsoleError.apply(console, args);
    };

    // 3. Suppress unhandled rejections from extensions
    window.addEventListener('unhandledrejection', (event) => {
      const msg = event.reason?.stack || event.reason?.message || '';
      if (
        msg.includes('chrome-extension://') || 
        msg.includes('MetaMask') ||
        msg.includes('ethereum')
      ) {
        event.preventDefault();
      }
    });
  }
}

ExtensionNoiseReducer();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <body className="min-h-screen w-full m-0 p-0 bg-white">
        <AuthProvider>
          <NotificationProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
