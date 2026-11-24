'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/news');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col justify-between">
      {/* Top Brand Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#10CFC9] via-[#70B83A] to-[#10CFC9]" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Brand Logo */}
        <div className="mb-8">
          <Image
            src="/images/figma_logo_dark.svg"
            alt="Impact Energies"
            width={190}
            height={48}
            priority
            className="h-11 w-auto object-contain"
          />
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[420px] bg-white border border-gray-200/90 rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#70B83A]">
              <Lock size={16} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#141C16] tracking-tight">CMS Administration</h1>
              <p className="text-xs text-gray-500">News &amp; Media Management Portal</p>
            </div>
          </div>

          <div className="w-full border-t border-gray-100 my-6" />

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  autoFocus
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white border border-gray-300 text-[#141C16] placeholder-gray-400 text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <span className="shrink-0 font-bold">!</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#70B83A] hover:bg-[#5E942D] active:bg-[#508125] text-white font-semibold text-[15px] transition-colors disabled:opacity-60 shadow-md shadow-[#70B83A]/20 cursor-pointer"
            >
              {loading ? 'Verifying Credentials…' : 'Sign In to CMS'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8 font-light">
          Impact Energies Internal News Management &bull; Restricted Access
        </p>
      </div>

      <div className="py-4 text-center text-gray-400 text-xs border-t border-gray-200/60 bg-white">
        &copy; {new Date().getFullYear()} Impact Energies. All rights reserved.
      </div>
    </div>
  );
}
