'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Area2Page() {
  return (
    <div className="w-full bg-[#FAFBF9]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center bg-black overflow-hidden pt-28 pb-14">
        <Image
          src="/images/about-hero.jpg"
          alt="South Africa: Area 2 Offshore Exploration Acreage"
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
            <span className="text-[#10CFC9] font-medium">South Africa: Area 2</span>
          </div>

          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.12] mb-4 font-sans uppercase"
            >
              SOUTH AFRICA: AREA 2
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTION */}
      <section className="w-full py-16 px-6 md:px-12 bg-white">
        <div className="max-w-[1360px] mx-auto">
          {/* Intro paragraph */}
          <p className="text-[15px] text-gray-700 leading-relaxed max-w-5xl mb-12 font-normal">
            Impact entered into an agreement* for Area 2 offshore South Africa with Silver Wave Energy
            Pte Ltd in November 2020 for 90% working interest and operatorship. Area 2, Exploration
            Right reference 12/3/276 (Gamtoos, Algoa and Transkei Basins), is located offshore
            eastern South Africa and covers approximately 78,708km². Although water depths extend to
            approximately 4,500 meters, the prospective areas sit within 3,500 metres. The licence
            was initially awarded to Silver Wave Energy in 2015.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Map Column */}
            <div className="lg:col-span-6 flex justify-center">
              <Image
                src="/images/area-2-map-hires.png"
                alt="Figure: Area 2 Exploration Right 12/3/276 offshore eastern South Africa (78,708 km²)"
                width={940}
                height={1024}
                unoptimized
                priority
                className="w-full max-w-[540px] h-auto object-contain rounded-xl shadow-xs"
              />
            </div>

            {/* Context & Allocation Column */}
            <div className="lg:col-span-6 space-y-8 text-[15px] text-gray-700 leading-relaxed">
              <div className="space-y-4 font-normal">
                <p>
                  Area 2 lies within the emerging Southern African Aptian deep water oil and gas play,
                  stretching from northern most Namibia, around Cape Agulhas and the Transkei margin,
                  to the Durban Basin in the north-east. This play has been opened by the Brulpadda and
                  Luiperd discoveries in the Outeniqua Basin and will be further tested during 2021 by
                  the well on the giant Venus prospect in ultra-deep-water Namibia, where Impact is a
                  substantial partner. Impact believes that there is good evidence for this Southern
                  African Aptian play to have a common world-class Lower Cretaceous source rock,
                  similar excellent quality Apto-Albian reservoir sands, and a geological setting
                  suitable for the formation of large stratigraphic traps.
                </p>
              </div>

              {/* Allocation of Interest Box */}
              <div className="pt-4 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Allocation of Interest
                </h3>
                <div className="space-y-2 text-[15px]">
                  <p className="text-gray-800 font-medium">
                    Impact Energies: 90% (Operator)*
                  </p>
                  <p className="text-gray-800 font-medium">
                    Silver Wave Energy Pte Ltd 10%
                  </p>
                </div>
                <p className="text-[15px] text-gray-500 italic pt-4">
                  *Closing of the transaction is subject to customary conditions, including the
                  approval of the Government of South Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
