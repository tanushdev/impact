'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from 'lucide-react';

const CATEGORIES = ['Press Release', 'News', 'Announcement', 'Report'];

interface FormData {
  title: string;
  slug: string;
  date: string;
  year: string;
  category: string;
  summary: string;
  bodyParagraphs: string[];
  bulletPoints: string[];
  featured: boolean;
  order: string;
}

const defaultForm: FormData = {
  title: '',
  slug: '',
  date: new Date().toISOString().split('T')[0],
  year: String(new Date().getFullYear()),
  category: 'Press Release',
  summary: '',
  bodyParagraphs: [''],
  bulletPoints: [],
  featured: false,
  order: '0',
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export default function ArticleFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === 'new';

  const [form, setForm] = useState<FormData>(defaultForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [autoSlug, setAutoSlug] = useState(isNew);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/news/${id}`)
        .then((r) => {
          if (r.status === 401) {
            router.push('/admin');
            return null;
          }
          return r.json();
        })
        .then((data) => {
          if (!data) return;
          if (!data.success) {
            router.push('/admin/news');
            return;
          }
          const a = data.article;
          setForm({
            title: a.title,
            slug: a.slug,
            date: a.date,
            year: String(a.year),
            category: a.category,
            summary: a.summary,
            bodyParagraphs: a.bodyParagraphs?.length ? a.bodyParagraphs : [''],
            bulletPoints: a.bulletPoints || [],
            featured: a.featured || false,
            order: String(a.order ?? 0),
          });
          setAutoSlug(false);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id, isNew, router]);

  const set = (key: keyof FormData, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: autoSlug ? slugify(val) : prev.slug,
    }));
  };

  const handleBodyChange = (idx: number, val: string) => {
    const updated = [...form.bodyParagraphs];
    updated[idx] = val;
    set('bodyParagraphs', updated);
  };

  const addParagraph = () => set('bodyParagraphs', [...form.bodyParagraphs, '']);
  const removeParagraph = (idx: number) =>
    set('bodyParagraphs', form.bodyParagraphs.filter((_, i) => i !== idx));

  const handleBulletChange = (idx: number, val: string) => {
    const updated = [...form.bulletPoints];
    updated[idx] = val;
    set('bulletPoints', updated);
  };
  const addBullet = () => set('bulletPoints', [...form.bulletPoints, '']);
  const removeBullet = (idx: number) =>
    set('bulletPoints', form.bulletPoints.filter((_, i) => i !== idx));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      year: parseInt(form.year) || new Date().getFullYear(),
      order: parseInt(form.order) || 0,
      bodyParagraphs: form.bodyParagraphs.filter((p) => p.trim()),
      bulletPoints: form.bulletPoints.filter((b) => b.trim()),
    };

    const url = isNew ? '/api/admin/news' : `/api/admin/news/${id}`;
    const method = isNew ? 'POST' : 'PATCH';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/news');
      } else {
        setError(data.message || 'Save failed. Please check inputs and try again.');
        setSaving(false);
      }
    } catch {
      setError('Network error occurred while saving.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAF8] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[#70B83A]" size={32} />
        <p className="text-sm text-gray-500 font-light">Loading article details…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#141C16] flex flex-col">
      {/* Top brand accent stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#10CFC9] via-[#70B83A] to-[#10CFC9] shrink-0" />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200/90 shadow-xs px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/news"
            className="p-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:text-[#141C16] hover:bg-gray-100 transition-colors"
            title="Back to dashboard"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-base font-bold text-[#141C16] leading-none">
              {isNew ? 'Create New Article' : 'Edit Article'}
            </h1>
            <p className="text-xs text-gray-500 font-light mt-1">Impact Energies News CMS</p>
          </div>
        </div>

        <button
          form="article-form"
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#70B83A] hover:bg-[#5E942D] text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-60 shadow-sm cursor-pointer"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{saving ? 'Publishing…' : 'Save Article'}</span>
        </button>
      </header>

      {/* Form Container */}
      <main className="flex-1 max-w-[1100px] w-full mx-auto px-6 md:px-10 py-8">
        <form id="article-form" onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <span className="font-bold">!</span>
              <span>{error}</span>
            </div>
          )}

          {/* 1. Article Details */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#141C16] uppercase tracking-wider">
                Article Details &amp; Meta
              </h2>
              <p className="text-xs text-gray-400 font-light mt-0.5">Basic publication metadata and URL route</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Headline / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Impact Energies Completes Strategic Portfolio Restructuring"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] placeholder-gray-400 text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition"
                />
              </div>

              {/* Slug */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Article URL Slug
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSlug}
                      onChange={(e) => setAutoSlug(e.target.checked)}
                      className="accent-[#70B83A]"
                    />
                    Auto-generate from headline
                  </label>
                </div>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-xl overflow-hidden focus-within:border-[#70B83A] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#70B83A]/15 transition">
                  <span className="text-gray-500 text-xs px-4 border-r border-gray-300 py-3 font-mono select-none">
                    /news/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => set('slug', e.target.value)}
                    placeholder="article-url-slug"
                    className="flex-1 px-3 py-3 bg-transparent text-[#141C16] text-[15px] font-mono focus:outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Publication Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => {
                    set('date', e.target.value);
                    set('year', String(new Date(e.target.value).getFullYear()));
                  }}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => set('order', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition"
                />
                <p className="text-xs text-gray-400 font-light mt-1">Lower order numbers appear first in list.</p>
              </div>

              {/* Featured Switch */}
              <div className="flex items-center gap-3 pt-5">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => set('featured', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#70B83A]" />
                </label>
                <div>
                  <p className="text-sm text-[#141C16] font-semibold">Featured Release</p>
                  <p className="text-xs text-gray-500 font-light">Highlights the article in the news feed</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Executive Summary */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-3">
            <div className="border-b border-gray-100 pb-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Executive Summary <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-400 font-light mt-0.5">Shown in media listing cards and header banner</p>
            </div>
            <textarea
              value={form.summary}
              onChange={(e) => set('summary', e.target.value)}
              placeholder="Provide a concise 2-3 sentence summary of the announcement…"
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] placeholder-gray-400 text-[15px] leading-relaxed focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition resize-none"
            />
          </div>

          {/* 3. Full Article Body Paragraphs */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Full Article Body Paragraphs
                </h2>
                <p className="text-xs text-gray-400 font-light mt-0.5">Narrative paragraphs for the detailed article page</p>
              </div>
              <button
                type="button"
                onClick={addParagraph}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#2E7D32] text-xs font-bold transition cursor-pointer"
              >
                <Plus size={13} /> Add Paragraph
              </button>
            </div>

            <div className="space-y-4">
              {form.bodyParagraphs.map((para, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-gray-500 font-mono">Paragraph {idx + 1}</span>
                    </div>
                    <textarea
                      value={para}
                      onChange={(e) => handleBodyChange(idx, e.target.value)}
                      placeholder={`Enter text for paragraph ${idx + 1}…`}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] placeholder-gray-400 text-[15px] leading-relaxed focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition resize-none"
                    />
                  </div>
                  {form.bodyParagraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(idx)}
                      className="mt-8 p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 transition cursor-pointer"
                      title="Remove paragraph"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Bullet Points / Highlights */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Key Points &amp; Milestones (Optional)
                </h2>
                <p className="text-xs text-gray-400 font-light mt-0.5">Bullet points highlighted in the article</p>
              </div>
              <button
                type="button"
                onClick={addBullet}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#2E7D32] text-xs font-bold transition cursor-pointer"
              >
                <Plus size={13} /> Add Point
              </button>
            </div>

            {form.bulletPoints.length === 0 ? (
              <p className="text-gray-400 text-sm font-light italic py-2">
                No bullet highlights added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {form.bulletPoints.map((bullet, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10CFC9] shrink-0" />
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleBulletChange(idx, e.target.value)}
                      placeholder={`Key highlight ${idx + 1}`}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-[#141C16] placeholder-gray-400 text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition"
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(idx)}
                      className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 transition cursor-pointer"
                      title="Remove highlight"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-2 pb-8">
            <Link
              href="/admin/news"
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#70B83A] hover:bg-[#5E942D] text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-60 shadow-sm cursor-pointer"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span>{saving ? 'Publishing…' : 'Save Article'}</span>
            </button>
          </div>
        </form>
      </main>

      {/* Isolated Admin Footer */}
      <footer className="bg-white border-t border-gray-200/90 py-4 px-6 md:px-10 text-center text-xs text-gray-400 mt-auto">
        Impact Energies CMS &bull; News &amp; Media Administration Panel
      </footer>
    </div>
  );
}
