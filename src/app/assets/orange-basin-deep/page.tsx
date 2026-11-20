'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function OrangeBasinDeepPage() {
  const specs = [
    { label: 'Licence', value: 'Exploration Right reference 12/3/135, Orange Basin Deep' },
    { label: 'Acreage', value: '15,392 km²' },
    { label: 'Water Depth', value: '2,700 m to 4,200 m' },
    { label: 'Impact Interest', value: '22.22%' },
    {
      label: 'Partners',
      value: 'TotalEnergies EP South Africa B.V. (TEEPSA): 48.61%, QatarEnergy: 29.17%',
    },
  ];

  return (
    <div className="w-full bg-[#FAFBF9]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[440px] md:min-h-[480px] flex items-center bg-black overflow-hidden pt-28 pb-14">
        <Image
          src="/images/about-hero.jpg"
          alt="South Africa: Orange Basin Deep Offshore Exploration"
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
            <span className="text-[#10CFC9] font-medium">Orange Basin Deep</span>
          </div>

          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.12] mb-4 font-sans uppercase"
            >
              SOUTH AFRICA: ORANGE BASIN DEEP
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
            href="#prospectivity"
            className="px-5 py-2.5 rounded-full bg-[#FAFBF9] border border-gray-200 font-semibold text-[15px] text-gray-800 hover:border-[#10CFC9] hover:text-[#007580] transition-colors whitespace-nowrap"
          >
            Orange Basin Deep Prospectivity
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
            The Orange Basin Deep (OBD) block forms South African Exploration Right 12/3/135, located
            offshore south-western South Africa, within the Orange Basin (Figure 1), where the recent
            2022 Venus and Graff discoveries were made. The licence was initially awarded to Impact as
            a Technical Co-operation Permit in 2014, followed by an application for an Exploration
            Right, which was granted in 2017. The licence covers approximately 15,392km² in water
            depths of up to 4,200 metres.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
            {/* Figure 1 Card */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <Image
                src="/images/orange-basin-map-hires.png"
                alt="Figure 1: Impact acreage map for the Orange Basin"
                width={1008}
                height={704}
                unoptimized
                priority
                className="w-full max-w-[560px] h-auto object-contain rounded-xl shadow-xs border border-gray-100"
              />
              <p className="text-[15px] text-gray-600 italic mt-2.5 text-center">
                Figure 1: Impact acreage map for the Orange Basin
              </p>
            </div>

            <div className="lg:col-span-6 text-[15px] text-gray-700 leading-relaxed space-y-4">
              <p>
                In June 2017, world-class Operator TotalEnergies acquired 77.78% of the OBD block,
                expanding their position in the Orange basin and bringing additional technical
                expertise to Impact&apos;s Orange Basin portfolio.
              </p>
              <p>
                Following the farm-out of TotalEnergies in 2017, QatarEnergy farmed-in to the OBD
                block, acquiring 29.17% equity, with Total retaining 48.61% equity.
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

          <div className="space-y-4 text-[15px] text-gray-700 leading-relaxed max-w-4xl font-normal">
            <p>
              The Orange Basin Deep block sits within the same offshore basin as the momentous 2022
              discoveries, in the Orange Basin, and re-centres new interest the same plays. Orange
              Basin Deep sits adjacent to coast, it believed to date back to approximately 130 Ma, that
              set up the ideal environment for the formation of a petroleum system.
            </p>
            <p>
              In the early Cretaceous, the southern South Atlantic (the ocean in which the OBD block
              lies) existed as a restricted, anoxic basin, creating the ultimate conditions for the
              deposition of world the, high quality source rocks - the Kudu shale. The presence and
              quality of this thick, world-class source rock have event elsewhere by DSDP 361 well
              21st, most recently, the Venus-1X well.
            </p>
            <p>
              These very important wells also provide evidence for Apto-Albian aged basinal fans having
              migrated deep into the Orange Basin. The Apto-Albian reservoirs of the southern Orange
              Basin, where the OBD licence sits, are best represented by the DSDP 361 well where the
              sands are interbedded with the source rock in this location.
            </p>
            <p>
              The deposition of a thick section of Mass Transport Complexes (MTC) resulting from the
              instability of the Southern African margin in the Upper Cretaceous provided additional
              clastic reservoir targets at this level, which were encountering stored in the northern
              Orange basin in the Graff-1X well.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ORANGE BASIN DEEP PROSPECTIVITY */}
      <section
        id="prospectivity"
        className="w-full py-16 px-6 md:px-12 bg-white border-t border-gray-200/80"
      >
        <div className="max-w-[1360px] mx-auto space-y-6">
          <span className="text-[15px] font-bold uppercase tracking-widest text-[#70B83A] block">
            Prospectivity
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Orange Basin Deep Prospectivity
          </h2>

          <div className="space-y-4 text-[15px] text-gray-700 leading-relaxed max-w-4xl font-normal">
            <p>
              Widely-spaced 2D data covering the OBD block has been used to identify two geological
              levels of prospectivity - a deep play, the Lower Cretaceous in the form of Aptian aged
              basin floor fans, equivalent to the Venus discovery in the Namibian Orange basin, and
              additional prospectivity in the Upper Cretaceous in the form of several Graff-equivalent
              leads, that share a common trapping mechanism with the major Namibian discovery.
            </p>
            <p>
              Both levels of prospectivity are charged by the prolific Kudu shale sourcerock, with a
              combination of trapping styles: The Apto-Albian reservoirs are stratigraphically trapped
              and ponded against the western flank of the outer high. The Upper Cretaceous
              Graff-Albian reservoirs are structurally trapped by thrust faults splaying off the large
              mid-frontal thrust.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
