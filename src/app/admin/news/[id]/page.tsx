'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Save, Loader2, Calendar, Tag, Hash, Star } from 'lucide-react';

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
          if (r.status === 401) { router.push('/admin'); return null; }
          return r.json();
        })
        .then((data) => {
          if (!data) return;
          if (!data.success) { router.push('/admin/news'); return; }
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

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      router.push('/admin/news');
    } else {
      setError(data.message || 'Save failed. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F0C] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[#70B83A]" size={30} />
        <p className="text-sm text-gray-500 font-light">Loading article details…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F0C] text-white flex flex-col">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#10CFC9] via-[#70B83A] to-[#10CFC9] shrink-0" />

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0A0F0C]/95 backdrop-blur border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              {isNew ? 'Create New Article' : 'Edit Article'}
            </h1>
            <p className="text-xs text-gray-500">News &amp; Media CMS</p>
          </div>
        </div>

        <button
          form="article-form"
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#70B83A] hover:bg-[#5ea32a] active:bg-[#4f8f24] rounded-xl text-sm font-semibold transition disabled:opacity-60 shadow-lg shadow-[#70B83A]/20"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Saving…' : 'Save Article'}
        </button>
      </header>

      {/* Form Container */}
      <form id="article-form" onSubmit={handleSave} className="max-w-4xl mx-auto w-full px-6 py-8 space-y-7">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* 1. Core Fields */}
        <div className="bg-[#111A13] border border-white/[0.06] rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Article Meta &amp; Placement
            </h2>
            <span className="text-xs text-gray-600 font-mono">Impact Energies CMS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Headline / Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Impact Energies Completes Strategic Exploration Assessment"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0A0F0C] border border-white/10 text-white placeholder-gray-600 text-[15px] focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/20 transition"
              />
            </div>

            {/* Slug */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  URL Slug
                </label>
                <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSlug}
                    onChange={(e) => setAutoSlug(e.target.checked)}
                    className="accent-[#70B83A]"
                  />
                  Auto-generate from title
                </label>
              </div>
              <div className="flex items-center bg-[#0A0F0C] border border-white/10 rounded-xl overflow-hidden focus-within:border-[#10CFC9] focus-within:ring-1 focus-within:ring-[#10CFC9]/20 transition">
                <span className="text-gray-600 text-xs px-3.5 border-r border-white/10 py-3 font-mono">
                  /news/
                </span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  placeholder="article-slug"
                  className="flex-1 px-3 py-3 bg-transparent text-white text-[15px] font-mono focus:outline-none placeholder-gray-700"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Publication Date <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => {
                    set('date', e.target.value);
                    set('year', String(new Date(e.target.value).getFullYear()));
                  }}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0F0C] border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/20 transition"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0A0F0C] border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/20 transition"
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
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => set('order', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0A0F0C] border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/20 transition"
              />
              <p className="text-xs text-gray-600 mt-1">Lower order number appears first in the listing.</p>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3 pt-5">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set('featured', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#70B83A]" />
              </label>
              <div>
                <p className="text-sm text-white font-medium">Featured Release</p>
                <p className="text-xs text-gray-500">Pinned at the top with highlight styling</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Summary */}
        <div className="bg-[#111A13] border border-white/[0.06] rounded-2xl p-6 md:p-8 space-y-4">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
            Executive Summary <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.summary}
            onChange={(e) => set('summary', e.target.value)}
            placeholder="A clear 2-3 sentence overview that appears in cards and media listings…"
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0F0C] border border-white/10 text-white placeholder-gray-600 text-[15px] leading-relaxed focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/20 transition resize-none"
          />
        </div>

        {/* 3. Body Paragraphs */}
        <div className="bg-[#111A13] border border-white/[0.06] rounded-2xl p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Full Article Content
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">Add narrative paragraphs in reading order</p>
            </div>
            <button
              type="button"
              onClick={addParagraph}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#70B83A]/10 hover:bg-[#70B83A]/20 text-xs text-[#70B83A] font-semibold transition"
            >
              <Plus size={12} /> Add Paragraph
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
                    placeholder={`Paragraph ${idx + 1} content…`}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0F0C] border border-white/10 text-white placeholder-gray-600 text-[15px] leading-relaxed focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/20 transition resize-none"
                  />
                </div>
                {form.bodyParagraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(idx)}
                    className="mt-8 p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 text-gray-500 transition"
                    title="Remove paragraph"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Bullet Points / Highlights */}
        <div className="bg-[#111A13] border border-white/[0.06] rounded-2xl p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Key Points &amp; Highlights (Optional)
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">Quick takeaways displayed as bullets</p>
            </div>
            <button
              type="button"
              onClick={addBullet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#70B83A]/10 hover:bg-[#70B83A]/20 text-xs text-[#70B83A] font-semibold transition"
            >
              <Plus size={12} /> Add Point
            </button>
          </div>

          {form.bulletPoints.length === 0 ? (
            <p className="text-gray-600 text-sm font-light italic py-2">
              No bullet highlights added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {form.bulletPoints.map((bullet, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <span className="text-[#10CFC9] text-base leading-none shrink-0">•</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleBulletChange(idx, e.target.value)}
                    placeholder={`Key takeaway ${idx + 1}`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#0A0F0C] border border-white/10 text-white placeholder-gray-600 text-[15px] focus:outline-none focus:border-[#10CFC9] focus:ring-1 focus:ring-[#10CFC9]/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => removeBullet(idx)}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 text-gray-500 transition"
                    title="Remove point"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Save & Cancel */}
        <div className="flex items-center justify-end gap-3 pt-2 pb-8">
          <Link
            href="/admin/news"
            className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-sm text-gray-300 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#70B83A] hover:bg-[#5ea32a] active:bg-[#4f8f24] rounded-xl text-sm font-semibold transition disabled:opacity-60 shadow-lg shadow-[#70B83A]/20"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save Article'}
          </button>
        </div>
      </form>
    </div>
  );
}
