'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
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
      <div className="min-h-screen bg-[#0E1512] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#70B83A]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1512] text-white">
      {/* Header */}
      <header className="bg-[#141C16] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/admin/news" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-lg font-bold">{isNew ? 'New Article' : 'Edit Article'}</h1>
            <p className="text-xs text-gray-400">News &amp; Media CMS</p>
          </div>
        </div>
        <button
          form="article-form"
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#70B83A] hover:bg-[#5ea32a] rounded-xl text-sm font-semibold transition disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Saving…' : 'Save Article'}
        </button>
      </header>

      <form id="article-form" onSubmit={handleSave} className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Core fields */}
        <div className="bg-[#141C16] border border-white/8 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Article Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400 block mb-1.5">Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Impact Energies Announces New Discovery"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0E1512] border border-white/10 text-white placeholder-gray-600 text-[15px] focus:outline-none focus:border-[#70B83A] transition"
              />
            </div>

            {/* Slug */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-gray-400">URL Slug</label>
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
              <div className="flex items-center bg-[#0E1512] border border-white/10 rounded-xl overflow-hidden focus-within:border-[#70B83A] transition">
                <span className="text-gray-600 text-sm px-3 border-r border-white/10 py-3">/news/</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  placeholder="article-url-slug"
                  className="flex-1 px-3 py-3 bg-transparent text-white text-[15px] font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Date <span className="text-red-400">*</span></label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => {
                  set('date', e.target.value);
                  set('year', String(new Date(e.target.value).getFullYear()));
                }}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0E1512] border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#70B83A] transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0E1512] border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#70B83A] transition"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Order */}
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => set('order', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0E1512] border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#70B83A] transition"
              />
              <p className="text-xs text-gray-600 mt-1">Lower number = shown first</p>
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
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#70B83A]"></div>
              </label>
              <div>
                <p className="text-sm text-white font-medium">Featured Article</p>
                <p className="text-xs text-gray-500">Shown prominently on the News page</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#141C16] border border-white/8 rounded-2xl p-6">
          <label className="text-xs text-gray-400 block mb-1.5 uppercase tracking-wider font-semibold">
            Summary <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.summary}
            onChange={(e) => set('summary', e.target.value)}
            placeholder="A short summary shown in the news listing and article header…"
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#0E1512] border border-white/10 text-white placeholder-gray-600 text-[15px] leading-relaxed focus:outline-none focus:border-[#70B83A] transition resize-none"
          />
        </div>

        {/* Body Paragraphs */}
        <div className="bg-[#141C16] border border-white/8 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Body Paragraphs</h2>
            <button
              type="button"
              onClick={addParagraph}
              className="flex items-center gap-1.5 text-xs text-[#70B83A] hover:text-white transition"
            >
              <Plus size={12} /> Add Paragraph
            </button>
          </div>
          {form.bodyParagraphs.map((para, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-600">¶ {idx + 1}</span>
                </div>
                <textarea
                  value={para}
                  onChange={(e) => handleBodyChange(idx, e.target.value)}
                  placeholder={`Paragraph ${idx + 1}…`}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E1512] border border-white/10 text-white placeholder-gray-600 text-[15px] leading-relaxed focus:outline-none focus:border-[#70B83A] transition resize-none"
                />
              </div>
              {form.bodyParagraphs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeParagraph(idx)}
                  className="mt-7 p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bullet Points */}
        <div className="bg-[#141C16] border border-white/8 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Bullet Points</h2>
              <p className="text-xs text-gray-600 mt-0.5">Optional key facts or highlights</p>
            </div>
            <button
              type="button"
              onClick={addBullet}
              className="flex items-center gap-1.5 text-xs text-[#70B83A] hover:text-white transition"
            >
              <Plus size={12} /> Add Point
            </button>
          </div>
          {form.bulletPoints.length === 0 ? (
            <p className="text-gray-600 text-sm italic">No bullet points added yet.</p>
          ) : (
            form.bulletPoints.map((bullet, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <span className="text-[#70B83A] text-lg leading-none shrink-0">•</span>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleBulletChange(idx, e.target.value)}
                  placeholder={`Bullet point ${idx + 1}`}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0E1512] border border-white/10 text-white placeholder-gray-600 text-[15px] focus:outline-none focus:border-[#70B83A] transition"
                />
                <button
                  type="button"
                  onClick={() => removeBullet(idx)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom save */}
        <div className="flex justify-end gap-3 pb-4">
          <Link href="/admin/news" className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#70B83A] hover:bg-[#5ea32a] rounded-xl text-sm font-semibold transition disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving…' : 'Save Article'}
          </button>
        </div>
      </form>
    </div>
  );
}
