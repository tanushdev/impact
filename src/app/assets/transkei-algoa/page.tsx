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
            href="#transkei-prospectivity"
            className="px-5 py-2.5 rounded-full bg-[#FAFBF9] border border-gray-200 font-semibold text-[15px] text-gray-800 hover:border-[#10CFC9] hover:text-[#007580] transition-colors whitespace-nowrap"
          >
            Transkei Prospectivity
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
                The Algoa/Gamtoos and Durban/Transkei basins are pull-apart basins, related to the
                opening of the Southern Ocean during the breakup of Gondwana. The Algoa/Gamtoos
                basins form the extension of the Outeniqua Basin into the east coast. The southern and
                northern margins of the basin are bounded by major transform faults: The
                Agulhas-Falkland Fracture Zone (AFFZ) to the south and Mozambique Fracture Zone (MFZ)
                to the north. These fracture zones have played a key role in the structural evolution
                and the distribution of the basins along the south eastern coast of South Africa.
              </p>
              <p>
                Significant petroleum plays have been identified along this transform margin,
                supported by the discovery of oil and gas in the Outeniqua Basin and the commercial
                Brulpadda and Luiperd discoveries.
              </p>
            </div>

            {/* Figure 2 Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Image
                src="/images/transkei-geology.png"
                alt="Figure 2: Structural elements map with Albian fairways and maturity window outlines superimposed"
                width={900}
                height={674}
                unoptimized
                className="w-full max-w-[520px] h-auto object-contain rounded-xl shadow-xs border border-gray-100"
              />
              <p className="text-[15px] text-gray-600 italic mt-2.5 text-center">
                Figure 2: Structural elements map with Albian fairways and maturity window outlines superimposed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRANSKEI PROSPECTIVITY */}
      <section
        id="transkei-prospectivity"
        className="w-full py-16 px-6 md:px-12 bg-white border-t border-gray-200/80"
      >
        <div className="max-w-[1360px] mx-auto space-y-6">
          <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block">
            Prospectivity
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Transkei Prospectivity
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-[15px] text-gray-700 leading-relaxed font-normal">
              <p>
                The Transkei block is a Cretaceous deep-water play with a series of stacked, basin
                floor fan complexes.
              </p>
              <p>
                The 2D seismic acquired by Impact in 2013 and 2017 has identified multiple leads and
                prospects across the block, which appear to have common elements with the
                discoveries in the Outeniqua Basin. High amplitude anomalies on 2D seismic suggest the
                presence of good quality sandstones.
              </p>
              <p>
                Geochemical studies indicate good potential for oil and gas generation in the basin.
                Regional analysis indicates that the Aptian-Cenomanian source rock is mature for oil
                and gas generation across large parts of the basin.
              </p>
            </div>

            {/* Figure 3 Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Image
                src="/images/transkei-geoseismic-dipline.png"
                alt="Figure 3. Geoseismic dipline describing the petroleum geological elements of the Natal Trough"
                width={914}
                height={686}
                unoptimized
                className="w-full max-w-[520px] h-auto object-contain rounded-xl shadow-xs border border-gray-100"
              />
              <p className="text-[15px] text-gray-600 italic mt-2.5 text-center">
                Figure 3. Geoseismic dipline describing the petroleum geological elements of the Natal Trough
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
                The Algoa Basin is located in the northernmost part of the Outeniqua Basin system.
              </p>
              <p>
                The basin has proven petroleum potential with oil and gas shows in onshore and
                shallow-water wells.
              </p>
              <p>
                Offshore, the Algoa block extends the petroleum play into deeper water where thicker
                post-rift sediments provide the necessary burial depth for source rock maturation.
              </p>
              <p>
                Multiple structural and stratigraphic traps have been mapped on existing seismic
                data. These include tilted fault blocks, roll-over anticlines, and basin floor fans.
              </p>
            </div>

            {/* Figure 4 Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Image
                src="/images/transkei-depositional-block.png"
                alt="Figure 4: Aptian depositional block diagram of South Africa, offshore sedimentary basins"
                width={914}
                height={686}
                unoptimized
                className="w-full max-w-[520px] h-auto object-contain rounded-xl shadow-xs border border-gray-100"
              />
              <p className="text-[15px] text-gray-600 italic mt-2.5 text-center">
                Figure 4: Aptian depositional block diagram of South Africa, offshore sedimentary basins
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
