import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, Clock, User, Share2 } from 'lucide-react';
import { connectToDatabase } from '@/lib/mongodb';
import News from '@/models/News';
import { initialNews } from '@/lib/seedData';
import { renderRichContent } from '@/lib/contentRenderer';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  let article: any = null;

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(params.id);
      const orClauses: any[] = [
        { slug: params.id },
        { slug: params.id.toLowerCase() }
      ];
      if (isObjectId) {
        orClauses.push({ _id: params.id });
      }
      article = await News.findOne({ $or: orClauses }).lean();
    }
  } catch (err) {
    console.warn('MongoDB lookup error in news/[id]:', err);
  }

  if (!article) {
    article = initialNews.find(
      (n) => n.slug.toLowerCase() === params.id.toLowerCase()
    );
  }

  if (!article) {
    notFound();
  }

  const coverImg = article.coverImage || '/images/news-hero.jpg';
  const paragraphs: string[] =
    article.bodyParagraphs && article.bodyParagraphs.length > 0
      ? article.bodyParagraphs
      : [article.summary];

  return (
    <div className="w-full bg-white text-[#141C16]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[440px] md:min-h-[500px] flex items-center bg-black overflow-hidden pt-28 pb-16">
        <Image
          src={coverImg}
          alt={article.title}
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/35" />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-12 w-full z-10">
          {/* Breadcrumb */}
          <div className="text-[15px] text-gray-300 mb-6 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/news" className="hover:text-white transition-colors">
              News &amp; Media
            </Link>
            <span>/</span>
            <span className="text-[#10CFC9] font-medium truncate max-w-xs sm:max-w-md">
              {article.title}
            </span>
          </div>

          <div className="max-w-4xl text-white">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#10CFC9]/25 text-[#10CFC9] text-xs font-bold uppercase tracking-wider border border-[#10CFC9]/30">
                {article.category || 'Press Release'}
              </span>
              {article.readTime && (
                <span className="text-gray-300 text-xs flex items-center gap-1.5 font-light">
                  <Clock size={13} />
                  {article.readTime}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] mb-5 font-sans">
              {article.title}
            </h1>

            <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed max-w-3xl">
              {article.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Meta Bar & Navigation */}
      <div className="border-b border-gray-100 bg-[#FCFDFC]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-gray-600 hover:text-[#70B83A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All News &amp; Media</span>
          </Link>

          <div className="flex flex-wrap items-center gap-5 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#70B83A]" />
              <span>{article.date}</span>
            </span>
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#10CFC9]" />
                <span>{article.author}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              <span>{article.category || 'Press Release'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE CONTENT CONTAINER */}
      <section className="w-full bg-white py-14 px-6 md:px-12">
        <div className="max-w-[1040px] mx-auto space-y-12">
          {/* Main Article Body */}
          {article.contentHtml ? (
            <div
              className="prose prose-lg max-w-none text-gray-800 text-[16px] md:text-[17px] leading-relaxed font-light
                prose-headings:font-bold prose-headings:text-[#141C16] prose-headings:tracking-tight
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:my-5
                prose-strong:font-bold prose-strong:text-[#141C16]
                prose-em:italic
                prose-blockquote:border-l-4 prose-blockquote:border-[#70B83A] prose-blockquote:pl-5 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:bg-[#F0FDF4]/50 prose-blockquote:rounded-r-2xl
                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:my-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:my-6
                prose-li:text-gray-700
                prose-a:text-[#007580] prose-a:underline hover:prose-a:text-[#70B83A]
                prose-img:rounded-2xl prose-img:shadow-sm prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: renderRichContent(article.contentHtml) }}
            />
          ) : (
            /* Fallback Paragraphs layout */
            <div className="space-y-6 text-[16px] md:text-[17px] text-gray-700 leading-relaxed font-light">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          )}

          {/* Additional Article Images Gallery */}
          {article.images && article.images.length > 0 && (
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-xl font-bold text-[#141C16] mb-6">
                Technical Photographs &amp; Exploration Imagery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {article.images.map((img: any, idx: number) => (
                  <figure
                    key={idx}
                    className="overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-xs"
                  >
                    <div className="relative w-full aspect-[16/10] bg-gray-200">
                      <img
                        src={img.url}
                        alt={img.caption || `Image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="p-4 text-xs text-gray-600 font-light leading-relaxed border-t border-gray-100">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Key Bullet Points / Takeaways */}
          {article.bulletPoints && article.bulletPoints.length > 0 && (
            <div className="p-8 rounded-2xl bg-[#F8FAF8] border border-gray-200/80">
              <h3 className="text-lg font-bold text-[#141C16] mb-5 uppercase tracking-wide">
                Key Announcements &amp; Highlights:
              </h3>
              <ul className="space-y-3.5">
                {article.bulletPoints.map((bp: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-gray-800 leading-relaxed">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10CFC9] mt-2 shrink-0" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#141C16] hover:text-[#70B83A] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to News &amp; Media</span>
            </Link>

            <span className="text-xs text-gray-400">
              Published by Impact Energies Corporate Communications
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
