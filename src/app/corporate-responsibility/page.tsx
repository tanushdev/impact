'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle } from 'lucide-react';

export default function CorporateResponsibilityPage() {
  const [activeTab, setActiveTab] = useState('anti-bribery');

  const tabs = [
    { id: 'anti-bribery', label: 'Anti-Bribery and Corruption' },
    { id: 'whistleblowing', label: 'Whistleblowing' },
    { id: 'safety', label: 'Safety' },
    { id: 'community', label: 'Community' },
    { id: 'environmental', label: 'Environmental' },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION (Exact Figma Image) */}
      <section className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src="/images/figma/company-hero-bg.jpg"
          alt="Impact Energies Corporate Responsibility"
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
            <span className="text-[#10CFC9] font-medium">Corporate Responsibility</span>
          </div>

          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-[54px] font-extralight tracking-tight leading-[1.1] mb-5 font-sans"
            >
              Corporate Responsibility
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl"
            >
              We are committed to operating responsibly, safely, and ethically in all our exploration activities across Africa.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. SUB-NAV FILTER TABS (STICKY) */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-3.5 flex items-center gap-3 overflow-x-auto text-[15px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer text-[15px] ${
                activeTab === tab.id
                  ? 'bg-[#6AA335] text-white shadow-xs'
                  : 'bg-[#FAFBF9] border border-gray-200 text-gray-700 hover:border-[#10CFC9] hover:text-[#007580]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN CONTENT SECTIONS */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 space-y-24">
        {/* Section 1: Anti-Bribery and Corruption */}
        <section id="anti-bribery" className="scroll-mt-32 space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#10CFC9] inline-block" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141C16] tracking-tight">
              Anti-Bribery and Corruption
            </h2>
          </div>

          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <Image
              src="/images/figma/cr-anti-bribery.png"
              alt="Coastal Environment"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="space-y-5 text-[15px] text-gray-700 leading-relaxed font-normal">
            <p>
              Impact is committed to the highest standards of integrity, transparency, and governance in all aspects of its operations. We operate a zero-tolerance policy towards bribery, corruption, and financial crime in any form across our global offices and field sites.
            </p>
            <p>
              All employees, directors, and contractors are required to comply with our comprehensive Anti-Bribery and Corruption Policy, which reflects international best practice and adheres strictly to applicable anti-corruption legislation including the UK Bribery Act.
            </p>

            <div className="pt-2">
              <h3 className="font-bold text-[#141C16] text-[16px] mb-3">Key Principles:</h3>
              <ul className="space-y-2.5 pl-1">
                {[
                  'Zero tolerance for any form of bribery or corrupt payments to public officials or commercial partners.',
                  'Thorough anti-bribery and corruption due diligence on all joint venture partners, contractors, and suppliers.',
                  'Clear protocols regarding gifts, hospitality, political contributions, and corporate social investments.',
                  'Mandatory regular compliance training for all directors, staff members, and technical consultants.',
                  'Confidential and secure whistleblowing channels for reporting suspected violations without fear of reprisal.',
                  'Continuous risk assessments and periodic independent compliance audits of financial controls.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#70B83A] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Policy Document Card (Matching Figma Screenshot) */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-[#FAFBF9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#007580] flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#141C16] text-[16px]">
                  Anti-Bribery and Corruption Policy
                </h4>
                <p className="text-[15px] text-gray-500">Official governance and compliance document (PDF)</p>
              </div>
            </div>
            <a
              href="/documents/Impact-Oil-Gas-Anti-Bribery-and-Corruption-Policy-2018.pdf"
              download="Impact-Oil-Gas-Anti-Bribery-and-Corruption-Policy-2018.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[15px] font-semibold text-white bg-[#007580] hover:bg-[#005B64] transition-colors self-start sm:self-center shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download (PDF)</span>
            </a>
          </div>
        </section>

        {/* Section 2: Whistleblowing */}
        <section id="whistleblowing" className="scroll-mt-32 space-y-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#70B83A] inline-block" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141C16] tracking-tight">
              Whistleblowing
            </h2>
          </div>

          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <Image
              src="/images/figma/cr-whistleblowing.png"
              alt="Pristine Natural Ecosystem"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="space-y-5 text-[15px] text-gray-700 leading-relaxed font-normal">
            <p>
              Impact has established an independent, confidential whistleblowing procedure that allows all personnel, contractors, and stakeholders to voice concerns regarding suspected misconduct, safety breaches, financial irregularity, or ethical violations.
            </p>
            <p>
              Reports may be submitted completely anonymously through dedicated third-party reporting lines. Every submission is investigated impartially by the Audit and Compliance Committee with strict protections guaranteed for genuine whistleblowers.
            </p>
          </div>

          {/* Whistleblowing Document Card */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-[#FAFBF9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#70B83A] flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#141C16] text-[16px]">
                  Whistleblowing Policy &amp; Procedure
                </h4>
                <p className="text-[15px] text-gray-500">Confidential grievance reporting guidelines (PDF)</p>
              </div>
            </div>
            <a
              href="/documents/250501-Impact-Oil-Gas-Whistleblowing-Policy.pdf"
              download="250501-Impact-Oil-Gas-Whistleblowing-Policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[15px] font-semibold text-white bg-[#007580] hover:bg-[#005B64] transition-colors self-start sm:self-center shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download (PDF)</span>
            </a>
          </div>
        </section>

        {/* Section 3: Safety */}
        <section id="safety" className="scroll-mt-32 space-y-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#10CFC9] inline-block" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141C16] tracking-tight">
              Safety
            </h2>
          </div>

          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <Image
              src="/images/figma/cr-safety.png"
              alt="Industrial Safety Protocols"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Teal Callout Box (Exact match to Figma screenshot) */}
          <div className="p-8 rounded-2xl bg-[#007580] text-white">
            <p className="text-[16px] md:text-[17px] font-medium leading-relaxed">
              Safety is fundamental to everything we do. We strive for zero harm to people and the environment, ensuring our operations meet or exceed strict international offshore energy industry safety guidelines.
            </p>
          </div>

          <div className="space-y-5 text-[15px] text-gray-700 leading-relaxed font-normal">
            <p>
              Offshore deep-water exploration requires uncompromising commitment to health, safety, and security. We maintain comprehensive Emergency Response Plans (ERPs) in coordination with joint venture operators TotalEnergies and Shell, incorporating rigorous contingency protocols for marine operations.
            </p>
            <p>
              All seismic survey vessels and deep-water drillships undergo exhaustive safety audits prior to commissioning, verifying international maritime safety certifications and strict crew welfare standards.
            </p>
          </div>
        </section>

        {/* Section 4: Community */}
        <section id="community" className="scroll-mt-32 space-y-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#70B83A] inline-block" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141C16] tracking-tight">
              Community
            </h2>
          </div>

          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <Image
              src="/images/figma/cr-community.png"
              alt="Community Engagement"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="space-y-5 text-[15px] text-gray-700 leading-relaxed font-normal">
            <p>
              Impact believes in building meaningful, respectful partnerships with local coastal communities, fishing associations, and regional stakeholders across South Africa and Namibia.
            </p>
            <p>
              We prioritize active stakeholder consultation, holding open information sessions and maintaining dedicated community liaison channels prior to launching any offshore operational survey. Through joint venture programs, we contribute directly to local capacity building, skills development, and educational initiatives.
            </p>
          </div>
        </section>

        {/* Section 5: Environmental */}
        <section id="environmental" className="scroll-mt-32 space-y-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#10CFC9] inline-block" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141C16] tracking-tight">
              Environmental
            </h2>
          </div>

          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <Image
              src="/images/figma/cr-environmental.png"
              alt="Environmental Preservation"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="space-y-5 text-[15px] text-gray-700 leading-relaxed font-normal">
            <p>
              Impact conducts exhaustive Environmental Impact Assessments (EIAs) and Environmental Management Programmes (EMPrs) approved by competent national petroleum regulators.
            </p>
            <p>
              During all marine acoustic surveys, dedicated certified Marine Mammal Observers (MMOs) and Passive Acoustic Monitoring (PAM) operators are stationed on survey vessels around the clock. Operations adhere strictly to pre-defined exclusion zones, soft-start protocols, and mandatory shutdown requirements to safeguard marine biodiversity and protected species.
            </p>
          </div>

          {/* 4 Environmental Monitoring Photos Grid (From Figma) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {[
              { src: '/images/figma/cr-env-1.png', alt: 'Marine Monitoring Survey Equipment' },
              { src: '/images/figma/cr-env-2.png', alt: 'Marine Mammal Observer' },
              { src: '/images/figma/cr-env-3.png', alt: 'Operational Command Desk' },
              { src: '/images/figma/cr-env-4.png', alt: 'Environmental Research Analysis' },
            ].map((photo, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xs border border-gray-200 group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Dark Teal Callout Banner */}
          <div className="p-8 rounded-2xl bg-[#007580] text-white mb-16">
            <p className="text-[16px] md:text-[17px] font-medium leading-relaxed">
              Environmental stewardship is central to our offshore operations. Comprehensive baseline surveys and rigorous mitigation procedures ensure the highest standards of marine ecosystem protection.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
