'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNotifications } from './NotificationProvider';

interface UserContextType {
  tokens: number;
  approvedDeals: number[];
  isEOIApproved: (dealId: number) => boolean;
  approveEOI: (dealId: number) => void;
  canSendEOI: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: (reason?: 'session_expired' | 'link_expired') => void;
  onboarding: {
    phoneVerified: boolean;
    profileCompleted: boolean;
    dealSubmitted: boolean;
  };
  setOnboarding: (step: 'phoneVerified' | 'profileCompleted' | 'dealSubmitted', value: boolean) => void;
  readinessScore: {
    phone: number;
    identity: number;
    geography: number;
    expertise: number;
    intent: number;
    collaboration: number;
    additional: number;
  };
  updateReadiness: (key: keyof UserContextType['readinessScore'], value: number) => void;
  addTokens: (amount: number) => void;
  totalScore: number;
  globalError: string | null;
  setGlobalError: (error: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useNotifications();
  
  const [tokens, setTokens] = useState(250);
  const [approvedDeals, setApprovedDeals] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [onboarding, setOnboardingState] = useState({
    phoneVerified: false,
    profileCompleted: false,
    dealSubmitted: false,
  });

  const [readinessScore, setReadinessScore] = useState({
    phone: 0,
    identity: 0,
    geography: 0,
    expertise: 0,
    intent: 0,
    collaboration: 0,
    additional: 0,
  });

  // Hydrate from localStorage on mount to prevent hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const isPhoneVerified = localStorage.getItem('phoneVerified') === 'true';
      
      queueMicrotask(() => {
        if (isLoggedIn) setIsAuthenticated(true);
        if (isPhoneVerified) {
          setOnboardingState(prev => ({ ...prev, phoneVerified: true }));
          setReadinessScore(prev => ({ ...prev, phone: 25 }));
        }
      });
    }
  }, []);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  }, []);

  const [globalError, setGlobalError] = useState<string | null>(null);

  const logout = useCallback((reason?: 'session_expired' | 'link_expired') => {
    setIsAuthenticated(false);
    
    // Clear all auth-related keys
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('phoneVerified');
      localStorage.removeItem('auth');
      
      // If manual logout, show notification
      if (!reason) {
        addNotification({
          type: 'success',
          message: 'Logged out successfully',
          time: 'Just now'
        });
      }
    }

    setOnboardingState({
      phoneVerified: false,
      profileCompleted: false,
      dealSubmitted: false,
    });
    
    // Redirect with reason or success flag
    const redirectUrl = reason ? `/?error=${reason}` : '/?logout=success';
    window.location.href = redirectUrl;
  }, [addNotification]);

  const [hasReceivedReward, setHasReceivedReward] = useState(false);

  const checkAndRewardProfileCompletion = useCallback((currentReadiness: typeof readinessScore) => {
    const score = Object.values(currentReadiness).reduce((a, b) => a + b, 0);
    if (score === 100 && !hasReceivedReward) {
      setHasReceivedReward(true);
      setTokens(prev => prev + 100);
      setOnboardingState(prev => ({ ...prev, profileCompleted: true }));
      addNotification({
        type: 'tokens_credited',
        message: '100 tokens added to your account for profile completion.',
        time: 'Just now'
      });
    }
  }, [hasReceivedReward, addNotification]);

  const setOnboarding = useCallback((step: 'phoneVerified' | 'profileCompleted' | 'dealSubmitted', value: boolean) => {
    setOnboardingState(prev => {
      if (prev[step] === value) return prev;
      return { ...prev, [step]: value };
    });
    if (step === 'phoneVerified' && value) {
      localStorage.setItem('phoneVerified', 'true');
      setReadinessScore(prev => {
        const next = { ...prev, phone: 25 };
        checkAndRewardProfileCompletion(next);
        return next;
      });
    }
  }, [checkAndRewardProfileCompletion]);

  const updateReadiness = useCallback((key: keyof typeof readinessScore, value: number) => {
    setReadinessScore(prev => {
      if (value > prev[key]) {
        const next = { ...prev, [key]: value };
        checkAndRewardProfileCompletion(next);
        return next;
      }
      return prev;
    });
  }, [checkAndRewardProfileCompletion]);

  const totalScore = useMemo(() => Object.values(readinessScore).reduce((a, b) => a + b, 0), [readinessScore]);

  const isEOIApproved = useCallback((dealId: number) => approvedDeals.includes(dealId), [approvedDeals]);

  const approveEOI = useCallback((dealId: number) => {
    setTokens(prev => {
      if (prev >= 50 && !approvedDeals.includes(dealId)) {
        setApprovedDeals(d => [...d, dealId]);
        return prev - 50;
      }
      return prev;
    });
  }, [approvedDeals]);

  const addTokens = useCallback((amount: number) => {
    setTokens(prev => prev + amount);
    addNotification({
      type: 'tokens_credited',
      message: `${amount} tokens added to your account.`,
      time: 'Just now'
    });
  }, [addNotification]);

  const canSendEOI = tokens > 0;

  return (
    <UserContext.Provider value={{ 
      tokens, 
      approvedDeals, 
      isEOIApproved, 
      approveEOI, 
      canSendEOI, 
      isAuthenticated, 
      login, 
      logout,
      onboarding, 
      setOnboarding, 
      readinessScore, 
      updateReadiness, 
      addTokens, 
      totalScore,
      globalError,
      setGlobalError
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
