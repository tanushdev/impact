'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cookie, ShieldCheck, Settings, BarChart3, HelpCircle, Mail } from 'lucide-react';

export default function CookiesPolicyPage() {
  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[400px] md:min-h-[440px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/figma/company-hero-bg.jpg"
          alt="Impact Energies Cookies Policy"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          {/* Breadcrumb */}
          <div className="text-[15px] text-gray-300 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">Cookies Policy</span>
          </div>

          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[52px] font-extralight tracking-tight leading-[1.1] mb-4 font-sans"
            >
              Cookies Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              How Impact Energies uses cookies and tracking technologies.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. MAIN COOKIES CONTENT */}
      <section className="w-full max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24 bg-white">
        <div className="space-y-12 text-[15px] md:text-[16px] text-gray-700 leading-relaxed font-normal">
          
          {/* Notice Card */}
          <div className="p-8 md:p-10 rounded-3xl bg-[#FAFDF4] border border-[#E1ECD4] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#6AA335]">
              <Cookie className="w-5 h-5 text-[#6AA335]" />
              <span>Cookies &amp; Tracking Technologies</span>
            </div>
            <p className="text-[16px] md:text-[17px] text-gray-900 font-medium leading-relaxed">
              This Cookies Policy explains how Impact Energies (“we”, “us”, or “our”) uses cookies and similar technologies when you visit our website. This policy should be read alongside our{' '}
              <Link href="/privacy-policy" className="text-[#007580] font-semibold hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms-and-conditions" className="text-[#007580] font-semibold hover:underline">
                Terms &amp; Conditions
              </Link>.
            </p>
          </div>

          {/* Section 1: What Are Cookies */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                1. What Are Cookies?
              </h2>
            </div>
            <p>
              Cookies are small data files placed on your computer, smartphone, or other browsing device when you visit a website. Cookies are widely used to make websites work efficiently, remember your preferences, and provide aggregated analytics to site operators.
            </p>
            <p>
              Cookies may be “session cookies” (which expire when you close your web browser) or “persistent cookies” (which remain on your device until they expire or are manually deleted).
            </p>
          </div>

          {/* Section 2: How We Use Cookies */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                2. How We Use Cookies
              </h2>
            </div>
            <p>
              We only use cookies to provide essential site functionality and to anonymously understand aggregate usage patterns across our website. We do not use cookies to sell your data or deliver targeted third-party advertising.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#6AA335]" />
                  <span>Strictly Necessary Cookies</span>
                </div>
                <p className="text-sm text-gray-600">
                  Essential for technical site operation, navigation, security checks, and routing. These cannot be disabled.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <BarChart3 className="w-4 h-4 text-[#007580]" />
                  <span>Analytical / Performance Cookies</span>
                </div>
                <p className="text-sm text-gray-600">
                  Allow us to recognize and count visitor numbers anonymously to see how users move around our site and improve navigation.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Third Party Cookies */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <Cookie className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                3. Third-Party Services
              </h2>
            </div>
            <p>
              We may utilize trusted third-party analytics and infrastructure providers (such as hosting and CDN partners) that set cookies on our behalf to ensure high availability, fast asset loading, and anonymous metric aggregation.
            </p>
            <p>
              These third parties are subject to strict confidentiality agreements and data protection standards in accordance with UK and EU legislation.
            </p>
          </div>

          {/* Section 4: Managing Cookies */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                4. Managing &amp; Disabling Cookies
              </h2>
            </div>
            <p>
              Most web browsers allow you to control cookies through browser settings. You can configure your browser to reject all cookies, notify you when a cookie is placed, or delete existing cookies at any time.
            </p>
            <p>
              To find out more about cookies, including how to see what cookies have been set and how to manage or delete them, visit{' '}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007580] font-semibold hover:underline"
              >
                www.allaboutcookies.org
              </a>{' '}
              or the Information Commissioner’s Office at{' '}
              <a
                href="https://www.ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007580] font-semibold hover:underline"
              >
                www.ico.org.uk
              </a>.
            </p>
          </div>

          {/* Section 5: Contact Us */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                5. Questions &amp; Contact
              </h2>
            </div>
            <p>
              If you have any questions about our use of cookies or tracking technologies, please contact us by email at{' '}
              <a href="mailto:info@impactenergies.com" className="text-[#007580] font-semibold hover:underline">
                info@impactenergies.com
              </a>{' '}
              or write to our registered office:
            </p>
            <p className="text-gray-600 pl-4 border-l-2 border-[#6AA335]">
              Impact Energies<br />
              27 Old Gloucester Street,<br />
              London, WC1N 3AX,<br />
              United Kingdom
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

