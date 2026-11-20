import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { boardMembers } from '@/lib/teamData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return boardMembers.map((m) => ({
    slug: m.slug,
  }));
}

export default async function BoardBioPage({ params }: Props) {
  const { slug } = await params;
  const member = boardMembers.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[380px] md:min-h-[420px] flex items-center bg-black overflow-hidden pt-28 pb-14">
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
          <div className="text-[15px] text-gray-300 mb-6 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/board-of-directors" className="hover:text-white transition-colors">
              Board of Directors
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">{member.name}</span>
          </div>

          <div className="max-w-3xl text-white">
            <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block mb-3">
              {member.role}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] mb-4 font-sans">
              {member.name}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. BIOGRAPHY DETAIL SECTION */}
      <section className="w-full max-w-[1360px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait Card & Key Details */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 bg-[#F8FAF8] border border-gray-200/80 rounded-2xl p-6 shadow-sm">
              <div className="relative w-full aspect-[594/817] rounded-xl overflow-hidden bg-[#2C302B] mb-6 shadow-inner">
                <Image
                  src={member.cardImage}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#141C16]">{member.name}</h3>
                  <p className="text-[15px] font-semibold text-[#70B83A] tracking-wide mt-1">
                    {member.role}
                  </p>
                </div>

                {member.education && member.education.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-[14px] uppercase tracking-wider font-bold text-gray-500 mb-2">
                      Education &amp; Credentials
                    </h4>
                    <ul className="space-y-1.5">
                      {member.education.map((edu, idx) => (
                        <li key={idx} className="text-[15px] text-gray-700 leading-snug flex items-start gap-2">
                          <span className="text-[#10CFC9] mt-1">•</span>
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-6">
                  <Link
                    href="/board-of-directors"
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#141C16] hover:text-[#70B83A] transition-colors"
                  >
                    <span>←</span>
                    <span>Back to Board of Directors</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Career Highlights */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">
            <div>
              <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block mb-2">
                Board Profile
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#141C16] tracking-tight mb-8">
                Biography
              </h2>

              <div className="space-y-5 text-[15px] md:text-base text-gray-700 leading-relaxed font-light">
                {member.bioParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {member.careerHighlights && member.careerHighlights.length > 0 && (
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-xl sm:text-2xl font-bold text-[#141C16] mb-6">
                  Key Career Highlights &amp; Directorships
                </h3>
                <div className="grid grid-cols-1 gap-3.5">
                  {member.careerHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F8FAF8] border border-gray-100 flex items-start gap-3.5"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#10CFC9] mt-2 shrink-0" />
                      <p className="text-[15px] text-gray-800 font-medium leading-relaxed">
                        {hl}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
