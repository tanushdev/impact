'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Loader2,
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  Palette,
  Eye,
  Edit3,
  Upload,
} from 'lucide-react';

const CATEGORIES = ['Press Release', 'News', 'Announcement', 'Report'];

const PRESET_IMAGES = [
  { label: 'Offshore Hero', url: '/images/news-hero.jpg' },
  { label: 'Refinery Infrastructure', url: '/images/refinery-pipes.jpg' },
  { label: 'Environmental Foliage', url: '/images/plant-foliage.jpg' },
  { label: 'Deepwater Basin', url: '/images/figma/company-hero-bg.jpg' },
];

const COLOR_OPTIONS = [
  { name: 'Impact Green', hex: '#70B83A' },
  { name: 'Impact Teal', hex: '#007580' },
  { name: 'Deep Charcoal', hex: '#141C16' },
  { name: 'Muted Slate', hex: '#6A726A' },
  { name: 'Warm Amber', hex: '#D97706' },
];

interface GalleryImage {
  url: string;
  caption: string;
}

interface FormData {
  title: string;
  slug: string;
  date: string;
  year: string;
  category: string;
  summary: string;
  coverImage: string;
  contentHtml: string;
  images: GalleryImage[];
  bulletPoints: string[];
  author: string;
  readTime: string;
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
  coverImage: '/images/news-hero.jpg',
  contentHtml: '',
  images: [],
  bulletPoints: [],
  author: 'Impact Energies Corporate',
  readTime: '3 min read',
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
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

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
          if (!data || !data.success) {
            router.push('/admin/news');
            return;
          }
          const a = data.article;
          // Format initial contentHtml if only bodyParagraphs exist
          let initialHtml = a.contentHtml || '';
          if (!initialHtml && a.bodyParagraphs && a.bodyParagraphs.length > 0) {
            initialHtml = a.bodyParagraphs
              .map((p: string) => `<p>${p}</p>`)
              .join('\n\n');
          }

