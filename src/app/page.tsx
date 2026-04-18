'use client';
import React, { useState, useEffect } from 'react';
import ChatArea, { Message } from "@/components/ChatArea";
import InputBar from "@/components/InputBar";
import { ChatSkeleton } from '@/components/Skeleton';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading of the chat engine
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (text: string) => {
    const userMsg: Message = {
      role: 'user',
      content: text,
      id: Date.now().toString(),
    };
    
    setMessages(prev => [...prev, userMsg]);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        role: 'assistant',
        content: text.toLowerCase().includes('acme') 
          ? "I've analyzed the Acme Corp proposal. I found some issues with the pricing terms and SLAs. Check the attached summary for details."
          : "I've received your query. How else can I assist you with your deal intelligence today?",
        id: (Date.now() + 1).toString(),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full relative overflow-hidden">
      <div className="flex-1 overflow-hidden px-6 sm:px-10 pb-[140px] flex justify-center w-full">
        {loading ? (
          <ChatSkeleton />
        ) : (
          <ChatArea messages={messages} />
        )}
      </div>
      
      {/* Input Bar Container - Sticky Bottom */}
      {!loading && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/90 to-transparent pt-20 px-6 sm:px-10 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-full pb-6">
            <InputBar onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
}
