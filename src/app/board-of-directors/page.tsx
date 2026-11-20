'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BoardOfDirectorsPage() {
  const executiveDirectors = [
    {
      name: 'SIRAJ AHMED',
      role: 'CHIEF EXECUTIVE OFFICER',
      cardImage: '/images/figma/siraj-ahmed-card.png',
    },
    {
      name: 'SAMITAN SHARMA',
      role: 'CHIEF FINANCIAL OFFICER',
      cardImage: '/images/figma/samitan-sharma-card.png',
    },
  ];

  const nonExecutiveDirectors = [
    {
      name: 'JOHNNY COPELYN',
      role: 'NON-EXECUTIVE CHAIRMAN',
      cardImage: '/images/figma/johnny-copelyn-card.png',
    },
    {
      name: 'ROB NICOLELLA',
      role: 'NON-EXECUTIVE DIRECTOR',
      cardImage: '/images/figma/rob-nicolella-card.png',
    },
  ];

  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION (Exact 1:1 match to Figma) */}
      <section className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/figma/company-hero-bg.jpg"
          alt="Impact Energies Board of Directors"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          {/* Breadcrumb */}
          <div className="text-[15px] text-gray-300 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">Board of Directors</span>
          </div>

          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[54px] font-extralight tracking-tight leading-[1.1] mb-5 font-sans"
            >
              Board of Directors
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              Impact Energies Limited has a strong management team and Board with a track record of success.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. DIRECTORS SECTIONS (Exact 1:1 match to Figma) */}
      <section className="w-full max-w-[1360px] mx-auto px-6 md:px-12 pt-20 pb-24 bg-white">
        {/* Section 1: Executive Directors */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#141C16] text-center tracking-tight mb-10">
            Executive Directors
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 max-w-4xl mx-auto">
            {executiveDirectors.map((director) => (
              <div
                key={director.name}
                className="w-[280px] sm:w-[320px] md:w-[340px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Image
                  src={director.cardImage}
                  alt={`${director.name} - ${director.role}`}
                  width={594}
                  height={817}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Non-Executive Directors */}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#141C16] text-center tracking-tight mb-10">
            Non-Executive Directors
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 max-w-4xl mx-auto">
            {nonExecutiveDirectors.map((director) => (
              <div
                key={director.name}
                className="w-[280px] sm:w-[320px] md:w-[340px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Image
                  src={director.cardImage}
                  alt={`${director.name} - ${director.role}`}
                  width={680}
                  height={1004}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
