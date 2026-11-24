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
    <div className="min-h-screen bg-[#0A0F0C] flex flex-col">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#10CFC9] via-[#70B83A] to-[#10CFC9]" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/images/figma_logo_146_15635.svg"
            alt="Impact Energies"
            width={170}
            height={44}
            className="brightness-200 invert-0"
            priority
          />
        </div>

        {/* Card */}
        <div className="w-full max-w-[400px] bg-[#111A13] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
          {/* Card header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#70B83A]/15 flex items-center justify-center">
                <Lock size={15} className="text-[#70B83A]" />
              </div>
              <h1 className="text-white text-xl font-bold tracking-tight">CMS Login</h1>
            </div>
            <p className="text-gray-500 text-sm ml-11">News &amp; Media Administration</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-8 py-7 space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0A0F0C] border border-white/10 text-white placeholder-gray-600 text-[15px] focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <span className="shrink-0">⚠</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#70B83A] hover:bg-[#5ea32a] active:bg-[#4f8f24] text-white font-semibold text-[15px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#70B83A]/20"
            >
              {loading ? 'Signing in…' : 'Sign In to CMS'}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center space-y-1">
          <p className="text-gray-600 text-xs">Impact Energies · News &amp; Media CMS v1.0</p>
          <p className="text-gray-700 text-xs">Restricted access — authorised personnel only</p>
        </div>
      </div>
    </div>
  );
}
