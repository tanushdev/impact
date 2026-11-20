'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Compass,
  Building,
  Users,
  Briefcase,
  Leaf,
  Layers,
  MapPin,
  Newspaper,
  Mail,
  Shield,
  FileText,
  Lock,
  Cookie,
  ArrowRight,
} from 'lucide-react';

export default function SitemapPage() {
  const sections = [
    {
      category: 'Main Navigation',
      icon: Compass,
      color: 'text-[#007580]',
      bgColor: 'bg-[#EBF7F8]',
      links: [
        {
          name: 'Home',
          href: '/',
          description: 'Powering Progress. Exploring Potential. Impact Energies homepage.',
          icon: Compass,
        },
        {
          name: 'News & Media',
          href: '/news',
          description: 'Latest press releases, announcements, and market updates.',
          icon: Newspaper,
        },
        {
          name: 'Contact Us',
          href: '/contact',
          description: 'Get in touch with our operations, media, and executive teams.',
          icon: Mail,
        },
      ],
    },
    {
      category: 'Company & Governance',
      icon: Building,
      color: 'text-[#E08738]',
      bgColor: 'bg-[#FEF5ED]',
      links: [
        {
          name: 'Management Team',
          href: '/management',
          description: 'Experienced executive leadership driving exploration excellence.',
          icon: Users,
        },
        {
          name: 'Board of Directors',
          href: '/board-of-directors',
          description: 'Distinguished board governing strategic direction and stakeholder value.',
          icon: Briefcase,
        },
        {
          name: 'Corporate Responsibility',
          href: '/corporate-responsibility',
          description: 'Environmental stewardship, safety, and community commitments.',
          icon: Leaf,
        },
        {
          name: 'Investors & Shareholder Area',
          href: '/investors',
          description: 'Investor relations, shareholder login, and private circulars portal.',
          icon: Shield,
        },
      ],
    },
    {
      category: 'Offshore Exploration Assets',
      icon: Layers,
      color: 'text-[#6AA335]',
      bgColor: 'bg-[#F2F8ED]',
      links: [
        {
          name: 'South Africa: Orange Basin Deep',
          href: '/assets/orange-basin-deep',
          description: 'Exploration Right 12/3/135 in ultra-deep water adjacent to world-class discoveries.',
          icon: MapPin,
        },
        {
          name: 'Natal Trough – East Coast South Africa',
          href: '/assets/transkei-algoa',
          description: 'High-impact acreage along the prolific southern African eastern margin.',
          icon: MapPin,
        },
        {
          name: 'South Africa: Area 2',
          href: '/assets/area-2',
          description: 'Frontier deep-water offshore exploration blocks with significant prospectivity.',
          icon: MapPin,
        },
      ],
    },
    {
      category: 'Legal, Privacy & Compliance',
      icon: Shield,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
      links: [
        {
          name: 'Terms & Conditions',
          href: '/terms-and-conditions',
          description: 'Terms and conditions governing the use of this website.',
          icon: FileText,
        },
        {
          name: 'Privacy Policy',
          href: '/privacy-policy',
          description: 'How we collect, handle, safeguard, and retain your personal information.',
          icon: Lock,
        },
        {
          name: 'Cookies Policy',
          href: '/cookies-policy',
          description: 'Information regarding the cookies and tracking technologies used on our site.',
          icon: Cookie,
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[400px] md:min-h-[440px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/figma/company-hero-bg.jpg"
          alt="Impact Energies Sitemap"
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
            <span className="text-[#10CFC9] font-medium">Sitemap</span>
          </div>

          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[52px] font-extralight tracking-tight leading-[1.1] mb-4 font-sans"
            >
              Site Overview
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              Comprehensive sitemap of all public pages, assets, and regulatory documents across Impact Energies.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. SITEMAP SECTIONS */}
      <section className="w-full max-w-[1360px] mx-auto px-6 md:px-12 py-16 md:py-24 bg-white">
        <div className="space-y-16">
          {sections.map((section, idx) => {
            const SectionIcon = section.icon;
            return (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <div className={`w-9 h-9 rounded-xl ${section.bgColor} flex items-center justify-center ${section.color}`}>
                    <SectionIcon className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {section.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.links.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group p-6 rounded-2xl border border-gray-200/90 hover:border-[#10CFC9] hover:shadow-md transition-all duration-200 bg-white flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-[#EAF5E9] group-hover:text-[#6AA335] transition-colors">
                              <LinkIcon className="w-5 h-5 text-gray-600 group-hover:text-[#6AA335] transition-colors" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#007580] group-hover:translate-x-1 transition-all" />
                          </div>
                          <h3 className="text-[17px] font-bold text-gray-900 group-hover:text-[#007580] transition-colors mb-2">
                            {link.name}
                          </h3>
                          <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                            {link.description}
                          </p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-gray-100 text-xs text-[#007580] font-semibold flex items-center gap-1 group-hover:underline">
                          <span>Visit page</span>
                          <span>→</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