          setForm({
            title: a.title || '',
            slug: a.slug || '',
            date: a.date || new Date().toISOString().split('T')[0],
            year: String(a.year || new Date().getFullYear()),
            category: a.category || 'Press Release',
            summary: a.summary || '',
            coverImage: a.coverImage || '/images/news-hero.jpg',
            contentHtml: initialHtml,
            images: a.images || [],
            bulletPoints: a.bulletPoints || [],
            author: a.author || 'Impact Energies Corporate',
            readTime: a.readTime || '3 min read',
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

  const set = (key: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: autoSlug ? slugify(val) : prev.slug,
    }));
  };

  // Rich Text Insertion Helper
  const insertFormatting = (prefix: string, suffix: string = '', placeholder: string = 'text') => {
    const textarea = editorTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.contentHtml;
    const selected = text.substring(start, end) || placeholder;

    const newText = text.substring(0, start) + prefix + selected + suffix + text.substring(end);
    set('contentHtml', newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  const insertColor = (colorHex: string) => {
    insertFormatting(`<span style="color: ${colorHex}">`, '</span>', 'colored text');
    setShowColorPicker(false);
  };

  const insertImageTag = () => {
    const url = prompt('Enter Image URL (e.g. /images/refinery-pipes.jpg or https://...):', '/images/refinery-pipes.jpg');
    if (!url) return;
    const caption = prompt('Enter optional caption for image:', '');
    const imgHtml = `\n<figure class="my-6">\n  <img src="${url}" alt="${caption || 'Article image'}" class="w-full rounded-2xl shadow-sm object-cover" />\n  ${caption ? `<figcaption class="text-xs text-gray-500 mt-2 text-center font-light italic">${caption}</figcaption>` : ''}\n</figure>\n`;
    insertFormatting(imgHtml, '', '');
  };

  const insertLink = () => {
    const url = prompt('Enter link URL (e.g. https://...):', 'https://');
    if (!url) return;
    insertFormatting(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#007580] underline font-medium hover:text-[#70B83A]">`, '</a>', 'link text');
  };

  // Image Upload Handler
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.success && data.url) {
        set('coverImage', data.url);
      } else {
        alert(data.message || 'Image upload failed.');
      }
    } catch {
      alert('Upload failed due to network error.');
    } finally {
      setUploadingCover(false);
    }
  };

  // Gallery Images Handlers
  const addGalleryImage = () => {
    set('images', [...form.images, { url: '', caption: '' }]);
  };

  const updateGalleryImage = (idx: number, field: 'url' | 'caption', val: string) => {
    const updated = [...form.images];
    updated[idx][field] = val;
    set('images', updated);
  };

  const removeGalleryImage = (idx: number) => {
    set('images', form.images.filter((_, i) => i !== idx));
  };

  // Bullet Points Handlers
  const addBullet = () => set('bulletPoints', [...form.bulletPoints, '']);
  const updateBullet = (idx: number, val: string) => {
    const updated = [...form.bulletPoints];
    updated[idx] = val;
    set('bulletPoints', updated);
  };
  const removeBullet = (idx: number) => {
    set('bulletPoints', form.bulletPoints.filter((_, i) => i !== idx));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Extract raw paragraphs from contentHtml as fallback
    const tempDiv = typeof window !== 'undefined' ? document.createElement('div') : null;
    let fallbackParagraphs: string[] = [];
    if (tempDiv) {
      tempDiv.innerHTML = form.contentHtml;
      const pElements = tempDiv.querySelectorAll('p');
      if (pElements.length > 0) {
        fallbackParagraphs = Array.from(pElements).map((p) => p.textContent || '').filter(Boolean);
      } else {
        fallbackParagraphs = form.contentHtml.split('\n\n').filter((p) => p.trim());
      }
    }

    const payload = {
      ...form,
      year: parseInt(form.year) || new Date().getFullYear(),
      order: parseInt(form.order) || 0,
      bodyParagraphs: fallbackParagraphs.length > 0 ? fallbackParagraphs : [form.summary],
      bulletPoints: form.bulletPoints.filter((b) => b.trim()),
      images: form.images.filter((img) => img.url.trim()),
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
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200/90 shadow-xs px-6 md:px-10 py-4 flex items-center justify-between">
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
            <p className="text-xs text-gray-500 font-light mt-1">Impact Energies News &amp; Media CMS</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab switcher: Edit vs Live Preview */}
          <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-white text-[#141C16] shadow-xs'
                  : 'text-gray-500 hover:text-[#141C16]'
              }`}
            >
              <Edit3 size={13} /> Edit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-[#70B83A] shadow-xs'
                  : 'text-gray-500 hover:text-[#141C16]'
              }`}
            >
              <Eye size={13} /> Live Preview
            </button>
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
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-6 md:px-10 py-8">
        <form id="article-form" onSubmit={handleSave} className="space-y-7">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <span className="font-bold">!</span>
              <span>{error}</span>
            </div>
          )}

          {/* 1. Article Details Card */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#141C16] uppercase tracking-wider">
                  1. Article Metadata &amp; Publishing Info
                </h2>
                <p className="text-xs text-gray-400 font-light mt-0.5">Headline, category, publication date and URL</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F0FDF4] text-[#2E7D32] border border-[#DCFCE7]">
                Impact Energies
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Headline / Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Impact Energies Completes Strategic Portfolio Restructuring Across South Africa"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] placeholder-gray-400 text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition font-medium"
                />
              </div>

              {/* Slug */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Article URL Route (Slug)
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
                    placeholder="article-slug"
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
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition font-medium"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Author / Source Byline
                </label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => set('author', e.target.value)}
                  placeholder="Impact Energies Corporate"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition"
                />
              </div>

              {/* Read Time & Display Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => set('readTime', e.target.value)}
                    placeholder="3 min read"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] text-[15px] focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition"
                  />
                </div>
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
                </div>
              </div>

              {/* Featured toggle */}
              <div className="md:col-span-2 flex items-center gap-3 p-4 bg-[#F8FAF8] rounded-xl border border-gray-200">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => set('featured', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#70B83A]" />
                </label>
                <div>
                  <p className="text-sm text-[#141C16] font-bold">Featured Main Announcement</p>
                  <p className="text-xs text-gray-500 font-light">
                    Pinned to the top of news feed and given a prominent featured card styling
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Featured Banner Image Selection & Upload */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#141C16] uppercase tracking-wider">
                  2. Hero &amp; Cover Image
                </h2>
                <p className="text-xs text-gray-400 font-light mt-0.5">
                  Top hero banner image for article header and preview card
                </p>
              </div>
              <span className="text-xs text-gray-500">Supports direct upload, URL, or site presets</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left: Input + Presets + Upload */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Cover Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.coverImage}
                      onChange={(e) => set('coverImage', e.target.value)}
                      placeholder="e.g. /images/news-hero.jpg or https://..."
                      className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] text-sm focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition font-mono"
                    />
                    <label className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold cursor-pointer transition">
                      <Upload size={14} />
                      <span>{uploadingCover ? 'Uploading…' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                        disabled={uploadingCover}
                      />
                    </label>
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <p className="text-xs font-bold text-gray-600 mb-2">Quick Company Photo Presets:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => set('coverImage', preset.url)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition cursor-pointer flex items-center gap-2 ${
                          form.coverImage === preset.url
                            ? 'bg-[#F0FDF4] border-[#70B83A] text-[#2E7D32] font-bold'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#70B83A]" />
                        <span className="truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Live Image Preview Box */}
              <div className="md:col-span-5">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Cover Preview
                </p>
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner">
                  {form.coverImage ? (
                    <img
                      src={form.coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No cover image selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Executive Summary */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-3">
            <div className="border-b border-gray-100 pb-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                3. Lead Summary <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                The bold 2-3 sentence introductory summary displayed under the headline
              </p>
            </div>
            <textarea
              value={form.summary}
              onChange={(e) => set('summary', e.target.value)}
              placeholder="Enter the primary executive summary of the announcement…"
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#141C16] placeholder-gray-400 text-[15px] leading-relaxed focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition resize-none font-medium"
            />
          </div>

          {/* 4. Rich Formatted Article Content & Editor */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-4">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-sm font-bold text-[#141C16] uppercase tracking-wider">
                  4. Rich Article Content (Full Story)
                </h2>
                <p className="text-xs text-gray-400 font-light mt-0.5">
                  Format headings, bold, italic, brand colors, blockquotes, and embedded photos
                </p>
              </div>

              <div className="text-xs text-gray-500">
                Supports full HTML formatting
              </div>
            </div>

            {/* Rich Formatting Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#F8FAF8] rounded-xl border border-gray-200">
              {/* Bold */}
              <button
                type="button"
                onClick={() => insertFormatting('<strong>', '</strong>', 'bold text')}
                className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition"
                title="Bold (<strong>)"
              >
                <Bold size={15} />
              </button>

              {/* Italic */}
              <button
                type="button"
                onClick={() => insertFormatting('<em>', '</em>', 'italic text')}
                className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition"
                title="Italic (<em>)"
              >
                <Italic size={15} />
              </button>

              {/* Underline */}
              <button
                type="button"
                onClick={() => insertFormatting('<u>', '</u>', 'underlined text')}
                className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition"
                title="Underline (<u>)"
              >
                <Underline size={15} />
              </button>

              <div className="h-5 w-px bg-gray-300 mx-1" />

              {/* Heading 2 */}
              <button
                type="button"
                onClick={() => insertFormatting('<h2 class="text-2xl font-bold text-[#141C16] mt-8 mb-4">', '</h2>', 'Section Heading')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 text-xs font-bold transition flex items-center gap-1"
                title="Section Heading (H2)"
              >
                <Heading2 size={15} /> H2
              </button>

              {/* Heading 3 */}
              <button
                type="button"
                onClick={() => insertFormatting('<h3 class="text-xl font-bold text-[#007580] mt-6 mb-3">', '</h3>', 'Sub-heading')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 text-xs font-bold transition flex items-center gap-1"
                title="Sub-heading (H3)"
              >
                <Heading3 size={15} /> H3
              </button>

              <div className="h-5 w-px bg-gray-300 mx-1" />

              {/* Color dropdown button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 text-xs font-bold transition flex items-center gap-1.5 border border-transparent hover:border-gray-200"
                  title="Text color"
                >
                  <Palette size={15} className="text-[#70B83A]" />
                  <span>Color</span>
                </button>

                {showColorPicker && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-40 space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1">
                      Brand Palette
                    </p>
                    {COLOR_OPTIONS.map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => insertColor(col.hex)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-xs font-medium text-gray-700"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-5 w-px bg-gray-300 mx-1" />

              {/* Quote */}
              <button
                type="button"
                onClick={() => insertFormatting('<blockquote class="border-l-4 border-[#70B83A] pl-4 py-1.5 my-6 italic text-gray-700 font-light bg-[#F0FDF4]/50 rounded-r-xl">', '</blockquote>', 'Impact Energies executive quotation')}
                className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition"
                title="Blockquote"
              >
                <Quote size={15} />
              </button>

              {/* Bullet list */}
              <button
                type="button"
                onClick={() => insertFormatting('<ul class="list-disc pl-6 space-y-2 my-4 text-gray-700">\n  <li>', '</li>\n  <li>Second key point</li>\n</ul>', 'First bullet point')}
                className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition"
                title="Bulleted List"
              >
                <List size={15} />
              </button>

              {/* Numbered list */}
              <button
                type="button"
                onClick={() => insertFormatting('<ol class="list-decimal pl-6 space-y-2 my-4 text-gray-700">\n  <li>', '</li>\n  <li>Numbered point two</li>\n</ol>', 'First numbered step')}
                className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition"
                title="Numbered List"
              >
                <ListOrdered size={15} />
              </button>

              <div className="h-5 w-px bg-gray-300 mx-1" />

              {/* Insert Image */}
              <button
                type="button"
                onClick={insertImageTag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-bold hover:border-[#70B83A] hover:text-[#70B83A] transition shadow-xs"
                title="Embed Image in Content"
              >
                <ImageIcon size={14} className="text-[#007580]" />
                <span>Add Image</span>
              </button>

              {/* Link */}
              <button
                type="button"
                onClick={insertLink}
                className="p-2 rounded-lg hover:bg-white hover:shadow-xs text-gray-700 transition"
                title="Add Hyperlink"
              >
                <Link2 size={15} />
              </button>
            </div>

            {/* Editor or Live Preview View */}
            {activeTab === 'editor' ? (
              <div>
                <textarea
                  ref={editorTextareaRef}
                  value={form.contentHtml}
                  onChange={(e) => set('contentHtml', e.target.value)}
                  placeholder={`<p>Impact Energies ("Impact" or the "Company") today announced...</p>\n\n<h2 class="text-2xl font-bold text-[#141C16] mt-8 mb-4">Strategic Exploration Rationale</h2>\n\n<p>Through advanced 3D seismic interpretation and partner alignment...</p>`}
                  rows={14}
                  className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 text-[#141C16] placeholder-gray-400 text-[15px] font-mono leading-relaxed focus:outline-none focus:border-[#70B83A] focus:ring-2 focus:ring-[#70B83A]/15 transition resize-y"
                />
                <p className="text-xs text-gray-400 font-light mt-1.5">
                  Use the toolbar buttons above to insert formatting, bold highlights, section titles, brand colors, and images.
                </p>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-[#FCFDFC] border border-gray-200 min-h-[300px]">
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#70B83A]">
                    {form.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#141C16] mt-2 mb-3">
                    {form.title || 'Untitled Headline'}
                  </h1>
                  <p className="text-base text-gray-600 font-medium leading-relaxed italic">
                    {form.summary}
                  </p>
                </div>

                <div
                  className="prose max-w-none text-[#141C16] text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: form.contentHtml || '<p class="text-gray-400 italic">No article body written yet.</p>',
                  }}
                />
              </div>
            )}
          </div>

          {/* 5. Additional Article Gallery Images */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-5">
            <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#141C16] uppercase tracking-wider">
                  5. Additional Article Images &amp; Captions
                </h2>
                <p className="text-xs text-gray-400 font-light mt-0.5">
                  Visual gallery and supporting technical photographs displayed in the article
                </p>
              </div>
              <button
                type="button"
                onClick={addGalleryImage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#2E7D32] text-xs font-bold transition cursor-pointer"
              >
                <Plus size={13} /> Add Gallery Image
              </button>
            </div>

            {form.images.length === 0 ? (
              <p className="text-gray-400 text-sm font-light italic py-2">
                No additional gallery images added yet. Click &quot;Add Gallery Image&quot; above to attach supporting images with captions.
              </p>
            ) : (
              <div className="space-y-4">
                {form.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-gray-200 bg-[#F8FAF8] grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    <div className="md:col-span-5">
                      <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={img.url}
                        onChange={(e) => updateGalleryImage(idx, 'url', e.target.value)}
                        placeholder="e.g. /images/refinery-pipes.jpg"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm font-mono focus:outline-none focus:border-[#70B83A]"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
                        Photo Caption
                      </label>
                      <input
                        type="text"
                        value={img.caption}
                        onChange={(e) => updateGalleryImage(idx, 'caption', e.target.value)}
                        placeholder="e.g. Deepwater exploration acreage offshore South Africa"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm focus:outline-none focus:border-[#70B83A]"
                      />
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end gap-2 pt-4 md:pt-0">
                      {img.url && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 border border-gray-300 shrink-0">
                          <img src={img.url} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                        title="Delete photo"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Key Bullet Points / Takeaways */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#141C16] uppercase tracking-wider">
                  6. Executive Bullet Points &amp; Milestones (Optional)
                </h2>
                <p className="text-xs text-gray-400 font-light mt-0.5">
                  Highlighted key points rendered with brand bullet marks
                </p>
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
                      onChange={(e) => updateBullet(idx, e.target.value)}
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
              <span>{saving ? 'Publishing…' : 'Save & Publish Article'}</span>
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200/90 py-4 px-6 md:px-10 text-center text-xs text-gray-400 mt-auto">
        Impact Energies CMS &bull; News &amp; Media Administration Panel
      </footer>
    </div>
  );
}
