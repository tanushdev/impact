'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText, Download, CheckCircle2, AlertCircle, LogOut, Mail, User, ShieldCheck } from 'lucide-react';

export default function InvestorsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'circulars' | 'letters' | 'reports' | 'secretary'>('circulars');

  // Email subscribe form state
  const [subFirstName, setSubFirstName] = useState('');
  const [subLastName, setSubLastName] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [subOrg, setSubOrg] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('iel_shareholder_logged_in');
    if (saved === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter your username and password.');
      return;
    }
    // Authenticate user
    setIsLoggedIn(true);
    setLoginError('');
    if (rememberMe) {
      localStorage.setItem('iel_shareholder_logged_in', 'true');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('iel_shareholder_logged_in');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim() || !subFirstName.trim()) return;
    setSubStatus('success');
  };

  const circulars = [
    {
      title: 'SHAREHOLDER CIRCULAR - NOVEMBER 2024',
      date: 'NOVEMBER 26, 2024',
      description: 'Shareholder Circular - This document should be read as a whole, as per the e-mail you will have received.',
      fileName: 'Shareholder-Circular-Nov-2024.pdf',
    },
    {
      title: 'SHAREHOLDER CIRCULAR - MARCH 2023',
      date: 'MARCH 27, 2023',
      description: 'Shareholder Circular - This document should be read as a whole, as per the e-mail you will have received.',
      fileName: 'Shareholder-Circular-Mar-2023.pdf',
    },
    {
      title: 'SHAREHOLDER CIRCULAR - JULY 2022',
      date: 'JULY 18, 2022',
      description: 'Shareholder Circular - This document should be read as a whole, as per the e-mail you will have received.',
      fileName: 'Shareholder-Circular-Jul-2022.pdf',
    },
  ];

  const letters = [
    {
      title: 'ANNUAL LETTER TO SHAREHOLDERS 2024',
      date: 'OCTOBER 15, 2024',
      description: 'Comprehensive operational review and strategic portfolio update from the Chief Executive Officer.',
      fileName: 'Annual-Letter-To-Shareholders-2024.pdf',
    },
    {
      title: 'INTERIM SHAREHOLDER UPDATE - Q2 2024',
      date: 'JUNE 30, 2024',
      description: 'Overview of exploratory progress, deepwater surveys, and capital allocation.',
      fileName: 'Interim-Shareholder-Update-Q2-2024.pdf',
    },
  ];

  const annualReports = [
    {
      title: 'ANNUAL REPORT & FINANCIAL STATEMENTS 2023',
      date: 'DECEMBER 31, 2023',
      description: 'Audited statutory accounts, governance disclosures, and directors’ report.',
      fileName: 'Annual-Report-Financial-Statements-2023.pdf',
    },
    {
      title: 'ANNUAL REPORT & FINANCIAL STATEMENTS 2022',
      date: 'DECEMBER 31, 2022',
      description: 'Audited annual financial results and independent auditor statement.',
      fileName: 'Annual-Report-Financial-Statements-2022.pdf',
    },
  ];

  const secretaryNotices = [
    {
      title: 'NOTICE OF ANNUAL GENERAL MEETING 2024',
      date: 'NOVEMBER 04, 2024',
      description: 'Notice of AGM, resolutions to be proposed, and proxy voting guidelines for registered shareholders.',
      fileName: 'AGM-Notice-Proxy-Form-2024.pdf',
    },
    {
      title: 'COMPANY SECRETARIAL ADVISORY & REGISTER OF MEMBERS',
      date: 'JANUARY 12, 2024',
      description: 'Guidance on transfer of shares, change of address notifications, and nominee accounts.',
      fileName: 'Company-Secretarial-Advisory.pdf',
    },
  ];

  return (
    <div className="w-full bg-[#FAFBF9] text-[#141C16]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/figma/company-hero-bg.jpg"
          alt="Impact Energies Investors and Shareholder Relations"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          <div className="text-[15px] text-gray-300 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">Investors</span>
            {isLoggedIn && (
              <>
                <span>/</span>
                <span className="text-gray-300">Shareholder Area</span>
              </>
            )}
          </div>

          <div className="max-w-2xl text-white">
            <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block mb-2">
              Investor relations
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[54px] font-extralight tracking-tight leading-[1.1] mb-5 font-sans"
            >
              Investors
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              Investors can find our latest reports and financial information here.
              The subscription option provides email notification of company announcements to any public subscriber.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT: LOGGED IN vs LOGGED OUT */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <AnimatePresence mode="wait">
          {isLoggedIn ? (
            /* ================= PRIVATE SHAREHOLDER PORTAL (SLIDE 4) ================= */
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              {/* Portal Header Bar */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <div className="bg-[#2D332D] text-white py-5 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#70B83A]" />
                    <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase">
                      Shareholder Area
                    </h2>
                  </div>
                  <div className="flex items-center gap-6 text-[15px]">
                    <span className="text-gray-300 font-medium">
                      HELLO <strong className="text-white font-bold">{username || 'ROSS WEAVER'}</strong>
                    </span>
                    <span className="text-gray-500">|</span>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-1.5 text-[#10CFC9] hover:text-white font-semibold transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      LOGOUT
                    </button>
                  </div>
                </div>

                {/* Sub-header Tabs matching Slide 4 */}
                <div className="bg-[#FAFBF9] border-b border-gray-200 px-6 sm:px-8 py-3 flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { id: 'circulars', label: 'SHAREHOLDER CIRCULARS' },
                    { id: 'letters', label: 'LETTERS TO SHAREHOLDERS' },
                    { id: 'reports', label: 'ANNUAL REPORTS' },
                    { id: 'secretary', label: 'COMPANY SECRETARY' },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-5 py-2.5 rounded-lg text-[14px] sm:text-[15px] font-bold tracking-wide transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#007580] text-white shadow-xs'
                            : 'bg-[#434945] text-gray-200 hover:bg-[#323734]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Contents */}
              <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-xs space-y-10">
                {activeTab === 'circulars' && (
                  <div className="space-y-8">
                    {circulars.map((circ) => (
                      <div key={circ.title} className="space-y-2.5 pb-8 border-b border-gray-100 last:border-b-0">
                        <h3 className="text-lg md:text-[20px] font-bold text-[#007580] tracking-tight">
                          {circ.title}
                        </h3>
                        <p className="text-[14px] font-semibold text-gray-500 uppercase tracking-wider">
                          {circ.date}
                        </p>
                        <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                          {circ.description}
                        </p>
                        <div className="pt-2">
                          <a
                            href={`/documents/${circ.fileName}`}
                            download
                            className="inline-flex items-center gap-3 w-full sm:w-auto px-5 py-3 rounded-lg bg-[#EAEAEA] hover:bg-[#DFDFDF] text-gray-800 text-[15px] font-semibold transition-colors"
                          >
                            <FileText className="w-5 h-5 text-gray-700 flex-shrink-0" />
                            <span>{circ.title}</span>
                            <Download className="w-4 h-4 text-gray-500 ml-auto sm:ml-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'letters' && (
                  <div className="space-y-8">
                    {letters.map((letItem) => (
                      <div key={letItem.title} className="space-y-2.5 pb-8 border-b border-gray-100 last:border-b-0">
                        <h3 className="text-lg md:text-[20px] font-bold text-[#007580] tracking-tight">
                          {letItem.title}
                        </h3>
                        <p className="text-[14px] font-semibold text-gray-500 uppercase tracking-wider">
                          {letItem.date}
                        </p>
                        <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                          {letItem.description}
                        </p>
                        <div className="pt-2">
                          <a
                            href={`/documents/${letItem.fileName}`}
                            download
                            className="inline-flex items-center gap-3 w-full sm:w-auto px-5 py-3 rounded-lg bg-[#EAEAEA] hover:bg-[#DFDFDF] text-gray-800 text-[15px] font-semibold transition-colors"
                          >
                            <FileText className="w-5 h-5 text-gray-700 flex-shrink-0" />
                            <span>{letItem.title}</span>
                            <Download className="w-4 h-4 text-gray-500 ml-auto sm:ml-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reports' && (
                  <div className="space-y-8">
                    {annualReports.map((rep) => (
                      <div key={rep.title} className="space-y-2.5 pb-8 border-b border-gray-100 last:border-b-0">
                        <h3 className="text-lg md:text-[20px] font-bold text-[#007580] tracking-tight">
                          {rep.title}
                        </h3>
                        <p className="text-[14px] font-semibold text-gray-500 uppercase tracking-wider">
                          {rep.date}
                        </p>
                        <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                          {rep.description}
                        </p>
                        <div className="pt-2">
                          <a
                            href={`/documents/${rep.fileName}`}
                            download
                            className="inline-flex items-center gap-3 w-full sm:w-auto px-5 py-3 rounded-lg bg-[#EAEAEA] hover:bg-[#DFDFDF] text-gray-800 text-[15px] font-semibold transition-colors"
                          >
                            <FileText className="w-5 h-5 text-gray-700 flex-shrink-0" />
                            <span>{rep.title}</span>
                            <Download className="w-4 h-4 text-gray-500 ml-auto sm:ml-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'secretary' && (
                  <div className="space-y-8">
                    {secretaryNotices.map((sec) => (
                      <div key={sec.title} className="space-y-2.5 pb-8 border-b border-gray-100 last:border-b-0">
                        <h3 className="text-lg md:text-[20px] font-bold text-[#007580] tracking-tight">
                          {sec.title}
                        </h3>
                        <p className="text-[14px] font-semibold text-gray-500 uppercase tracking-wider">
                          {sec.date}
                        </p>
                        <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                          {sec.description}
                        </p>
                        <div className="pt-2">
                          <a
                            href={`/documents/${sec.fileName}`}
                            download
                            className="inline-flex items-center gap-3 w-full sm:w-auto px-5 py-3 rounded-lg bg-[#EAEAEA] hover:bg-[#DFDFDF] text-gray-800 text-[15px] font-semibold transition-colors"
                          >
                            <FileText className="w-5 h-5 text-gray-700 flex-shrink-0" />
                            <span>{sec.title}</span>
                            <Download className="w-4 h-4 text-gray-500 ml-auto sm:ml-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* ================= PUBLIC INVESTOR PAGE (SLIDE 3) ================= */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
            >
              {/* Left Column: Shareholder Login Box */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Header Band */}
                <div className="bg-[#2D332D] text-white py-5 px-8 flex items-center justify-between border-b-4 border-[#70B83A]">
                  <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase">
                    Shareholder Login
                  </h2>
                  <Lock className="w-5 h-5 text-[#70B83A]" />
                </div>

                <div className="p-8 sm:p-10 bg-[#FAFDF5]">
                  <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                    Registered shareholders and investor representatives may log in below to access private circulars, letters, and statutory company filings.
                  </p>

                  <form onSubmit={handleLogin} className="space-y-6">
                    {loginError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[14px] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[15px] font-semibold text-gray-800 uppercase tracking-wider mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username or email"
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-300 bg-white text-[15px] text-gray-900 focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/20 transition-all shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-semibold text-gray-800 uppercase tracking-wider mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-300 bg-white text-[15px] text-gray-900 focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/20 transition-all shadow-xs"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[15px]">
                      <label className="flex items-center gap-2.5 text-gray-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-[#70B83A] focus:ring-[#70B83A] border-gray-300 cursor-pointer"
                        />
                        <span>Remember me</span>
                      </label>

                      <a
                        href="mailto:ir@impactenergies.com?subject=Shareholder%20Password%20Reset%20Request"
                        className="text-[#007580] hover:text-[#0EB5AF] font-medium underline transition-colors"
                      >
                        Lost your password?
                      </a>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl text-white font-bold text-[16px] uppercase tracking-wider bg-[#70B83A] hover:bg-[#5E942D] shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Login
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center pt-2">
                      Need access? Please contact{' '}
                      <a href="mailto:ir@impactenergies.com" className="text-[#007580] font-semibold hover:underline">
                        ir@impactenergies.com
                      </a>
                    </p>
                  </form>
                </div>
              </div>

              {/* Right Column: Subscribe for Email Updates */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-[#2D332D] text-white py-5 px-8 flex items-center justify-between border-b-4 border-[#10CFC9]">
                  <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase">
                    Subscribe for Updates
                  </h2>
                  <Mail className="w-5 h-5 text-[#10CFC9]" />
                </div>

                <div className="p-8 sm:p-10 bg-[#FAFDF5]">
                  {subStatus === 'success' ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#EBF7EA] text-[#70B83A] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Subscription Confirmed</h3>
                      <p className="text-[15px] text-gray-600 max-w-sm mx-auto">
                        Thank you for subscribing. You will receive notifications of company announcements and regulatory disclosures.
                      </p>
                      <button
                        onClick={() => setSubStatus('idle')}
                        className="inline-flex items-center px-6 py-2.5 rounded-full text-[15px] font-semibold text-white bg-[#007580] hover:bg-[#005f68] transition-colors cursor-pointer"
                      >
                        Subscribe another email
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                        Sign up to receive company announcements, regulatory news, and investor briefings as they are released.
                      </p>

                      <form onSubmit={handleSubscribe} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[14px] font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                              First Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={subFirstName}
                              onChange={(e) => setSubFirstName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-[15px] text-gray-900 focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/20 transition-all shadow-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[14px] font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={subLastName}
                              onChange={(e) => setSubLastName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-[15px] text-gray-900 focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/20 transition-all shadow-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[14px] font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={subEmail}
                            onChange={(e) => setSubEmail(e.target.value)}
                            placeholder="your.email@domain.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-[15px] text-gray-900 focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/20 transition-all shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[14px] font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                            Organisation (Optional)
                          </label>
                          <input
                            type="text"
                            value={subOrg}
                            onChange={(e) => setSubOrg(e.target.value)}
                            placeholder="Company or Fund Name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-[15px] text-gray-900 focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/20 transition-all shadow-xs"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl text-white font-bold text-[15px] uppercase tracking-wider bg-[#10CFC9] hover:bg-[#0EB5AF] shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                          >
                            Subscribe
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

