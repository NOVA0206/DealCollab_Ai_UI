'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@/components/UserProvider';
import { useNotifications } from '@/components/NotificationProvider';
import {
   CheckCircle2, User, Mail, Phone, Briefcase, Award,
   MapPin, Target, Globe, Handshake, Info, Sparkles, Coins,
   ChevronDown, MessageSquare, ShieldCheck, Link2, Users, Map,
   FileText, Upload, Save, AlertCircle
} from 'lucide-react';
import CircularProgress from '@/components/CircularProgress';
import Confetti from '@/components/Confetti';

export default function ProfilePage() {
   const { readinessScore, updateReadiness, totalScore, tokens } = useUser();
   const { addNotification } = useNotifications();
   const [showConfetti, setShowConfetti] = useState(false);
   const [refreshing, setRefreshing] = useState(false);

   const refreshProfileData = async (isBackground = false) => {
      if (isBackground) setRefreshing(true);
      
      // Simulate background refresh of identity/tokens
      setTimeout(() => {
         if (isBackground) {
            addNotification({
               type: 'success',
               message: 'Profile intelligence synced.',
               time: 'Just now'
            });
         }
         setRefreshing(false);
      }, 1000);
   };

   useEffect(() => {
      if (totalScore === 100 && !showConfetti) {
         setShowConfetti(true);
      }
   }, [totalScore]);

   useEffect(() => {
      // Background sync every 90 seconds
      const interval = setInterval(() => {
         refreshProfileData(true);
      }, 90000);
      return () => clearInterval(interval);
   }, []);

   const [activeStep, setActiveStep] = useState(1);
   const [savingSection, setSavingSection] = useState<number | null>(null);

   // Form State
   const [formData, setFormData] = useState({
      fullName: '',
      workEmail: '',
      phone: '+1 (555) 0123-4567',
      firm: '',
      role: '',
      industry: '',
      sectors: '',
      regions: '',
      dealType: '',
      notes: '',
      hasDoc: false
   });

   const steps = [
      { id: 1, title: 'Personal Info', description: 'Name, Phone, Email', scoreKey: 'identity', weight: 30, icon: <User size={28} />, color: 'bg-[#F97316]/10 text-[#F97316]' },
      { id: 2, title: 'Professional Info', description: 'Role, Company, Industry', scoreKey: 'expertise', weight: 25, icon: <Briefcase size={28} />, color: 'bg-purple-50 text-purple-600' },
      { id: 3, title: 'Deal Preferences', description: 'Sectors, Regions, Type', scoreKey: 'intent', weight: 30, icon: <Target size={28} />, color: 'bg-green-50 text-green-600' },
      { id: 4, title: 'Documents', description: 'Optional upload', scoreKey: 'additional', weight: 15, icon: <FileText size={28} />, color: 'bg-blue-50 text-blue-600' },
   ];

   const validateSection = (stepId: number) => {
      if (stepId === 1) return formData.fullName && formData.workEmail;
      if (stepId === 2) return formData.role && formData.firm && formData.industry;
      if (stepId === 3) return formData.sectors && formData.regions && formData.dealType;
      if (stepId === 4) return true; // Optional
      return false;
   };

   const handleSaveSection = (stepId: number) => {
      setSavingSection(stepId);

      // Simulate API call
      setTimeout(() => {
         const step = steps.find(s => s.id === stepId);
         if (step && validateSection(stepId)) {
            updateReadiness(step.scoreKey as any, step.weight);
            addNotification({
               type: 'success',
               message: `${step.title} saved successfully.`,
               time: 'Just now'
            });
         } else if (stepId !== 4) {
            addNotification({
               type: 'error',
               message: `Please complete all required fields in ${step?.title || 'this section'}.`,
               time: 'Just now'
            });
         }
         setSavingSection(null);
      }, 800);
   };

   const handleScrollTo = (stepId: number) => {
      const element = document.getElementById(`step-${stepId}`);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
         setActiveStep(stepId);
      }
   };

   useEffect(() => {
      const handleScroll = () => {
         const sections = steps.map(step => document.getElementById(`step-${step.id}`));
         const scrollPosition = window.scrollY + 200;

         sections.forEach((section, index) => {
            if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
               setActiveStep(steps[index].id);
            }
         });
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div className="flex-1 flex flex-col w-full h-full bg-[#F9FAFB] relative overflow-y-auto overflow-x-hidden">
         {showConfetti && <Confetti />}

         <div className="flex flex-col w-full">

            {/* HERO SECTION */}
            <div className="w-full bg-[#1F2937] min-h-[320px] pb-32 pt-16 relative overflow-hidden z-0">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316]/5 rounded-full -mr-64 -mt-64 blur-[120px] opacity-40 pointer-events-none" />

               <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                     <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                           <div className="flex items-center gap-2">
                              <div className="bg-[#F97316] text-white p-1.5 rounded-lg shadow-lg">
                                 <Sparkles size={16} />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F97316]">Professional Intelligence Layer</span>
                           </div>
                           <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">Live</span>
                           </div>
                           {refreshing && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full animate-in fade-in slide-in-from-left-2 transition-all">
                                 <div className="w-3 h-3 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                                 <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Syncing...</span>
                              </div>
                           )}
                        </div>
                        <h1 className="text-xl sm:text-[32px] font-bold text-white leading-[1.2] tracking-tight">
                           Build Your Network Intelligence <br />
                           <span className="text-[#F97316]">(To Grow Collaboratively)</span>
                        </h1>
                        <p className="text-xs font-medium text-gray-300 leading-relaxed max-w-xl">
                           A complete profile is required for deal readiness and unlocking smart collaboration.
                        </p>

                        {totalScore < 100 && (
                           <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl max-w-xl flex items-start gap-3">
                              <AlertCircle className="text-[#F97316] shrink-0 mt-0.5" size={18} />
                              <div>
                                 <p className="text-[11px] text-orange-200 font-bold">Deal Submission Restricted</p>
                                 <p className="text-[9px] text-orange-200/70">Complete your profile (100% readiness) to unlock deal intelligence features and submission.</p>
                              </div>
                           </div>
                        )}
                     </div>

                     <div className="lg:col-span-4 flex justify-center lg:justify-end">
                        <div className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-2xl">
                           <CircularProgress percentage={totalScore} size={180} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* SUCCESS BANNER */}
            {totalScore === 100 && (
               <div className="sticky top-0 z-50 bg-green-50 border-b border-green-100 p-4 animate-in slide-in-from-top duration-500">
                  <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                           <CheckCircle2 size={20} />
                        </div>
                        <div>
                           <h3 className="text-sm font-black text-green-800 uppercase tracking-widest">Profile Optimized</h3>
                           <p className="text-xs text-green-600 font-bold">Your deal identity is verified. You can now submit deals and send EOIs.</p>
                        </div>
                     </div>
                     <div className="bg-white px-4 py-2 rounded-xl border border-green-200 flex items-center gap-2 shadow-sm">
                        <Coins size={16} className="text-[#F97316]" />
                        <span className="text-sm font-black text-[#F97316]">+100 TOKENS AWARDED</span>
                     </div>
                  </div>
               </div>
            )}

            {/* MAIN CONTENT */}
            <div className="w-full relative z-10 -mt-20">
               <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

                  {/* SIDEBAR */}
                  <div className="lg:col-span-4 lg:sticky lg:top-10 h-fit space-y-8 pb-10">
                     <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-xl space-y-6">
                        <div className="flex items-center justify-between">
                           <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Readiness Checklist</p>
                           <span className="text-[10px] font-black text-[#F97316]">{totalScore}%</span>
                        </div>

                        <div className="space-y-2">
                           {steps.map(step => (
                              <button
                                 key={step.id}
                                 onClick={() => handleScrollTo(step.id)}
                                 className={`w-full text-left p-4 rounded-2xl transition-all ${activeStep === step.id
                                       ? 'bg-gray-50/80 shadow-inner'
                                       : 'hover:bg-gray-50'
                                    }`}
                              >
                                 <div className="flex items-start gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all shrink-0 ${readinessScore[step.scoreKey as keyof typeof readinessScore] >= step.weight
                                          ? 'bg-green-100 text-green-600'
                                          : activeStep === step.id ? 'bg-[#F97316] text-white shadow-lg' : 'bg-gray-200 text-gray-400'
                                       }`}>
                                       {readinessScore[step.scoreKey as keyof typeof readinessScore] >= step.weight ? <CheckCircle2 size={16} /> : step.id}
                                    </div>
                                    <div>
                                       <p className={`text-sm font-bold tracking-tight ${activeStep === step.id ? 'text-[#F97316]' : 'text-[#1F2937]'}`}>
                                          {step.title}
                                       </p>
                                       <p className="text-[10px] text-[#6B7280] font-medium leading-tight mt-0.5">{step.description}</p>
                                    </div>
                                 </div>
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* FORMS */}
                  <div className="lg:col-span-8 space-y-12 pb-32">

                     {steps.map((step) => (
                        <section
                           key={step.id}
                           id={`step-${step.id}`}
                           className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-xl scroll-mt-32 space-y-10"
                        >
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-5">
                                 <div className={`w-14 h-14 ${step.color} rounded-[20px] flex items-center justify-center shadow-sm`}>
                                    {step.icon}
                                 </div>
                                 <div>
                                    <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">{step.title}</h2>
                                    <p className="text-base text-[#6B7280] font-medium">{step.description}</p>
                                 </div>
                              </div>
                              <button
                                 onClick={() => handleSaveSection(step.id)}
                                 disabled={savingSection === step.id}
                                 className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${savingSection === step.id
                                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                       : 'bg-[#1F2937] text-white hover:bg-[#F97316] hover:shadow-lg hover:shadow-[#F97316]/20'
                                    }`}
                              >
                                 {savingSection === step.id ? (
                                    <>
                                       <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                                       Saving...
                                    </>
                                 ) : (
                                    <>
                                       <Save size={16} />
                                       Save Section
                                    </>
                                 )}
                              </button>
                           </div>

                           {step.id === 1 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6B7280]">Full Name *</label>
                                    <input
                                       type="text"
                                       placeholder="Legal Name"
                                       value={formData.fullName}
                                       onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                       className={`w-full bg-gray-50 border rounded-2xl px-5 py-4 text-sm font-medium focus:bg-white focus:border-[#F97316]/50 transition-all outline-none ${!formData.fullName && 'border-transparent'}`}
                                    />
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6B7280]">Work Email *</label>
                                    <input
                                       type="email"
                                       placeholder="name@business.com"
                                       value={formData.workEmail}
                                       onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                                       className={`w-full bg-gray-50 border rounded-2xl px-5 py-4 text-sm font-medium focus:bg-white focus:border-[#F97316]/50 transition-all outline-none ${!formData.workEmail && 'border-transparent'}`}
                                    />
                                 </div>
                                 <div className="space-y-3 opacity-60">
                                    <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6B7280]">Verified Mobile</label>
                                    <div className="w-full bg-gray-100/50 rounded-2xl px-5 py-4 text-sm text-gray-500 flex items-center justify-between">
                                       <span>{formData.phone}</span>
                                       <ShieldCheck size={18} className="text-green-500" />
                                    </div>
                                 </div>
                              </div>
                           )}

                           {step.id === 2 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6B7280]">Current Role *</label>
                                    <input
                                       type="text"
                                       placeholder="Job Title"
                                       value={formData.role}
                                       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                       className="w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-sm font-medium focus:bg-white focus:border-[#F97316]/50 transition-all outline-none"
                                    />
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6B7280]">Company / Firm *</label>
                                    <input
                                       type="text"
                                       placeholder="Firm Name"
                                       value={formData.firm}
                                       onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                                       className="w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-sm font-medium focus:bg-white focus:border-[#F97316]/50 transition-all outline-none"
                                    />
                                 </div>
                                 <div className="md:col-span-2 space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6B7280]">Industry Focus *</label>
                                    <input
                                       type="text"
                                       placeholder="e.g. Fintech, Healthcare, Renewable Energy"
                                       value={formData.industry}
                                       onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                       className="w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-sm font-medium focus:bg-white focus:border-[#F97316]/50 transition-all outline-none"
                                    />
                                 </div>
                              </div>
                           )}

                           {step.id === 3 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-3 md:col-span-2">
                                    <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6B7280]">Preferred Sectors *</label>
                                    <input
                                       type="text"
                                       placeholder="Sectors of interest for deals"
                                       value={formData.sectors}
                                       onChange={(e) => setFormData({ ...formData, sectors: e.target.value })}
                                       className="w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-sm font-medium focus:bg-white focus:border-[#F97316]/50 transition-all outline-none"
                                    />
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[#6B7280]">Target regions *</label>
                                    <select
                                       value={formData.regions}
                                       onChange={(e) => setFormData({ ...formData, regions: e.target.value })}
                                       className="w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-[#1F2937] focus:bg-white focus:border-[#F97316]/50 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                       <option value="">Select Region</option>
                                       <option value="Global">Global</option>
                                       <option value="North America">North America</option>
                                       <option value="UK / Europe">UK / Europe</option>
                                       <option value="MENA">MENA / Middle East</option>
                                       <option value="ASEAN">ASEAN / SE Asia</option>
                                    </select>
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-[#6B7280]">Deal Type *</label>
                                    <select
                                       value={formData.dealType}
                                       onChange={(e) => setFormData({ ...formData, dealType: e.target.value })}
                                       className="w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-[#1F2937] focus:bg-white focus:border-[#F97316]/50 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                       <option value="">Select Type</option>
                                       <option value="M&A">M&A / Acquisition</option>
                                       <option value="Fundraising">Fundraising / Equity</option>
                                       <option value="Partnership">Strategic Partnership</option>
                                       <option value="Joint Venture">Joint Venture</option>
                                    </select>
                                 </div>
                              </div>
                           )}

                           {step.id === 4 && (
                              <div className="space-y-6">
                                 <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                                    Uploading professional certifications, track record summaries, or proof of funds can increase your readiness score and deal trust.
                                 </p>

                                 <div className="border-2 border-dashed border-gray-200 rounded-[32px] p-12 flex flex-col items-center justify-center space-y-4 hover:border-[#F97316]/30 hover:bg-orange-50/10 transition-all group cursor-pointer">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-orange-100/50 transition-all">
                                       <Upload className="text-gray-400 group-hover:text-[#F97316]" size={28} />
                                    </div>
                                    <div className="text-center">
                                       <p className="text-sm font-bold text-[#1F2937]">Drop files here or click to upload</p>
                                       <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest mt-1">PDF, DOCX up to 10MB</p>
                                    </div>
                                 </div>

                                 <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                                    <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
                                    <p className="text-[11px] font-medium text-blue-700 leading-normal">
                                       Documents are encrypted and only accessible by verified counterparties during the due diligence phase.
                                    </p>
                                 </div>
                              </div>
                           )}

                        </section>
                     ))}

                     {/* ADDITIONAL SUMMARY (STILL PRESERVED BUT NOT A STEP) */}
                     <section className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-xl space-y-10">
                        <div className="flex items-center gap-5">
                           <div className="w-14 h-14 bg-gray-50 text-gray-600 rounded-[20px] flex items-center justify-center">
                              <Link2 size={28} />
                           </div>
                           <div>
                              <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">Additional Context</h2>
                              <p className="text-base text-[#6B7280] font-medium">Final touches to your professional identity</p>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6B7280]">Work Summary</label>
                           <textarea
                              placeholder="Current focus, track record, or specific requirements..."
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                              className="w-full h-40 bg-gray-50 border border-transparent rounded-2xl p-5 text-sm font-medium focus:bg-white focus:border-[#F97316]/50 transition-all outline-none resize-none"
                           />
                        </div>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
