'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Minus } from 'lucide-react';

// Smooth luxury spring & easing curves for scroll text & card reveals
const transitionEase = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: custom * 0.12,
      ease: transitionEase,
    },
  }),
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: transitionEase,
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: transitionEase,
    },
  },
};

export default function HomePage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* 1. HERO SECTION - Video Banner */}
      <section className="relative w-full min-h-[820px] lg:min-h-[965px] flex flex-col justify-end overflow-hidden pt-44 pb-20 md:pb-28">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/home-hero-bg.jpg"
            className="w-full h-full object-cover object-center"
          >
            <source src="/videos/impact-banner.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlay to guarantee crystal clear text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30" />
        </div>

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: transitionEase }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extralight tracking-tight leading-[1.12] mb-5 font-sans"
            >
              Powering Progress.<br />
              Exploring Potential.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: transitionEase }}
              className="text-[15px] md:text-base text-white/90 font-light leading-relaxed max-w-lg mb-8"
            >
              Responsible energy exploration built on expertise, innovation, and long-term value.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: transitionEase }}
            >
              <Link
                href="/assets/orange-basin-deep"
                className="inline-flex items-center px-7 py-3 rounded-full text-[16px] font-semibold text-white bg-[#10CFC9] hover:bg-[#0EB5AF] shadow-md transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Discover More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WORLD MAP - SOUTH AFRICA FOOTPRINT */}
      {/* Clean tightly-spaced map section with scroll-in animation */}
      <section className="w-full bg-white py-4 md:py-6 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1360px] mx-auto flex justify-center items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeInScale}
            className="relative w-full max-w-[1240px]"
          >
            <Image
              src="/images/home-map-section-hires.png"
              alt="Impact Energies South Africa Exploration Footprint"
              width={1060}
              height={490}
              unoptimized
              priority
              className="w-full h-auto object-contain mx-auto select-none pointer-events-none"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. LATEST NEWS & ANNOUNCEMENTS SECTION - Graphic pinned right-0 bottom-0 with ZERO space */}
      <section className="relative w-full bg-white pt-6 md:pt-10 pb-0 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] lg:min-h-[500px]">
            {/* Left Column: Heading, Accordion, Info & Know More with scroll text effects */}
            <div className="lg:col-span-6 max-w-xl space-y-6 pb-12 lg:pb-16 z-10 relative">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                custom={0}
                className="text-3xl md:text-[36px] lg:text-[40px] font-bold text-gray-900 tracking-tight leading-[1.18]"
              >
                Latest News &amp; Announcements <br />
                from Impact Energies Limited
              </motion.h2>

              {/* Accordion List with staggered scroll reveal */}
              <div className="space-y-4 max-w-lg pt-2">
                {/* Item 1: Energy Asia 2027 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeInUp}
                  custom={1}
                  className="border-b border-gray-200/90 pb-4"
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 0 ? null : 0)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={openAccordion === 0}
                  >
                    <span className="text-[17px] md:text-lg font-bold text-gray-800 group-hover:text-[#007580] transition-colors">
                      Energy Asia 2027
                    </span>
                    <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 group-hover:border-[#007580] group-hover:text-[#007580] transition-colors flex-shrink-0">
                      {openAccordion === 0 ? (
                        <Minus className="w-3.5 h-3.5 text-[#007580]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                  {openAccordion === 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="pt-3 text-[15px] text-gray-600 leading-relaxed"
                    >
                      Impact Energies Limited will showcase deepwater frontier exploration achievements and operational progress at Energy Asia 2027.
                    </motion.div>
                  )}
                </motion.div>

                {/* Item 2: Save the Date Announced */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeInUp}
                  custom={2}
                  className="border-b border-gray-200/90 pb-4"
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={openAccordion === 1}
                  >
                    <span className="text-[17px] md:text-lg font-bold text-gray-800 group-hover:text-[#007580] transition-colors">
                      Save the Date Announced
                    </span>
                    <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 group-hover:border-[#007580] group-hover:text-[#007580] transition-colors flex-shrink-0">
                      {openAccordion === 1 ? (
                        <Minus className="w-3.5 h-3.5 text-[#007580]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                  {openAccordion === 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="pt-3 text-[15px] text-gray-600 leading-relaxed"
                    >
                      Official dates announced for upcoming investor briefings, operational updates, and industry presentations.
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Know More link with green bullet */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeInUp}
                custom={3}
                className="pt-2"
              >
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#70B83A] hover:text-[#5BA343] transition-colors group cursor-pointer"
                >
                  <span className="text-base leading-none select-none text-[#70B83A]">•</span>
                  <span className="hover:underline underline-offset-4">Know More</span>
                </Link>
              </motion.div>
            </div>

            {/* Desktop spacer for grid */}
            <div className="hidden lg:block lg:col-span-6" />
          </div>
        </div>

        {/* Plant Graphic - Sits pinned to right-0 and bottom-0 with smooth slide-in */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideInRight}
          className="lg:absolute lg:right-0 lg:bottom-0 w-full lg:w-[54%] max-w-[820px] flex justify-end items-end pointer-events-none z-0 leading-none -mb-px"
        >
          <Image
            src="/images/home-news-graphic-full.png"
            alt="Impact Energies Limited Exploration Facilities and Green Energy Assets"
            width={1024}
            height={641}
            unoptimized
            priority
            className="w-full h-auto object-contain object-right-bottom block m-0 p-0 align-bottom"
          />
        </motion.div>
      </section>

      {/* 4. CORPORATE RESPONSIBILITY & ASSETS - Exact 1:1 Figma match with smooth scroll text & image reveal */}
      <section
        id="corporate-responsibility"
        className="w-full bg-[#FAFDF4] pt-14 md:pt-20 pb-12 md:pb-16 px-6 md:px-12 relative -mt-px z-10"
      >
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Africa Contour Graphic with scroll reveal */}
            <motion.div
              initial={{ opacity: 0, x: -35, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: transitionEase }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="relative w-full max-w-[560px]">
                <Image
                  src="/images/home-africa-contour.png"
                  alt="Impact Africa Exploration Footprint and Environmental Stewardship"
                  width={620}
                  height={710}
                  unoptimized
                  priority
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            </motion.div>

            {/* Right: Responsibility Content with smooth staggered text reveal */}
            <div className="lg:col-span-6 space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: transitionEase }}
                className="text-[15px] font-bold uppercase tracking-wider text-[#70B83A] block"
              >
                OUR ASSETS
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.1, ease: transitionEase }}
                className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[#0D1C15] tracking-tight leading-[1.12]"
              >
                Corporate Responsibility
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.2, ease: transitionEase }}
                className="text-[15px] md:text-base text-gray-600 leading-relaxed font-normal max-w-xl pt-2"
              >
                Impact is a committed to the highest standard of health and safety and to protect the biological integrity of the environment in which we operate.
              </motion.p>
            </div>
          </div>

          {/* Active Exploration Assets: 3 Clean Bullet Links with Underlines with staggered entrance */}
          <div className="pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-[15px] text-gray-700">
            {[
              {
                href: '/assets/orange-basin-deep',
                color: 'bg-[#4D9FA7]',
                title: 'South Africa: Orange Basin Deep',
              },
              {
                href: '/assets/transkei-algoa',
                color: 'bg-[#10CFC9]',
                title: 'Natal Trough – East Coast South Africa',
              },
              {
                href: '/assets/area-2',
                color: 'bg-[#A3C938]',
                title: 'South Africa: Area 2',
              },
            ].map((asset, idx) => (
              <motion.div
                key={asset.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: idx * 0.12, ease: transitionEase }}
                className="pb-3 border-b border-[#DFE2D9]"
              >
                <Link
                  href={asset.href}
                  className="inline-flex items-center gap-2.5 hover:text-[#007580] transition-colors group"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${asset.color} flex-shrink-0`} />
                  <span className="font-medium text-gray-800 group-hover:text-[#007580]">
                    {asset.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
