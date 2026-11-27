'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TranskeiAlgoaPage() {
  const specs = [
    { label: 'Licence', value: 'Exploration Right reference 12/3/252, Natal Trough' },
    { label: 'Acreage', value: '45,838 km²' },
    { label: 'Water Depth', value: 'Deep water to 3,000 m' },
    { label: 'Impact Interest', value: '45%' },
    {
      label: 'Partners',
      value:
        'Shell Offshore Upstream South Africa B.V., a subsidiary of Royal Dutch Shell plc: 50% (Operator)*, Impact (organisations): 45%',
    },
  ];

  return (
    <div className="w-full bg-[#FAFBF9]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center bg-black overflow-hidden pt-28 pb-14">
        <Image
          src="/images/about-hero.jpg"
          alt="Transkei and Algoa Offshore South Africa Exploration Acreage"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          {/* Breadcrumb */}
          <div className="text-[15px] text-gray-300 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-400">Assets</span>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">Natal Trough – East Coast South Africa</span>
          </div>

          <div className="max-w-4xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.12] mb-4 font-sans uppercase"
            >
              NATAL TROUGH – EAST COAST SOUTH AFRICA
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 2. SUB-NAV TABS */}
      <div className="w-full bg-white border-b border-gray-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-3 flex items-center gap-3 overflow-x-auto text-[15px]">
          <a
            href="#overview"
            className="px-5 py-2.5 rounded-full bg-[#FAFBF9] border border-gray-200 font-semibold text-[15px] text-gray-800 hover:border-[#10CFC9] hover:text-[#007580] transition-colors whitespace-nowrap"
          >
            Overview
          </a>
          <a
            href="#geological-setting"
            className="px-5 py-2.5 rounded-full bg-[#FAFBF9] border border-gray-200 font-semibold text-[15px] text-gray-800 hover:border-[#10CFC9] hover:text-[#007580] transition-colors whitespace-nowrap"
          >
            Geological Setting
          </a>
          <a
            href="#natal-trough-prospectivity"
            className="px-5 py-2.5 rounded-full bg-[#FAFBF9] border border-gray-200 font-semibold text-[15px] text-gray-800 hover:border-[#10CFC9] hover:text-[#007580] transition-colors whitespace-nowrap"
          >
            Natal Trough Prospectivity
          </a>
          <a
            href="#algoa-prospectivity"
            className="px-5 py-2.5 rounded-full bg-[#FAFBF9] border border-gray-200 font-semibold text-[15px] text-gray-800 hover:border-[#10CFC9] hover:text-[#007580] transition-colors whitespace-nowrap"
          >
            Algoa Prospectivity
          </a>
        </div>
      </div>

      {/* 3. OVERVIEW SECTION */}
      <section id="overview" className="w-full py-16 px-6 md:px-12 bg-white">
        <div className="max-w-[1360px] mx-auto">
          <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block mb-2">
            Asset
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Overview</h2>

          {/* Table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden mb-12 shadow-xs">
            <table className="w-full text-[15px] text-left">
              <tbody className="divide-y divide-gray-200">
                {specs.map((spec) => (
                  <tr key={spec.label} className="hover:bg-[#FAFBF9] transition-colors">
                    <td className="w-1/3 md:w-1/4 px-6 py-4 font-bold text-gray-900 bg-[#FAFBF9]/60">
                      {spec.label}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[15px] text-gray-700 leading-relaxed max-w-4xl mb-10 font-normal">
            Exploration Right 12/3/252 is located offshore eastern South Africa and covers approximately
            45,838km². The block is located in water depths ranging from 700 metres to approximately
            3,000 metres. Awarded as a Technical Co-operation Permit in 2012, followed by an
            application for an Exploration Right, which was granted in 2014. The exploration period
            consists of an initial period and three renewal phases and currently expires in 2026.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
            {/* Figure 1 Card */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <Image
                src="/images/transkei-algoa-map.png"
                alt="Figure 1: Impact acreage location map for South Africa"
                width={862}
                height={646}
                unoptimized
                priority
                className="w-full max-w-[540px] h-auto object-contain rounded-xl shadow-xs border border-gray-100"
              />
              <p className="text-[15px] text-gray-600 italic mt-2.5 text-center">
                Figure 1: Impact acreage location map for South Africa
              </p>
            </div>

            <div className="lg:col-span-6 text-[15px] text-gray-700 leading-relaxed space-y-4">
              <p>
                In 2020, Shell acquired 50% with Operatorship of the licence, bringing its vast
                offshore technical expertise and resources, and well-known deep-water exploration
                experience to the venture. In addition, Shell has a committed well on the license.
              </p>
              <p>
                The transaction is pending the approval of the South African Government and
                satisfaction of other conditions precedent (estimated late 2020 or early 2021).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GEOLOGICAL SETTING */}
      <section
        id="geological-setting"
        className="w-full py-16 px-6 md:px-12 bg-[#FAFBF9] border-t border-gray-200/80"
      >
        <div className="max-w-[1360px] mx-auto space-y-6">
          <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block">
            Geology
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Geological Setting</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-[15px] text-gray-700 leading-relaxed font-normal">
              <p>
                The East Coast of South Africa, where Impact has exploration licenses, comprise two distinct geological settings: the South Outeniqua Basin and the Natal Trough Basin.
              </p>
              <p>
                The Natal Trough Basin is an unexplored basin, which shares many of the geological fundamentals which have proven successful in both the prolific Orange basin; the South Outeniqua Basin contains the world-class Brulpadda and Luiperd gas condensate discoveries.
              </p>
              <p>
                Figure 1 shows the structural setting of the East Coast of South Africa.
              </p>
            </div>

            {/* Figure 1 Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Image
                src="/images/transkei-geology.png"
                alt="Figure 1: Structural elements map with Albian fairways and maturity window outlines superimposed"
                width={900}
                height={674}
                unoptimized
                className="w-full max-w-[520px] h-auto object-contain rounded-xl shadow-xs border border-gray-100"
              />
              <p className="text-[15px] text-gray-600 italic mt-2.5 text-center">
                Figure 1: Structural elements map with Albian fairways and maturity window outlines superimposed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NATAL TROUGH PROSPECTIVITY */}
      <section
        id="natal-trough-prospectivity"
        className="w-full py-16 px-6 md:px-12 bg-white border-t border-gray-200/80"
      >
        <div className="max-w-[1360px] mx-auto space-y-6">
          <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block">
            Prospectivity
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Natal Trough Prospectivity
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-[15px] text-gray-700 leading-relaxed font-normal">
              <p>
                Impact licenses large parts of the Natal Trough Basin for exploration. The basin contains the world’s largest transform fault, the Agulhas-Falklands Fracture Zone (AFFZ) which divides the narrow continental shelf from oceanic crust of the Natal Trough (Figure 2). The AFFZ provides an ultra-steep dip slope against which sands can pinch-out. Outboard in the Natal Trough, sands pinch-out against a counter-regional dip slope. Regional analysis suggests the basin is underlain by lower-middle Cretaceous source rocks, although to date these have not been penetrated.
              </p>
              <p>
                The basin is covered in variably spaced 2D seismic which has enabled several large submarine fan bodies to be identified, with sands derived from continental South Africa. Seismic amplitude anomalies are supportive of the prospectivity of these fan bodies and although exploration is at an early stage, Impact is encouraged by the data analysed to date.
              </p>
            </div>

            {/* Figure 2 Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Image
                src="/images/transkei-geoseismic-dipline.png"
                alt="Figure 2: Geoseismic dipline describing the petroleum geological elements of the Natal Trough"
                width={914}
                height={686}
                unoptimized
                className="w-full max-w-[520px] h-auto object-contain rounded-xl shadow-xs border border-gray-100"
              />
              <p className="text-[15px] text-gray-600 italic mt-2.5 text-center">
                Figure 2: Geoseismic dipline describing the petroleum geological elements of the Natal Trough
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ALGOA PROSPECTIVITY */}
      <section
        id="algoa-prospectivity"
        className="w-full py-16 px-6 md:px-12 bg-[#FAFBF9] border-t border-gray-200/80"
      >
        <div className="max-w-[1360px] mx-auto space-y-6">
          <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block">
            Prospectivity
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Algoa Prospectivity</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-[15px] text-gray-700 leading-relaxed font-normal">
              <p>
                The Algoa area lies within the north-eastern part of the South Outeniqua basin. It bears similar play concepts to Block 11B/12B, operated by Total, which contains the Brulpadda and Luiperd gas condensate discoveries. These involve Lower Cretaceous basin floor fan sands pinching-out southwards against the inverted structural high of the Dias Marginal Ridge.
              </p>
              <p>
                Figure 4 shows the configuration and depositional systems of the South Outeniqua basin relative to the Natal Trough during the late Aptian (approximately 113Mya). As illustrated, the Algoa area sits at the eastern end of the fairway proven by the Bulpadda and Luiperd gas condensate fields.
              </p>
            </div>

            {/* Figure 3 Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Image
                src="/images/transkei-depositional-block.png"
                alt="Figure 3: Aptian depositional block diagram of South Africa, offshore sedimentary basins"
                width={914}
                height={686}
                unoptimized
                className="w-full max-w-[520px] h-auto object-contain rounded-xl shadow-xs border border-gray-100"
              />
              <p className="text-[15px] text-gray-600 italic mt-2.5 text-center">
                Figure 3: Aptian depositional block diagram of South Africa, offshore sedimentary basins
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
