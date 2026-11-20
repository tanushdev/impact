'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Globe, Lock, UserCheck, RefreshCw } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[400px] md:min-h-[440px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/figma/company-hero-bg.jpg"
          alt="Impact Energies Privacy Policy"
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
            <span className="text-[#10CFC9] font-medium">Privacy Policy</span>
          </div>

          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[52px] font-extralight tracking-tight leading-[1.1] mb-4 font-sans"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              Impact Energies Privacy and Cookies Policy
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. MAIN POLICY CONTENT */}
      <section className="w-full max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24 bg-white">
        <div className="space-y-12 text-[15px] md:text-[16px] text-gray-700 leading-relaxed font-normal">
          
          {/* Overview Callout Card */}
          <div className="p-8 md:p-10 rounded-3xl bg-[#FAFDF4] border border-[#E1ECD4] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#6AA335]">
              <ShieldCheck className="w-5 h-5 text-[#6AA335]" />
              <span>Last Updated: 16 May 2018</span>
            </div>
            <p className="text-[16px] md:text-[17px] text-gray-900 font-medium leading-relaxed">
              Impact Energies is committed to protecting your personal information. We comply with all UK and EU data protection legislation when collecting personal information from you as you visit this website.
            </p>
            <p className="text-gray-600">
              We are a UK registered Data Controller, number <strong className="font-semibold text-gray-900">A8298163</strong> on the Information Commissioner’s Public Register of Data Controllers.
            </p>
            <p className="text-gray-600">
              Our full contact details may be found on the{' '}
              <Link href="/contact" className="text-[#007580] font-semibold hover:underline">
                Contact
              </Link>{' '}
              page if you wish to write to us or call us. Please feel free to also contact us by email at{' '}
              <a href="mailto:info@impactenergies.com" className="text-[#007580] font-semibold hover:underline">
                info@impactenergies.com
              </a>{' '}
              at any time if you have questions about this Policy.
            </p>
          </div>

          {/* Section 1: What data we collect */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                What Data We Collect
              </h2>
            </div>
            <p>
              When you are visiting the website, we may use cookies or other tracking tools to anonymously track your use of the Site. We will only ever use this information to understand aggregate usage of our site. Please see our Cookies Policy for details of tracking technologies used on this Site.
            </p>
            <p>
              If you are signing up to receive email updates from us, we will collect your name, email address, as well as your professional details on an optional basis (if you are happy to share them with us).
            </p>
            <p>
              If you are a Shareholder, or Shareholder representative, you will access the secure Shareholder Area using a password which will be issued to you and must be changed on receipt. If you forget your password, you can reset it using the password reset link on the login page.
            </p>
          </div>

          {/* Section 2: How we use your information */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                How We Use Your Information
              </h2>
            </div>
            <p>
              If you’ve signed up to receive emails from us, we will contact you by email with updates about Impact Energies. You may unsubscribe at any time by clicking the unsubscribe link on one of the emails, or by emailing{' '}
              <a href="mailto:info@impactenergies.com" className="text-[#007580] font-semibold hover:underline">
                info@impactenergies.com
              </a>
              . We will not use your personal information for any other purpose.
            </p>
            <p>
              We do not routinely share any data with third parties but do use trusted companies to provide us with essential support, newsletter delivery and IT maintenance services. We take all appropriate steps to guarantee the reliability of any third party we use.
            </p>
          </div>

          {/* Section 3: Transfers Overseas */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Transfers Overseas
              </h2>
            </div>
            <p>
              Due to the nature of our business, we sometimes transfer data overseas, especially to South Africa and other parts of Africa.
            </p>
            <p>
              We also transfer data to other locations such as the United States for the purpose of providing newsletters and updates to subscribers. All data is processed subject to appropriate safeguards at all times, including the use of trusted third parties that subscribe to the EU-US Privacy Shield frameworks.
            </p>
          </div>

          {/* Section 4: Keeping your data */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Keeping Your Data
              </h2>
            </div>
            <p>
              We will only retain your personal data for as long as you wish to continue using our website, or until you tell us you no longer wish to receive news from us.
            </p>
            <p>
              If you are a Shareholder, your account in the Shareholder area will be kept active as long as you wish to receive Shareholder communications. In the case of newsletters, you may opt out at any time by following the process on any email from us to unsubscribe, or by contacting us at{' '}
              <a href="mailto:info@impactenergies.com" className="text-[#007580] font-semibold hover:underline">
                info@impactenergies.com
              </a>
              .
            </p>
          </div>

          {/* Section 5: Your rights */}
          <div className="border-b border-gray-100 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Your Rights
              </h2>
            </div>
            <p>
              You have rights relating to your personal information. Please contact{' '}
              <a href="mailto:info@impactenergies.com" className="text-[#007580] font-semibold hover:underline">
                info@impactenergies.com
              </a>{' '}
              if you wish to use these rights, such as making a request for your personal information, or asking us to update or delete your personal information.
            </p>
            <p>
              The Information Commissioner’s Office monitors and enforces data protection in the UK. Please see their website for further details:{' '}
              <a
                href="https://www.ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007580] font-semibold hover:underline"
              >
                www.ico.org.uk
              </a>
            </p>
          </div>

          {/* Section 6: Updates to this Policy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF5E9] flex items-center justify-center text-[#6AA335]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Updates to This Policy
              </h2>
            </div>
            <p>
              We will update this Policy with any significant changes to how we handle personal information collected via the website. If there are any substantial changes to how we manage data, we will inform you and – where appropriate – ask for your permission in advance.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

