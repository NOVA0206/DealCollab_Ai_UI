'use client';
import React, { useState } from 'react';
import { Smartphone, Send, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';

interface PhoneVerificationProps {
  onVerify: () => void;
  onBack: () => void;
}

export default function PhoneVerification({ onVerify, onBack }: PhoneVerificationProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setStep('otp');
      setIsLoading(false);
    }, 1200);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onVerify();
      setIsLoading(false);
    }, 1000);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors text-gray-400 hover:text-gray-600"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step 2: Phone Verification</span>
      </div>

      {step === 'phone' ? (
        <form onSubmit={handleSendOTP} className="space-y-5">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#1F2937]">Verify your phone</h3>
            <p className="text-sm text-gray-500">Receive a secure access code via WhatsApp.</p>
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F97316] transition-colors">
              <Smartphone size={18} />
            </div>
            <input
              type="tel"
              placeholder="+91 Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/50 border border-[#E5E7EB] rounded-2xl px-12 py-4 text-sm font-medium focus:bg-white focus:border-[#F97316] transition-all outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !phone}
            className="w-full bg-[#1F2937] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#F97316] transition-all shadow-lg hover:shadow-[#F97316]/20 disabled:opacity-50 group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Send OTP via WhatsApp
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#1F2937]">Enter Code</h3>
            <p className="text-sm text-gray-500">Sent to <span className="font-bold text-[#1F2937]">{phone}</span></p>
          </div>

          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(i, e.target.value)}
                className="w-12 h-14 bg-white/50 border border-[#E5E7EB] rounded-xl text-center text-lg font-bold text-[#1F2937] focus:bg-white focus:border-[#F97316] transition-all outline-none"
                required
              />
            ))}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading || otp.some(d => !d)}
              className="w-full bg-[#1F2937] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#F97316] transition-all shadow-lg hover:shadow-[#F97316]/20 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Verifying Identity...</>
              )}
            </button>

            <button 
              type="button"
              className="w-full text-xs font-bold text-gray-400 hover:text-[#F97316] transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={12} /> Resend OTP
            </button>
          </div>
        </form>
      )}

      <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400">
        <ShieldCheck size={14} className="text-green-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
      </div>
    </div>
  );
}
