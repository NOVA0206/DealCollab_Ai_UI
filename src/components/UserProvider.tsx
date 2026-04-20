'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotifications } from './NotificationProvider';

interface UserContextType {
  tokens: number;
  approvedDeals: number[];
  isEOIApproved: (dealId: number) => boolean;
  approveEOI: (dealId: number) => void;
  canSendEOI: boolean;
  onboarding: {
    phoneVerified: boolean;
    profileCompleted: boolean;
    dealSubmitted: boolean;
  };
  setOnboarding: (step: 'phoneVerified' | 'profileCompleted' | 'dealSubmitted', value: boolean) => void;
  readinessScore: {
    phone: number;         // 25
    identity: number;      // 20
    geography: number;     // 15
    expertise: number;     // 15
    intent: number;        // 10
    collaboration: number; // 10
    additional: number;    // 5
  };
  updateReadiness: (key: keyof UserContextType['readinessScore'], value: number) => void;
  addTokens: (amount: number) => void;
  totalScore: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useNotifications();
  const [tokens, setTokens] = useState(250); // Start with some tokens
  const [approvedDeals, setApprovedDeals] = useState<number[]>([]);
  const [onboarding, setOnboardingState] = useState({
    phoneVerified: true, // Default to true as per requirements
    profileCompleted: false,
    dealSubmitted: false,
  });
  const [readinessScore, setReadinessScore] = useState({
    phone: 25, // completed
    identity: 0,
    geography: 0,
    expertise: 0,
    intent: 0,
    collaboration: 0,
    additional: 0,
  });
  const [hasReceivedReward, setHasReceivedReward] = useState(false);

  const totalScore = Object.values(readinessScore).reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (totalScore === 100 && !hasReceivedReward) {
      setTokens(prev => prev + 100);
      setHasReceivedReward(true);
      setOnboarding('profileCompleted', true);
      addNotification({
        type: 'tokens_credited',
        message: '100 tokens added to your account for profile completion.',
        time: 'Just now'
      });
    }
  }, [totalScore, hasReceivedReward, addNotification]);

  const isEOIApproved = (dealId: number) => approvedDeals.includes(dealId);

  const approveEOI = (dealId: number) => {
    if (tokens >= 50 && !approvedDeals.includes(dealId)) {
      setTokens(prev => prev - 50);
      setApprovedDeals(prev => [...prev, dealId]);
    }
  };

  const setOnboarding = (step: 'phoneVerified' | 'profileCompleted' | 'dealSubmitted', value: boolean) => {
    setOnboardingState(prev => ({ ...prev, [step]: value }));
  };

  const updateReadiness = (key: keyof typeof readinessScore, value: number) => {
    setReadinessScore(prev => {
      // Rule: Only increases
      if (value > prev[key]) {
        return { ...prev, [key]: value };
      }
      return prev;
    });
  };

  const addTokens = (amount: number) => {
    setTokens(prev => prev + amount);
    addNotification({
      type: 'tokens_credited',
      message: `${amount} tokens added to your account.`,
      time: 'Just now'
    });
  };

  const canSendEOI = tokens > 0;

  return (
    <UserContext.Provider value={{ tokens, approvedDeals, isEOIApproved, approveEOI, canSendEOI, onboarding, setOnboarding, readinessScore, updateReadiness, addTokens, totalScore }}>
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
