import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { initialNews } from '@/lib/seedData';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const article =
    initialNews.find((n) => n.slug === params.id) || initialNews[0];

  return (
    <div className="w-full bg-white">
      {/* 1. HERO */}
      <section className="relative w-full min-h-[420px] md:min-h-[460px] flex items-center bg-black overflow-hidden pt-28 pb-14">
        <Image
          src="/images/news-hero.jpg"
          alt="Impact Energies Press Statement"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          <div className="text-[15px] text-gray-300 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/news" className="hover:text-white transition-colors">
              News &amp; Media
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium">Article</span>
          </div>

          <div className="max-w-2xl text-white">
            <h1 className="text-4xl sm:text-5xl md:text-[52px] font-extralight tracking-tight leading-[1.1] mb-4 font-sans">
              Press Release
            </h1>
            <p className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-xl">
              Official press statement and regulatory announcement from Impact Energies.
            </p>
          </div>
        </div>
      </section>

      {/* Back button */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-gray-500 hover:text-[#007580] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Press Releases &amp; Media</span>
        </Link>
      </div>

      {/* 2. ARTICLE HEADER & SUMMARY ROW */}
      <section className="w-full bg-white pt-8 pb-12 px-6 md:px-12">
        <div className="max-w-[1360px] mx-auto">
          <div className="pb-8 border-b border-gray-100">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#007580] uppercase tracking-tight leading-snug">
                {article.title}
              </h2>
              <div className="mt-2 text-[14px] text-gray-400 font-medium">{article.date}</div>
            </div>
          </div>

          {/* 3. TWO-COLUMN ARTICLE BODY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 text-[15px] text-gray-700 leading-relaxed">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <p>
                Impact Energies (&quot;Impact&quot; or the &quot;Company&quot;) has announced a corporate
                reorganisation to separate its Namibian exploration and development business from its
                South African exploration portfolio, establishing distinct entities with clear strategic mandates.
              </p>

              <p>
                The transaction will enable the Company to focus efforts on, and maximise value from, its
                flagship Namibian portfolio in the period leading up to First Oil from the giant Venus discovery,
                while facilitating dedicated investment into the South African frontier exploration acreage.
              </p>

              {/* Refinery pipes photo */}
              <div className="relative rounded-xl overflow-hidden shadow-sm my-6 border border-gray-100">
                <Image
                  src="/images/refinery-pipes.jpg"
                  alt="Offshore Energy Infrastructure"
                  width={650}
                  height={420}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-[#007580] text-[17px]">
                  Offshore South Africa High-Impact Exploration Portfolio
                </h4>
                <p>
                  Impact focuses on high-impact offshore exploration acreage across South Africa,
                  including Orange Basin Deep (Exploration Right 12/3/135), Transkei &amp; Algoa
                  (Exploration Right 12/3/252), and Area 2 (Exploration Right 12/3/276).
                </p>
                <p>
                  Together with world-class partners including TotalEnergies, QatarEnergy, and Shell,
                  Impact continues comprehensive geoscience and technical programmes across deep-water
                  frontier basins unlocking significant exploration potential.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Plant foliage photo */}
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <Image
                  src="/images/plant-foliage.jpg"
                  alt="Impact Environmental and Operational Standards"
                  width={650}
                  height={320}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-[#007580] text-[17px]">Details of the Portfolio Structure:</h4>
                <p>
                  Under the terms of the structure, participating interests in the following licenses
                  represent high-impact exploration value:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {article.bulletPoints?.map((bp: string, i: number) => (
                    <li key={i}>{bp}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-[#007580] text-[17px]">Strategic Rationale:</h4>
                <p>
                  The reorganisation is designed to deliver a cleaner and more focused corporate
                  structure intended to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Facilitate investment into the South African Assets from specialized energy investors;</li>
                  <li>Enable targeted concentration on unlocking value from the deepwater Orange Basin discoveries;</li>
                  <li>Maintain strict governance and ESG standards with identical management expertise.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
