import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { connectToDatabase } from '@/lib/mongodb';
import News from '@/models/News';
import { initialNews } from '@/lib/seedData';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  let article: any = null;

  try {
    const conn = await connectToDatabase();
    if (conn) {
      article = await News.findOne({
        $or: [{ slug: params.id }, { _id: params.id.match(/^[0-9a-fA-F]{24}$/) ? params.id : null }],
      }).lean();
    }
  } catch (err) {
    console.warn('MongoDB lookup error in news/[id]:', err);
  }

  if (!article) {
    article = initialNews.find((n) => n.slug === params.id);
  }

  if (!article) {
    notFound();
  }

  const paragraphs: string[] = article.bodyParagraphs && article.bodyParagraphs.length > 0
    ? article.bodyParagraphs
    : [article.summary];

  const half = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, half);
  const rightParagraphs = paragraphs.slice(half);

  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION */}
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

          <div className="max-w-3xl text-white">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#10CFC9]/20 text-[#10CFC9] text-xs font-semibold uppercase tracking-wider mb-3">
              {article.category || 'Press Release'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] mb-4 font-sans">
              {article.title}
            </h1>
            <p className="text-[15px] md:text-base text-gray-200 font-light leading-relaxed max-w-2xl">
              {article.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Back button */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-gray-500 hover:text-[#70B83A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News &amp; Media</span>
        </Link>
      </div>

      {/* 2. ARTICLE HEADER & SUMMARY ROW */}
      <section className="w-full bg-white pt-6 pb-16 px-6 md:px-12">
        <div className="max-w-[1360px] mx-auto">
          <div className="pb-8 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 text-[14px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#70B83A]" />
                  <span>{article.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium text-[#141C16]">
                  <Tag className="w-4 h-4 text-[#10CFC9]" />
                  <span>{article.category || 'Press Release'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* 3. TWO-COLUMN ARTICLE BODY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 text-[15px] text-gray-700 leading-relaxed font-light">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              {leftParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              <div className="relative rounded-2xl overflow-hidden shadow-sm my-6 border border-gray-100">
                <Image
                  src="/images/refinery-pipes.jpg"
                  alt="Offshore Energy Infrastructure"
                  width={650}
                  height={420}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
                <Image
                  src="/images/plant-foliage.jpg"
                  alt="Impact Environmental and Operational Standards"
                  width={650}
                  height={320}
                  className="w-full h-auto object-cover"
                />
              </div>

              {rightParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {article.bulletPoints && article.bulletPoints.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-[#141C16] text-[17px]">Key Highlights &amp; Milestones:</h4>
                  <ul className="space-y-2.5">
                    {article.bulletPoints.map((bp: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-gray-700">
                        <span className="w-2 h-2 rounded-full bg-[#10CFC9] mt-2 shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
