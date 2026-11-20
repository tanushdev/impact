'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { managementMembers } from '@/lib/teamData';

export default function ManagementPage() {
  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/figma/company-hero-bg.jpg"
          alt="Impact Energies Management Team"
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
            <span className="text-[#10CFC9] font-medium">Management</span>
          </div>

          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[54px] font-extralight tracking-tight leading-[1.1] mb-5 font-sans"
            >
              Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              Impact Energies has a strong management team and Board with a track record of success.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. MEET THE MANAGEMENT TEAM SECTION */}
      <section className="w-full max-w-[1360px] mx-auto px-6 md:px-12 pt-20 pb-24 bg-white">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block mb-2">
            Our leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#141C16] tracking-tight">
            Meet the Management Team
          </h2>
        </div>

        {/* 4 Cards Grid - Clickable linking to Bio Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 max-w-6xl mx-auto">
          {managementMembers.map((member) => (
            <Link
              key={member.slug}
              href={`/management/${member.slug}`}
              className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <div className="relative w-full aspect-[594/817] bg-[#2C302B]">
                <Image
                  src={member.cardImage}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Support Services Notice at Bottom */}
        <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-gray-200/80 text-center">
          <p className="text-[15px] md:text-base text-gray-600 leading-relaxed font-light">
            Impact Energies is supported by the experienced team at Impact Oil &amp; Gas, which provides management and other services to the company under a management services agreement.
          </p>
        </div>
      </section>
    </div>
  );
}
