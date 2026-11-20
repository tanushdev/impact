'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Minus, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { initialNews } from '@/lib/seedData';

export default function NewsPage() {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  // Filter news by year if specified
  const filteredNews =
    selectedYear === 'All'
      ? initialNews
      : initialNews.filter((item) => item.year.toString() === selectedYear);

  // Divide dynamically into 2 columns
  const half = Math.ceil(filteredNews.length / 2);
  const leftColNews = filteredNews.slice(0, half);
  const rightColNews = filteredNews.slice(half);

  const toggleAccordion = (slug: string) => {
    setExpandedSlug(expandedSlug === slug ? null : slug);
  };

  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. UPPER PART: HERO SECTION */}
      <section className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/news-hero.jpg"
          alt="Impact Energies Limited Press Releases and Media"
          fill
          priority
          className="object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/35" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          {/* Breadcrumb */}
          <div className="text-[15px] text-gray-300 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">News &amp; Media</span>
          </div>

          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[54px] font-extralight tracking-tight leading-[1.1] mb-5 font-sans"
            >
              News &amp; Media
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              Keep up with our latest news, industry developments and company announcements.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE PART: LATEST NEWS & ANNOUNCEMENTS (Exact 1:1 match to Figma screenshot) */}
      <section id="latest-news" className="w-full max-w-[1360px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-16 bg-white">
        {/* Top Control Pills */}
        <div className="flex items-center justify-between w-full">
          {/* Left Pill: Latest News */}
          <div>
            <span className="inline-flex items-center px-5 py-2 rounded-full text-[15px] font-semibold text-white bg-[#6AA335] shadow-xs select-none">
              Latest News
            </span>
          </div>

          {/* Right Controls: Year Pill + Dropdown Button */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
              className="inline-flex items-center px-5 py-2 rounded-full text-[15px] font-semibold text-white bg-[#6AA335] shadow-xs cursor-pointer hover:bg-[#5E942D] transition-colors"
            >
              {selectedYear === 'All' ? 'All Years' : selectedYear}
            </button>
            <div className="relative">
              <button
                onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                className="w-7 h-7 rounded-full border border-[#89C05B] flex items-center justify-center text-[#6AA335] hover:bg-[#F2F8ED] transition-colors cursor-pointer"
                aria-label="Select Year"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    yearDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {yearDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30 animate-in fade-in duration-150">
                  {['All', '2027', '2026'].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => {
                        setSelectedYear(yr);
                        setYearDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[15px] font-medium transition-colors ${
                        selectedYear === yr
                          ? 'text-[#6AA335] font-bold bg-[#FAFDF3]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {yr === 'All' ? 'All Years' : yr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Heading Row */}
        <div className="mt-8 md:mt-10">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#141C16] tracking-tight leading-[1.15]">
            Latest News &amp; Announcements <br />
            from Impact Energies Limited
          </h2>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="w-full border-t border-gray-200/80 my-8 md:my-10" />

        {/* 2-Column Accordion List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-2">
          {/* Left Column (Items 1 - 4) */}
          <div className="space-y-1">
            {leftColNews.map((item) => {
              const isOpen = expandedSlug === item.slug;
              return (
                <div key={item.slug} className="border-b border-gray-200/80 py-4 transition-colors">
                  <button
                    onClick={() => toggleAccordion(item.slug)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#141C16] group-hover:text-[#007580] transition-colors pr-4 leading-snug">
                      {item.title}
                    </span>
                    <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-[#007580] group-hover:text-[#007580] transition-colors flex-shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#007580]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="pt-3 text-[15px] text-gray-600 leading-relaxed space-y-3"
                    >
                      <div className="text-[13px] font-semibold text-[#6AA335] uppercase tracking-wider">
                        {item.date} • {item.category}
                      </div>
                      <p>{item.summary}</p>
                      <div>
                        <Link
                          href={`/news/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#007580] hover:underline underline-offset-4"
                        >
                          <span>Read Full Statement</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column (Items 5 - 8) */}
          <div className="space-y-1">
            {rightColNews.map((item) => {
              const isOpen = expandedSlug === item.slug;
              return (
                <div key={item.slug} className="border-b border-gray-200/80 py-4 transition-colors">
                  <button
                    onClick={() => toggleAccordion(item.slug)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] md:text-[16px] lg:text-[17px] font-bold text-[#141C16] group-hover:text-[#007580] transition-colors pr-4 leading-snug">
                      {item.title}
                    </span>
                    <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-[#007580] group-hover:text-[#007580] transition-colors flex-shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#007580]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="pt-3 text-[15px] text-gray-600 leading-relaxed space-y-3"
                    >
                      <div className="text-[13px] font-semibold text-[#6AA335] uppercase tracking-wider">
                        {item.date} • {item.category}
                      </div>
                      <p>{item.summary}</p>
                      <div>
                        <Link
                          href={`/news/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#007580] hover:underline underline-offset-4"
                        >
                          <span>Read Full Statement</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MIDDLE PART (Bottom Half): Press Releases and Media Info (Figma Cream Background #FAFDF3) */}
      <section className="w-full bg-[#FAFDF3] py-14 md:py-18 px-6 md:px-12 border-t border-[#DFE2D9]">
        <div className="max-w-[1360px] mx-auto">
          {/* Section Sub-heading */}
          <div className="mb-8">
            <span className="text-[15px] font-semibold text-[#6AA335] uppercase tracking-wider block mb-2">
              Press Releases and Media
            </span>
            <div className="w-44 h-px bg-gray-300/80" />
          </div>

          {/* 2-Column Links & Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">
            {/* Left: Press releases */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[17px] font-bold text-[#141C16]">
                <span className="text-[#6AA335] text-base leading-none">•</span>
                <span>Press releases</span>
              </div>
              <p className="text-[15px] text-gray-600 font-normal leading-relaxed pl-4">
                Official statements on appointments, results and projects.
              </p>
              <div className="pl-4 pt-1">
                <a
                  href="#latest-news"
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#6AA335] hover:text-[#58892D] transition-colors cursor-pointer group"
                >
                  <span className="text-base leading-none">•</span>
                  <span className="group-hover:underline underline-offset-4">Browse</span>
                </a>
              </div>
            </div>

            {/* Right: Media enquiries */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[17px] font-bold text-[#141C16]">
                <span className="text-[#6AA335] text-base leading-none">•</span>
                <span>Media enquiries</span>
              </div>
              <p className="text-[15px] text-gray-600 font-normal leading-relaxed pl-4">
                Speak to our communications team.
              </p>
              <div className="pl-4 pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#6AA335] hover:text-[#58892D] transition-colors group"
                >
                  <span className="text-base leading-none">•</span>
                  <span className="group-hover:underline underline-offset-4">Email us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
